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
	public partial class GOGroupDeleteHandler : DeleteHandlerBase<GOGroupDataObject>
	{
		public override void RippleDelete(GOGroupDataObject instance, Parameters parameters, DataProviderDeleteSettings settings)
		{
			// Set resync flag initially so that if any processing is done, it's on the latest copy of the data
			NeedResync = true;

			// GOGroup.GroupRoleItems (Cascade)
			{
				instance = Resync(instance);
				instance.LoadGroupRoleItems(parameters, skipSecurity: true);
				foreach (var item in instance.GroupRoleItems)			
				{					
					this.Delete(item, parameters, settings, instance);
				}				
			}
			// GOGroup.UserGroupItems (Cascade)
			{
				instance = Resync(instance);
				instance.LoadUserGroupItems(parameters, skipSecurity: true);
				foreach (var item in instance.UserGroupItems)			
				{					
					this.Delete(item, parameters, settings, instance);
				}				
			}
		}
	}
}