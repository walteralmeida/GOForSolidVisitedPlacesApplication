using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Solid.BusinessLayer.ORMSupportClasses;
using Solid.Data.DataObjects;
using Solid.Data.Resources;
using Solid.Data.Resources.Exceptions;
using GenerativeObjects.Practices;
using GenerativeObjects.Practices.Settings;
using GenerativeObjects.Services.Email;
using GenerativeObjects.Practices.ORMSupportClasses;
using System.Security.Claims;
using System.Web;
using System.Security.Cryptography;
using System.Web.Configuration;
using System.Configuration;
using System.Reflection;
using GenerativeObjects.Practices.DependencyInjection;
using System.Text.RegularExpressions;
using System.Net;
using System.Net.Mail;
using GenerativeObjects.Practices.LayerSupportClasses;
using Unity;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.ExceptionHandling;
using Solid.Feature.Security.Common;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer.Extensions;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using GenerativeObjects.Practices.LayerSupportClasses.ServiceLayer;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Threading;
using GenerativeObjects.Practices.LayerSupportClasses.ServiceLayer.Http;
using System.IO;
using NLog;

namespace Solid.BusinessLayer.Components.Server
{
    /// <summary>
	/// SecurityProvider Component
	///  
	/// </summary>
    public partial class GOSecurityProvider : BaseServerComponent, IGOSecurityProvider, IDataProviderExtension<GOUserDataObject>
    {
		// Authentication
		IAuthentication Authentication => ApplicationSettings.Container.Resolve<IAuthentication>();

		// Password Policy
		private PasswordPolicy PasswordPolicy = new PasswordPolicy();
		
		// Configuration key
		const string EmailTokenExpiry = "EmailTokenExpiry";

        // Context Key
		const string ValidatingUser = "ValidatingUser";

		// Email Verification enabled?
		public bool IsEmailVerificationRequired {  get { return false; } }

		// User validation enabled?
		public bool IsAdminApprovalRequired { get { return false; } }

		// Default role for new users
		public string DefaultRoleForNewUsers { get { return "User"; } }

		// Resource language
		public static string ResourceLanguage => "English";

		// Membership hooks for custom implementations
		public delegate bool OnUserRegistrationChange(GOUserDataObject user);
		public event OnUserRegistrationChange OnRegistrationEmailVerified;
		public event OnUserRegistrationChange OnUserRegistered;
		public event OnUserRegistrationChange OnUserApproved;

		/// <summary>
		/// IDataProviderExtension<GOUserDataObject>.Init() implementation
		/// Hook into GOUserDataObject.Save() so that we can MD5 hash the password prior to saving
		/// </summary>
		/// <param name="dataProvider"></param>
		public void Init(IDataProviderExtensionProvider dataProvider)
		{
			dataProvider.OnBeforeSave += OnBeforeSaveGOUser;
		}

		/// <summary>
		/// IDataProviderExtension<GOUserDataObject> OnBeforeSave extension
		/// Hook into GOUserDataObject.Save() so that we can MD5 hash the password prior to saving
		/// </summary>
		void OnBeforeSaveGOUser(object sender, OnBeforeSaveEventArgs e)
		{
			if (e.Entity != null)
			{
				var userToSave = e.Entity as GOUserDataObject;
				if (userToSave != null)
				{
					if (userToSave.IsNew)
					{
						userToSave.Password = GetMD5Hash(userToSave.Password);
					}
					else if(!e.Parameters.ContainsKey(ValidatingUser))
					{
						if (DataFacade.GOUserDataProvider.GetCollection(null, "UserName = \"" + userToSave.UserName + "\" && Password = \"" + userToSave.Password + "\"", 
																			null, 
																			parameters: e.Parameters,
																			skipSecurity: true).Any())
						{
							// The password is correct in the Database, we don't need to do anything
						}
						else
						{
							userToSave.Password = GetMD5Hash(userToSave.Password);
						}
					}
				}
			}
		}

