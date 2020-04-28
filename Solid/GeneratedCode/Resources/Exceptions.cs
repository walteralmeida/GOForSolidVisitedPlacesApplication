using GenerativeObjects.Practices.ExceptionHandling;

namespace Solid.Data.Resources.Exceptions
{
	public class MandatoryUsernameAndPassword : GOServerExceptionInfoProvider
	{
		public override string Message => "MISSING_TRANSLATION___MEMBERSHIP_MANDATORY_USERNAME_AND_PASSWORD '{0}'";
	}

	public class UserNotFound : GOServerExceptionInfoProvider
	{
		public override string Message => "Sorry - No account could be found matching email address '{0}'";
	}

	public class UnknownUsernameOrPassword : GOServerExceptionInfoProvider
	{
		public override string Message => "Unknown username or password";
	}

	public class EmailNotVerified : GOServerExceptionInfoProvider
	{
		public override string Message => "Before you log-in, you need to validate your account. Please check your email, or try to re-register";
	}

	public class EmailNotVerifiedAndEmailResent : GOServerExceptionInfoProvider
	{
		public override string Message => "Before you can log-in, you need to validate your account. Your registration email has been resent - Please check your inbox!";
	}

	public class EmailNotVerifiedOnApprove : GOServerExceptionInfoProvider
	{
		public override string Message => "This user has not yet verified their email address!";
	}

	public class AdminApprovalPending : GOServerExceptionInfoProvider
	{
		public override string Message => "Sorry - Your account hasn't yet been approved by an administrator.";
	}

	public class PasswordInvalid : GOServerExceptionInfoProvider
	{
		public override string Message => "Invalid password";
	}

	public class PasswordMustBeDifferent : GOServerExceptionInfoProvider
	{
		public override string Message => "Passwords must be different";
	}

	public class UsernameRequired : GOServerExceptionInfoProvider
	{
		public override string Message => "User Name is mandatory";
	}

	public class FirstnameRequired : GOServerExceptionInfoProvider
	{
		public override string Message => "First Name is mandatory";
	}

	public class LastnameRequired : GOServerExceptionInfoProvider
	{
		public override string Message => "Last Name is mandatory";
	}

	public class EmailRequired : GOServerExceptionInfoProvider
	{
		public override string Message => "Email Address is mandatory";
	}

	public class PasswordRequired : GOServerExceptionInfoProvider
	{
		public override string Message => "Password is mandatory";
	}

	public class InvalidEmail : GOServerExceptionInfoProvider
	{
		public override string Message => "The provided Email Address is invalid.";
	}

	public class UserAlreadyRegistered : GOServerExceptionInfoProvider
	{
		public override string Message => "You're already registered! Follow the link to the login page (below)";
	}

	public class UnexpectedError : GOServerExceptionInfoProvider
	{
		public override string Message => "Something went wrong - please try again";
	}

	public class TokenExpired : GOServerExceptionInfoProvider
	{
		public override string Message => "Sorry - The validate registration request has expired. Please try to register again.";
	}

	public class EmailVerificationFailed : GOServerExceptionInfoProvider
	{
		public override string Message => "Sorry - email verification failed. Please try to register again.";
	}

	public class PasswordPolicyNotSatisfied : GOServerExceptionInfoProvider
	{
		public override string Message => "Password rejected due to policy: {0}";
	}

	public class ApproveUserFailed : GOServerExceptionInfoProvider
	{
		public override string Message => "Sorry - user approval failed - Please try again!";
	}

	public class ApproveUserEmailSendFailed : GOServerExceptionInfoProvider
	{
		public override string Message => "The user was approved successfully, but the user's confirmation email failed to send!";
	}

	public class RegistrationSendEmailFailed : GOServerExceptionInfoProvider
	{
		public override string Message => "A problem occurred while trying to send you your registration email, please try again later";
	}

	public class PasswordRecoverySendEmailFailed : GOServerExceptionInfoProvider
	{
		public override string Message => "A problem occurred while trying to send you your password reset email, please try again later";
	}

	public class EmailTemplateNotFound : GOServerExceptionInfoProvider
	{
		public override string Message => "Email configuration error - please notify support";
	}

	public class EmailTemplateContentPlaceholderNotFound : GOServerExceptionInfoProvider
	{
		public override string Message => "Email template should contain a %CONTENT% placeholder";
	}

	public class AdministratorNotFound : GOServerExceptionInfoProvider
	{
		public override string Message => "No Administrator users have been configured - please contact support!";
	}

	public class WebContextRequired : GOServerExceptionInfoProvider
	{
		public override string Message => "Membership Email services are only available in a web context!";
	}

	public class MembershipConfigurationError : GOServerExceptionInfoProvider
	{
		public override string Message => "Membership resource {category}/default/{type} is missing - please contact support";
	}

	public class SendEmailFailed : GOServerExceptionInfoProvider
	{
		public override string Message => "A problem occurred while trying to send email, please try again later";
	}

	public class UserAccountDisabled : GOServerExceptionInfoProvider
	{
		public override string Message => "This account has been deactivated. If you believe this to be an error, please contact an Administrator.";
	}
}