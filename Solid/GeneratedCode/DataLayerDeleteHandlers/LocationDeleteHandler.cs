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
	public partial class LocationDeleteHandler : DeleteHandlerBase<LocationDataObject>
	{
		public override void RippleDelete(LocationDataObject instance, Parameters parameters, DataProviderDeleteSettings settings)
		{
			// Set resync flag initially so that if any processing is done, it's on the latest copy of the data
			NeedResync = true;

			// Location.PlaceToLocationItems (Protected) (i.e. Unable to delete Location instances because PlaceToLocationItems.Location is not optional and needs to be cleared first)
			{
				instance = Resync(instance);
				instance.LoadPlaceToLocationItems(parameters, skipSecurity: true);
				AddAnyBlockages("failDeleteProtected", instance, instance.PlaceToLocationItems);
			}
		}
	}
}