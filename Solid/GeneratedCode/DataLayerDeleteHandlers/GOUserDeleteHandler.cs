﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;

using Unity;
using Unity.Attributes;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer.Extensions;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ExceptionHandling;

using Solid.Data.DataObjects;

using Parameters = System.Collections.Generic.Dictionary<string, object>;


namespace Solid.Data.DeleteHandlers
{
	public partial class GOUserDeleteHandler : DeleteHandlerBase<GOUserDataObject>
	{
		public override void RippleDelete(GOUserDataObject instance, Parameters parameters, DataProviderDeleteSettings settings)
		{
			// Set resync flag initially so that if any processing is done, it's on the latest copy of the data
			NeedResync = true;

			// GOUser.UserGroupItems (Cascade)
			{
				instance = Resync(instance);
				instance.LoadUserGroupItems(parameters, skipSecurity: true);
				foreach (var item in instance.UserGroupItems)			
				{					
					this.Delete(item, parameters, settings, instance);
				}				
			}
			// GOUser.UserRoleItems (Cascade)
			{
				instance = Resync(instance);
				instance.LoadUserRoleItems(parameters, skipSecurity: true);
				foreach (var item in instance.UserRoleItems)			
				{					
					this.Delete(item, parameters, settings, instance);
				}				
			}
			// GOUser.UserProfile (Reference)
			{
				instance = Resync(instance);
				instance.LoadUserProfile(parameters, skipSecurity: true);
				// We are the FK side entity and the PK side is optional, so no action required here (because when we're deleted, any reference(s) to UserProfile(s) is (are) deleted with us)	
			}
		}
	}
}