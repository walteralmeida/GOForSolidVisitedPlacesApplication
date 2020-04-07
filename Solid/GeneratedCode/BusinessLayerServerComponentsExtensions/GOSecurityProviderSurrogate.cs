﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
////////////////////////////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;

using Unity;

using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Threading;

using Solid.BusinessLayer.ORMSupportClasses;
using Solid.Data.DataObjects;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
 
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using Parameters = System.Collections.Generic.Dictionary<string, object>;

namespace Solid.BusinessLayer.Components.Server.Extensions
{
	public partial class GOSecurityProviderSurrogate : IGOSecurityProvider 
	{
		/// <summary>
		/// The extensions for implementors of IGOSecurityProviderExtension to attach to
		/// </summary>
		public event EventHandler<ComponentExtensionEventArgs> OnBeforeCall;
		public event EventHandler<ComponentExtensionEventArgs> OnAfterCall;

		/// <summary>
		/// Le component underlying
		/// </summary>
		private GOSecurityProvider _theComponent = new GOSecurityProvider();
		public GOSecurityProvider ComponentClass { get { return _theComponent; } }

		/// <summary>
		/// Thread-synchronisation gubbins
		/// </summary>
		private bool _extensionsInitialised;
		private Object _lock = new Object();
			
		/// <summary>
		/// InitializeExtensions()
		/// Find and initialise registered extensions of this interface
		/// Done in a thread-safe manner to allow for possibility that component may have been registered as singleton (controlled lifetime)
		/// </summary>
		private void InitializeExtensions()
		{
			// Ensure component extensions have been initialised
			if (_extensionsInitialised)
				return;

			lock (_lock)
			{
				if (_extensionsInitialised)
					return;
				
				foreach (var registration in ApplicationSettings.Container.Registrations.Where(r => r.RegisteredType == typeof(IGOSecurityProviderExtension)))
				{
					var ext = ApplicationSettings.Container.Resolve(typeof(IGOSecurityProviderExtension), registration.Name) as IGOSecurityProviderExtension;
					if (ext != null)
					{
						ext.Init(this);
					}
				}

				_extensionsInitialised = true;
			}
		}

		/// <summary>
		/// Surrogate implementation of the ApproveUser operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean ApproveUser(System.String email) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "ApproveUser" });
			}

			var result = _theComponent.ApproveUser(email);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "ApproveUser" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the Authenticate operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.String Authenticate(System.String username, System.String password, System.Boolean useCookies) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "Authenticate" });
			}

			var result = _theComponent.Authenticate(username, password, useCookies);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "Authenticate" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the AuthorizeNavigationTo operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Int32 AuthorizeNavigationTo(System.String nodeName) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "AuthorizeNavigationTo" });
			}

			var result = _theComponent.AuthorizeNavigationTo(nodeName);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "AuthorizeNavigationTo" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the BlockUser operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean BlockUser(System.String email, System.Boolean block) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "BlockUser" });
			}

			var result = _theComponent.BlockUser(email, block);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "BlockUser" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the ChangePassword operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean ChangePassword(System.String userId, System.String oldPassword, System.String newPassword, System.Boolean useCookies) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "ChangePassword" });
			}

			var result = _theComponent.ChangePassword(userId, oldPassword, newPassword, useCookies);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "ChangePassword" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the KeepAlive operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public void KeepAlive() 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "KeepAlive" });
			}

			_theComponent.KeepAlive();
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "KeepAlive" });
			}

		}

		/// <summary>
		/// Surrogate implementation of the LogOut operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean LogOut(System.Boolean useCookies) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "LogOut" });
			}

			var result = _theComponent.LogOut(useCookies);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "LogOut" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the LostPassword operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean LostPassword(System.String email) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "LostPassword" });
			}

			var result = _theComponent.LostPassword(email);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "LostPassword" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the Register operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean Register(System.String username, System.String email, System.String password) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "Register" });
			}

			var result = _theComponent.Register(username, email, password);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "Register" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the RegisterByEmail operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean RegisterByEmail(System.String email, System.String password) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "RegisterByEmail" });
			}

			var result = _theComponent.RegisterByEmail(email, password);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "RegisterByEmail" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the RegisterFull operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean RegisterFull(System.String firstname, System.String lastname, System.String email, System.String password) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "RegisterFull" });
			}

			var result = _theComponent.RegisterFull(firstname, lastname, email, password);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "RegisterFull" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the ResetPassword operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean ResetPassword(System.String password, System.String token) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "ResetPassword" });
			}

			var result = _theComponent.ResetPassword(password, token);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "ResetPassword" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the Unregister operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean Unregister(System.String email) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "Unregister" });
			}

			var result = _theComponent.Unregister(email);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "Unregister" });
			}

			return result;
		}

		/// <summary>
		/// Surrogate implementation of the ValidateRegistration operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.Boolean ValidateRegistration(System.String token) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "ValidateRegistration" });
			}

			var result = _theComponent.ValidateRegistration(token);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "ValidateRegistration" });
			}

			return result;
		}

	}
}