        /// <summary>
        /// Get an encrypted value.
        /// Customize this method, defining a new value for : KEY
        /// </summary>
        public static string GetMD5Hash(string value)
        {
            if (value == null)
                return null;

            MD5 md5Hasher = MD5.Create();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(value));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        /// <summary>
        /// Authenticate Method
		/// </summary>
		/// <param name="username"></param>
		/// <param name="password"></param>
        /// <returns></returns>		
 
		public string Authenticate(string username, string password, bool useCookies) 
		{
            Logger techLogger = LogManager.GetCurrentClassLogger();

            var includes = new List<string>
            {
                "UserRoleItems.Role", "UserGroupItems.Group.GroupRoleItems"
            };

            username = username.TrimEnd(' ').TrimEnd('/').TrimEnd('\\');

            var existingUser = DataFacade.GOUserDataProvider.GetCollection(filterPredicate: $"UserName == \"{username}\"",
                                                                           includes: includes,
                                                                           skipSecurity: true).SingleOrDefault();

            GOUserDataObject currentUser;

            if (existingUser == null)
            {
                techLogger.Debug($"User with username={username} doen't exist => create a new One.");
                // new user provided by SOLID : create it
                currentUser = CreateNewUser(username, null, null, username, Guid.NewGuid().ToString(), true, true);
            }
            else
            {
                currentUser = existingUser;
            }

            if (currentUser.IsNew || currentUser.IsDirty)
            {
                DataFacade.GOUserDataProvider.Save(currentUser, skipSecurity: true);

                if (currentUser.IsNew)
                {
                    techLogger.Info($"SOLID - connect: Creation new user {currentUser.EmailAddress} ({currentUser.FullName})");
                }
                else
                {
                    techLogger.Warn($"SOLID - connect: user isDirty but not new - {currentUser.EmailAddress} ({currentUser.FullName}). Weird, should not.");
                }

                currentUser = DataFacade.GOUserDataProvider.Get(currentUser, includes: includes, skipSecurity: true);
            }

            var token = SetAuthenticationToken(currentUser, useCookies : true, solidToken : password);

            techLogger.Info($"SOLID - OK - connection user {currentUser.EmailAddress} ({currentUser.FullName})");

            return token;
		}			
 
		/// <summary>
        /// SetAuthenticationToken Method
		/// </summary>	
		private string SetAuthenticationToken(GOUserDataObject user, bool useCookies, string solidToken)
		{
			var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();

			// get all user roles (including roles from groups the user belongs to)
			var roles = user.UserRoleItems.Select(r => r.GORoleName);
			foreach (var userGroup in user.UserGroupItems)
			{
				roles = roles.Union(userGroup.Group.GroupRoleItems.Select(r => r.GORoleName));
			}

			var claims = new List<Claim>()
			{
				new Claim("UserId", user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.FirstName ?? user.FullName ?? user.UserName ),
                new Claim(ClaimTypes.Surname, user.LastName ?? ""),
				new Claim(ClaimTypes.Role, String.Join(",", roles.Distinct())),
				new Claim("SolidToken", solidToken),
			};

			var additionalUserClaims = AppUserClaims.GetExtraUserClaims(user);
			claims.AddRange(additionalUserClaims);

 			var tokenString = authentication.CreateToken(claims);
			if (useCookies)
				authentication.AddTokenToCookies(tokenString);
			else
				authentication.AddTokenToAuthorizationHeaders(tokenString);

			return tokenString;
		}

		/// <summary>
        /// KeepAlive Method
        /// A void operation just used to renew the token and keep alive the client's session. 
        /// </summary>        
        public void KeepAlive()
        {
            // Do nothing, that's the purpose!
            return;
        }

		public bool LogOut(bool useCookies)
        {
   			if (useCookies)
			{
				if (HttpContext.Current.Request.Cookies["BearerToken"] != null)
				{
					HttpCookie newCookie = new HttpCookie("BearerToken");
					var baseUrl = GenerativeObjects.Practices.HttpUtilities.GetApplicationBaseUrl();
					var path = GenerativeObjects.Practices.HttpUtilities.GetUrlPath(baseUrl);
					newCookie.Path = path;
					newCookie.Expires = DateTime.Now.AddDays(-1d);
					HttpContext.Current.Response.Cookies.Add(newCookie);
				}
			}

			return true;
        }

