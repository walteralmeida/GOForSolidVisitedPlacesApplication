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
	public partial class UserProfileDeleteHandler : DeleteHandlerBase<UserProfileDataObject>
	{
		public override void RippleDelete(UserProfileDataObject instance, Parameters parameters, DataProviderDeleteSettings settings)
		{
			// Set resync flag initially so that if any processing is done, it's on the latest copy of the data
			NeedResync = true;

			// UserProfile.GOUser (Reference)
			{
				instance = Resync(instance);
				instance.LoadGOUser(parameters, skipSecurity: true);
				
				// We are the PK side entity in a OneToOne relationship, and the FK reference to us is optional.
				// So delete can proceed, but first we need to clear down the FK reference to us.
				var item = instance.GOUser;				
				if (item != null && item.UserProfile != null)
				{
					item.UserProfile = null; 
					Save(item);
				}
			}
			// UserProfile.VisitedPlaceItems (Protected) (i.e. Unable to delete UserProfile instances because VisitedPlaceItems.UserProfile is not optional and needs to be cleared first)
			{
				instance = Resync(instance);
				instance.LoadVisitedPlaceItems(parameters, skipSecurity: true);
				AddAnyBlockages("failDeleteProtected", instance, instance.VisitedPlaceItems);
			}
		}
	}
}