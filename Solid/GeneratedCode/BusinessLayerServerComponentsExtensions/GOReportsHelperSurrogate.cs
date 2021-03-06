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
	public partial class GOReportsHelperSurrogate : IGOReportsHelper 
	{
		/// <summary>
		/// The extensions for implementors of IGOReportsHelperExtension to attach to
		/// </summary>
		public event EventHandler<ComponentExtensionEventArgs> OnBeforeCall;
		public event EventHandler<ComponentExtensionEventArgs> OnAfterCall;

		/// <summary>
		/// Le component underlying
		/// </summary>
		private GOReportsHelper _theComponent = new GOReportsHelper();
		public GOReportsHelper ComponentClass { get { return _theComponent; } }

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
				
				foreach (var registration in ApplicationSettings.Container.Registrations.Where(r => r.RegisteredType == typeof(IGOReportsHelperExtension)))
				{
					var ext = ApplicationSettings.Container.Resolve(typeof(IGOReportsHelperExtension), registration.Name) as IGOReportsHelperExtension;
					if (ext != null)
					{
						ext.Init(this);
					}
				}

				_extensionsInitialised = true;
			}
		}

		/// <summary>
		/// Surrogate implementation of the GetEmbeddedReportUrl operation which provides OnBeforeCall and OnAfterCall extension points to the underlying (real) component call
		/// </summary>
		public System.String GetEmbeddedReportUrl(System.Guid reportId, System.String payload) 
		{
			InitializeExtensions();

			if (OnBeforeCall != null)
			{
				OnBeforeCall(this, new ComponentExtensionEventArgs() { OperationName = "GetEmbeddedReportUrl" });
			}

			var result = _theComponent.GetEmbeddedReportUrl(reportId, payload);
 
			if (OnAfterCall != null)
			{
				OnAfterCall(this, new ComponentExtensionEventArgs() { OperationName = "GetEmbeddedReportUrl" });
			}

			return result;
		}

	}
}