		public bool Register(string username, string email, string password)
		{
			if (String.IsNullOrEmpty(username))
				throw new GOServerException<UsernameRequired>();

			return RegisterUser(username, String.Empty, String.Empty, email, password);
		}

		public bool RegisterByEmail(string email, string password)
		{
			return RegisterUser(email, String.Empty, String.Empty, email, password);
		}

		public bool RegisterFull(string firstname, string lastname, string email, string password)
		{
			if (String.IsNullOrEmpty(firstname))
				throw new GOServerException<FirstnameRequired>();

			if (String.IsNullOrEmpty(lastname))
				throw new GOServerException<LastnameRequired>();

			return RegisterUser(email, firstname, lastname, email, password);
		}

		private bool RegisterUser(string username, string firstname, string lastname, string email, string password)
		{
			if (String.IsNullOrEmpty(email))
				throw new GOServerException<EmailRequired>();

			if (String.IsNullOrEmpty(password))
				throw new GOServerException<PasswordRequired>();

			if (!IsValidEmailAddress(email))
				throw new GOServerException<InvalidEmail>();
			
			try
			{
				// Find existing unverified, or create new user
				GOUserDataObject user = FindExistingUser(email);
				if (user != null)
				{
					if (!IsEmailVerificationRequired)
						throw new GOServerException<UserAlreadyRegistered>();

					else if (user.EmailValidated)
						throw new GOServerException<UserAlreadyRegistered>();

					else
					{
						// existing user who hasn't yet verified their email. For this case, overwrite existing GOUser info with the current info
						user.FirstName = firstname;
						user.LastName = lastname;
						user.FullName = $"{firstname} {lastname}";
						user.Password = password;
						user.UserName = username;
						user = DataFacade.GOUserDataProvider.Save(user, skipSecurity: true);
					}
				}
				else
				{
					user = CreateNewUser(username, firstname, lastname, email, password);
				}

				if (OnUserRegistered != null)
					OnUserRegistered(user);

				if (IsEmailVerificationRequired)
				{
					SendRegistrationEmail(user);
				}
			}
			catch (GOServerException e)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<UnexpectedError>();
			}

			return true;
		}

		public bool ValidateRegistration(string key)
		{
			if (String.IsNullOrEmpty(key))
				throw new GOServerException<TokenExpired>();

			string email = String.Empty;

			try
			{
				var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();

				ClaimsPrincipal principal = authentication.ValidateToken(key);
				email = principal.FindFirst(ClaimTypes.Email).Value;
			}
			catch (Exception e)
			{
				throw new GOServerException<TokenExpired>();
			}
			
			try
			{ 
				var user = FindExistingUser(email);
				if (user == null)
					throw new GOServerException<UserNotFound>(email);

				var parameters = new Dictionary<string, object>();
				parameters.Add(ValidatingUser, true);

				user.EmailValidated = true;
				DataFacade.GOUserDataProvider.Save(user, parameters: parameters, skipSecurity: true);

				if (IsAdminApprovalRequired)
				{
					if (!AutoApproveUserRegistration(user))
					{
						NotifyAdministratorsUserApprovalPending(user);
					}
				}

				if (OnRegistrationEmailVerified != null)
					OnRegistrationEmailVerified(user);
			}
			catch (GOServerException)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<EmailVerificationFailed>(e);
			}

			return true;
		}
 
		public bool LostPassword(string email)
		{
			if (!IsValidEmailAddress(email))
				throw new GOServerException<InvalidEmail>();

			var user = FindExistingUser(email);
			if (user == null)
				throw new GOServerException<UserNotFound>(email);

			SendResetPasswordEmail(user);

			return true;
		}

		public bool ResetPassword(string newPassword, string key)
		{
			if (String.IsNullOrEmpty(key))
				throw new GOServerException<TokenExpired>();

			// Log out user if logged in so that any session cookie is expired. Otherwise things can get a bit strange.
			LogOut(true);

			ClaimsPrincipal principal = Authentication.ValidateToken(key);
             
			var email = principal.FindFirst(ClaimTypes.Email).Value;
         
            var includes = new List<string> { "UserRoleItems.Role", "UserGroupItems.Group.GroupRoleItems" };

			var user = FindExistingUser(email, includes);
            if (user == null)
                throw new GOServerException<UserNotFound>(email);

			DateTime? passwordExpiry;
			GORoleDataObject rejectingRole;

			if (!PasswordPolicy.AcceptPassword(user, newPassword, out passwordExpiry, out rejectingRole))
			{
				throw new GOServerException<PasswordPolicyNotSatisfied>(rejectingRole.PasswordPolicySummary);
			}

            user.Password = newPassword;
            user.PasswordExpiry = passwordExpiry;

			DataFacade.GOUserDataProvider.Save(user, null, skipSecurity : true);

			// Even though this isn't technically a login attempt, record a successful authentication so that e.g. we can break a run of consecutive log-in failures
			RecordLogInAttempt(user.UserName, true, "Password Reset");

            return true; 
		}

		/// <summary>
		/// ChangePassword()
		/// API for a user to change their password.
		/// User may be either authenticated or unauthenticated on entry - we re-authenticate regardless.
		/// </summary>
		public bool ChangePassword(string username, string oldPassword, string newPassword, bool useCookies)
		{
			// If the username is missing, attempt to get from the currently authenticated user
			// (because ChangePassword can be called both from an unauthenticated and authenticated context)
			if (String.IsNullOrEmpty(username))
			{
				BearerTokenTransport tokenTransport;
				var bearerToken = Authentication.GetBearerToken(HttpContext.Current, out tokenTransport);
				ClaimsPrincipal principal = Authentication.ValidateToken(bearerToken);
				username = principal.FindFirst(ClaimTypes.Name).Value;
			}

			// Check user is valid. Do this even if userAlreadyAuthenticated because we need to load the Role info anyway
			var includes = new List<string> { "UserRoleItems.Role", "UserGroupItems.Group.GroupRoleItems" };

			var existingUser = DataFacade.GOUserDataProvider.GetCollection(null, String.Format("(UserName == \"{0}\" && Password == \"{1}\")", username, GetMD5Hash(oldPassword)), includes : includes, skipSecurity : true);
			if (existingUser.Count == 0)
				throw new GOServerException<PasswordInvalid>();

			// Don't allow to set the old password again
			if (newPassword == oldPassword)
				throw new GOServerException<PasswordMustBeDifferent>();

			var userToChangePassword = existingUser.FirstOrDefault();

			// Apply password policy
			GORoleDataObject rejectingRole;
			DateTime? passwordExpiry;
			if (!PasswordPolicy.AcceptPassword(userToChangePassword, newPassword, out passwordExpiry, out rejectingRole))
			{
				throw new GOServerException<PasswordPolicyNotSatisfied>(rejectingRole.PasswordPolicySummary);
			}

			userToChangePassword.Password = newPassword;    //  the MD5 encoding is done in GOUserDataProviderExtension.OnBeforeSave, i.e. this.OnBeforeSaveUser because we are the GOUser provider extension 
			userToChangePassword.PasswordExpiry = passwordExpiry;

			// Save new password + passwordExpiry, if any
			DataFacade.GOUserDataProvider.Save(userToChangePassword, null, skipSecurity : true);

			// Authenticate user
			SetAuthenticationToken(existingUser.SingleOrDefault(), useCookies); 
	
			// Record it
			RecordLogInAttempt(username, true, "Password Changed");

			return true;
		}

		public bool Unregister(string email)
		{
			var user = FindExistingUser(email);
			if (user == null)
				throw new GOServerException<UserNotFound>(email);

			user.Unregistered = true;
			DataFacade.GOUserDataProvider.Save(user);

			return true;
		}

		public bool BlockUser(string email, bool block)
		{
			var user = FindExistingUser(email);
			if (user == null)
				throw new GOServerException<UserNotFound>(email);

			user.Blocked = block;
			DataFacade.GOUserDataProvider.Save(user);

			return true;
		}

		public bool ApproveUser(string email)
		{
			// In theory, the following guard not needed, since security rules already enforce this, but just in case:
			if (!IsCurrentUserAdmin())
				return false;

			var user = FindExistingUser(email);
			if (user == null)
				throw new GOServerException<UserNotFound>(email);

			if (IsEmailVerificationRequired && !user.EmailValidated)
				throw new GOServerException<EmailNotVerifiedOnApprove>();

			try
			{
				user.UserValidated = true;
				user = DataFacade.GOUserDataProvider.Save(user);

				if (OnUserApproved != null)
					OnUserApproved(user);
			}
			catch (GOServerException)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<ApproveUserFailed>(e);
			}

			return SendUserApprovedEmail(user);
		}

		/// <summary>
		/// AuthorizeNavigationTo()
		/// Summary of the permissioning logic:
		/// User is in at least one authorizing role for the resource => authorised
		/// All User roles are denied access to the resource => denied
		/// Else the default access setting for the resource is used. (so e.g. if no rules for this role, or if not all roles explicitly denied, then the default is used)
		/// </summary>
		public System.Int32 AuthorizeNavigationTo(System.String nodeName)
		{
			// Get user claims
			UserClaims claims = ApplicationSettings.Container.Resolve<IAuthentication>().GetCurrentUserClaims();

			switch (nodeName)
			{
				default:
					break;
			}

			// If we get here, it means there is no explicit (override) node authorization rule for at least one of the user's roles
			// So check default rules to determine outcome
			return (int)CheckDefaultNavigationNodePermission(claims);
		}

		/// <summary>
		/// CheckDefaultNavigationNodePermission()
		/// </summary>
		private PermissionLevel CheckDefaultNavigationNodePermission(UserClaims claims)
		{
			// Roles ""Administrator", "User"" have default authorized access to all navigation nodes (can still later be overridden by more specific rules)
			if (claims.Roles.Intersect(new List<string> { "Administrator", "User" }).Any())
			{
                return PermissionLevel.Authorized;
			}
			
			return PermissionLevel.Denied;
		} 

		/// <summary>
		/// RecordLogInAttempt()
		/// </summary>
		private void RecordLogInAttempt(string username, bool loginSuccessful, string info = "", GOUserDataObject user = null)
		{
			// if login not successful and no info provided, fill it in
			if (!loginSuccessful && String.IsNullOrEmpty(info))
			{
				bool userIsRegistered = DataFacade.GOUserDataProvider.GetCollection(null, String.Format("(UserName == \"{0}\" || EmailAddress == \"{0}\")", username), skipSecurity: true).Any();

				if (userIsRegistered)
				{
					info = "Invalid password";
				}
				else
				{
					info = "Invalid username";
				}
			}

			{
				// Persist via data provider
				GOLoginHistoryDataObject record = new GOLoginHistoryDataObject();
				record.Timestamp = DateTime.UtcNow;
				record.User = username;
				record.Result = loginSuccessful;
				record.Info = info;
				DataFacade.GOLoginHistoryDataProvider.Save(record, skipSecurity: true);
			}
		}

		public bool SendRegistrationEmail(GOUserDataObject user)
		{
			try
			{
				var link = $"{HttpUtilities.GetApplicationBaseUrl().TrimEnd('/')}/Membership/ValidateRegistration.html";

				string subject, content;
				CreateEmailContent(ResourceCategory.Register, user, link, true, out subject, out content);

				SendEmail(user.EmailAddress, subject, content);

				// Implementation note: It is the responsibility of the caller (RegisterPageViewModel.js) to display a 'You've been sent an email verififcation link' message / page
			}
			catch (GOServerException)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<RegistrationSendEmailFailed>(e);
			}

			return true;
		}

		public bool SendResetPasswordEmail(GOUserDataObject user)
		{
			try
			{
				var link = $"{HttpUtilities.GetApplicationBaseUrl().TrimEnd('/')}/Membership/ResetPassword.html";

				string subject, content;
				CreateEmailContent(ResourceCategory.LostPassword, user, link, true, out subject, out content);

				SendEmail(user.EmailAddress, subject, content);
			}
			catch (GOServerException)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<PasswordRecoverySendEmailFailed>(e);
			}

			return true;
		}

		public bool SendUserApprovedEmail(GOUserDataObject user)
		{
			try
			{
				string link = HttpUtilities.GetApplicationBaseUrl();

				string subject, content;
				CreateEmailContent(ResourceCategory.UserApproved, user, link, false, out subject, out content);

				SendEmail(user.EmailAddress, subject, content);
			}
			catch (GOServerException)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<ApproveUserEmailSendFailed>(e);
			}

			return true;
		}

		public GOUserDataObject FindExistingUser(string email, List<string> includes = null)
		{
			var existingUsers = DataFacade.GOUserDataProvider.GetCollection(null, $"EmailAddress == \"{email}\"", includes: includes, skipSecurity: true);
			if (existingUsers.Count > 0)
			{
				return existingUsers.First();
			}

			return null;
		}

		public IEnumerable<GOUserDataObject> FindAllAdminUsers()
		{
			var admins = DataFacade.GOUserRoleDataProvider.GetCollection(null, "GORoleName == \"Administrator\"", skipSecurity: true).Distinct();
			return admins.Select(x => x.LoadUser(parameters: null, skipSecurity: true));
		}

		public bool IsCurrentUserAdmin()
		{
			var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();
			var claims = authentication.GetCurrentUserClaims();
			return claims.Roles.Contains("Administrator");
		}

		public static string AddEmailTemplate(string content)
		{
			// first try the legacy way (path from config)
			string emailTemplatePath = ConfigurationManager.AppSettings["EmailTemplatePath"];
			string emailTemplateRoot = $"Membership/Resources/{ResourceLanguage}/EmailTemplate";
			string emailImagesPath = null;

			// Try the standard custom/default paths
			if (String.IsNullOrEmpty(emailTemplatePath))
			{
				var emailRoot = $"{emailTemplateRoot}/custom";

				// try the standard custom location
				emailTemplatePath = HttpContext.Current.Request.MapPath($"~/{emailRoot}/email.html");

				if (!File.Exists(emailTemplatePath))
				{
					emailRoot = $"{emailTemplateRoot}/default";
					emailTemplatePath = HttpContext.Current.Request.MapPath($"~/{emailRoot}/email.html");
				}

				emailImagesPath = $"{emailRoot}/Images";

				if (!File.Exists(emailTemplatePath))
					throw new GOServerException<EmailTemplateNotFound>();
			}
			else
			{
				string file = HttpContext.Current.Request.MapPath(emailTemplatePath);

				if (!File.Exists(file))
					throw new GOServerException<EmailTemplateNotFound>();

				emailTemplatePath = file;
				emailImagesPath = "Styles/Images/EmailTemplate";		// the legacy location
			}

			var emailTemplate = File.ReadAllText(emailTemplatePath);

			if (!emailTemplate.Contains("%CONTENT%"))
				throw new GOServerException<EmailTemplateContentPlaceholderNotFound>();

			// Expand %APPNAME%
			emailTemplate = emailTemplate.Replace("%APPNAME%", "Solid");

			content = emailTemplate.Replace("%CONTENT%", content);
			content = content.Replace("%IMAGESFOLDER%", $"{GenerativeObjects.Practices.HttpUtilities.GetApplicationBaseUrl()}/{emailImagesPath}");

			return content;
		}

		private GOUserDataObject CreateNewUser(string username, string firstname, string lastname, string email, string password, bool emailvalidated = false, bool uservalidated = false)
		{
			var newUser = new GOUserDataObject();
			var dataset = ApplicationSettings.Container.Resolve<IObjectsDataSet>();
			dataset.AddObject(newUser);
			newUser.UserName = username;
			newUser.EmailAddress = email;
			newUser.FirstName = firstname;
			newUser.LastName = lastname;
			newUser.FullName = !String.IsNullOrEmpty(firstname) && !String.IsNullOrEmpty(firstname) ? $"{firstname} {lastname}" : username;
			newUser.EmailValidated = emailvalidated;
			newUser.UserValidated = uservalidated;

			var role = DataFacade.GORoleDataProvider.Get(new GORoleDataObject(DefaultRoleForNewUsers), skipSecurity: true);
			var gouserrole = new GOUserRoleDataObject() { GORoleName = role.Name };
			newUser.UserRoleItems.Add(gouserrole);
			gouserrole.Role = role;

			DateTime? passwordExpiry;
			GORoleDataObject rejectingRole;

			if (!PasswordPolicy.AcceptPassword(newUser, password, out passwordExpiry, out rejectingRole))
			{
				throw new GOServerException<PasswordPolicyNotSatisfied>(rejectingRole.PasswordPolicySummary);
			}

			newUser.Password = password;
			newUser.PasswordExpiry = passwordExpiry;

			return DataFacade.GOUserDataProvider.Save(newUser, null, skipSecurity: true);
		}

		private void NotifyAdministratorsUserApprovalPending(GOUserDataObject user)
		{
			if (IsAdminApprovalRequired)
			{
				// Notify approved administrators
				var adminUsers = FindAllAdminUsers().Where(x => x.UserValidated);

				if (!adminUsers.Any())
					throw new GOServerException<AdministratorNotFound>();

				string link = HttpUtilities.GetApplicationBaseUrl();

				string subject, content;
				CreateEmailContent(ResourceCategory.ApproveUser, user, link, false, out subject, out content);

				SendEmail(adminUsers.Select(x => x.EmailAddress), subject, content);
			}
		}

		public enum ResourceCategory
		{
			Register,
			LostPassword,
			ApproveUser,
			UserApproved
		}

		public enum ResourceFile
		{
			Subject,
			Content
		}

		public string GetMembershipResource(ResourceCategory category, ResourceFile type)
		{
			// For reasons of backwards compatibility, we first check to see if some joker decided to ember the resource inside web.config
			string resource = ConfigurationManager.AppSettings[$"{category}{type}"];
			if (!String.IsNullOrEmpty(resource))
				return resource;

			if (HttpContext.Current == null)
				throw new GOServerException<WebContextRequired>();

			// Look for custom version of the resource first, fall back on default version if no custom found
			string path = HttpContext.Current.Request.MapPath($"~/Membership/Resources/{ResourceLanguage}/{category}/custom/{type}");
			if (!File.Exists(path))
				path = HttpContext.Current.Request.MapPath($"~/Membership/Resources/{ResourceLanguage}/{category}/default/{type}");

			if (!File.Exists(path))
				throw new GOServerException<MembershipConfigurationError>();

			return File.ReadAllText(path);
		}

		private void CreateEmailContent(ResourceCategory category, GOUserDataObject user, string link, bool withToken, out string subject, out string content)
		{
			// Note the following throw exceptions if resource missing (so no need to check again here)
			subject = GetMembershipResource(category, ResourceFile.Subject);
			content = GetMembershipResource(category, ResourceFile.Content);

			if (withToken)
			{
				string token = Authentication.CreateToken(
					new Claim[] {
						new Claim(ClaimTypes.Email, user.EmailAddress),
						new Claim(ClaimTypes.Role, "Subscriber"),
					},
					DateTime.Now.AddMinutes(AppSettings.Get<int>(EmailTokenExpiry, 15))
				);
				link = $"{link}?key={token}";
			}
 
			subject = ExpandTemplatePlaceholders(subject, user);
			content = ExpandTemplatePlaceholders(content, user);

			content = content.Replace("%LINK%", link);

			content = AddEmailTemplate(content);
		}
 
		private string ExpandTemplatePlaceholders(string text, GOUserDataObject user)
		{
			string fullname = String.IsNullOrEmpty(user.FirstName) ? user.UserName : $"{user.FirstName} {user.LastName ?? String.Empty}";

			text = text.Replace("%DISPLAYNAME%", $"{fullname}");
			text = text.Replace("%USERNAME%", user.UserName);
			text = text.Replace("%EMAIL%", user.EmailAddress);
			text = text.Replace("%FIRSTNAME%", user.FirstName);
			text = text.Replace("%LASTNAME%", user.LastName);
			text = text.Replace("%APPNAME%", "Solid");
			return text;
		}

		public void SendEmail(string address, string subject, string content)
		{
			SendEmail(new List<string> { address }, subject, content);
		}

		public void SendEmail(IEnumerable<string> addressList, string subject, string content)
		{
			try
			{
				var host = SMTPHost.FromConfiguration();
				var smtpClient = host.IsMockHost ? new MockSMTPClient() : ApplicationSettings.Container.Resolve<ISMTPClient>();
				smtpClient.SendEmail(host, addressList, subject, content);
			}
			catch (GOServerException)
			{
				throw;
			}
			catch (Exception e)
			{
				throw new GOServerException<SendEmailFailed>(e);
			}
		}

		public bool IsValidEmailAddress(string email)
		{
			return Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z");
		}

		private bool AutoApproveUserRegistration(GOUserDataObject user)
		{
			if (AppSettings.Contains("AutoApproveEmailPatterns"))
			{
				var autoAcceptEmailPatterns = AppSettings.Get("AutoApproveEmailPatterns").Split(';');
				foreach (var pattern in autoAcceptEmailPatterns)
				{
					if (Regex.IsMatch(user.EmailAddress, pattern))
					{
						user.UserValidated = true;
						user = DataFacade.GOUserDataProvider.Save(user, skipSecurity: true);

						SendUserApprovedEmail(user);

						return true;
					}
				}
			}

			return false;
		}
	}

	public class PasswordPolicy
	{
		public bool RequirePasswordChange(GOUserDataObject user)
		{
			// result
			bool requirePasswordChange = false;

			// If user.PasswordExpiry is not null and there is at least one Role with a non-null password expiry, then require a password change
			// Otherwise, if there is no policy expiry date it is fine for user password expiry to be null.
			if (user.PasswordExpiry == null)
			{
				foreach (var userrole in user.UserRoleItems)
				{
					if (userrole.Role != null && userrole.Role.PasswordExpiry != null)
					{
						// User lacks a password expiry date - correct this by requiring a password change
						requirePasswordChange = true;
						break;
					}
				}
			}
			else
			{
				// Check password expiry.
				DateTime expiry = user.PasswordExpiry ?? DateTime.MaxValue;
				if (expiry.Date < DateTime.UtcNow.Date)
				{
					requirePasswordChange = true;
				}
			}

			return requirePasswordChange;
		}

		public bool AcceptPassword(GOUserDataObject user, string newPassword, out DateTime? expiry, out GORoleDataObject rejectingRole)
		{
			expiry = null;
			rejectingRole = null;

			// newPassword must satisfy password policy regex for each role the user is assigned to
			foreach (var userrole in user.UserRoleItems)
			{
				if (userrole != null && userrole.Role != null && !String.IsNullOrEmpty(userrole.Role.PasswordRegEx))
				{
					if (!Regex.IsMatch(newPassword, userrole.Role.PasswordRegEx))
					{
						rejectingRole = userrole.Role;						
						return false;
					}
				}
			}

			// If we get here, new password was accepted. Get password expiry info.
			GetNewPasswordExpiry(user, out expiry);

            return true;
		}

		private bool GetNewPasswordExpiry(GOUserDataObject user, out DateTime? expiry)
		{
			expiry = null;

			// Set new expiry date corresponding to the nearest role expiry days
			int numDaysNearestExpiry = int.MaxValue;

			if (user.UserRoleItems != null)
			{
				foreach (var userrole in user.UserRoleItems)
				{
					if (userrole != null && userrole.Role != null)
					{
						numDaysNearestExpiry = Math.Min(numDaysNearestExpiry, userrole.Role.PasswordExpiry ?? int.MaxValue);
					}
				}
			}

			if (numDaysNearestExpiry != int.MaxValue)
			{
				expiry = DateTime.UtcNow.Date.AddDays(numDaysNearestExpiry);
			}

			return numDaysNearestExpiry != int.MaxValue;
		}
	}
}
