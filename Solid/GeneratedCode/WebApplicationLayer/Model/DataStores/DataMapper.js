﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	// DataMapper map between JSON data and observable DataObject/DataSet data
	Solid.Web.Model.DataStores.MapJSONDataToDataSet = function(dataSet, jsondata, thecontextId, entityName, oncompleted) {
		if(!jsondata)
			return;

		dataSet.cleanContext(thecontextId);

		var result = [];
		
		var newDataObject;
		var i;
		if (jsondata.ObjectsDataSet.CountryObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.CountryObjectsDataSet.CountryObjects) {
				if (Solid.Web.Model.DataObjects.CountryObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.CountryObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.CountryObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.CountryObjectsDataSet.CountryObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "country") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.URI())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "country"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.URI())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GOGroupObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GOGroupObjectsDataSet.GOGroupObjects) {
				if (Solid.Web.Model.DataObjects.GOGroupObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GOGroupObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GOGroupObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GOGroupObjectsDataSet.GOGroupObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gogroup") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.Name())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gogroup"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.Name())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet.GOGroupRoleObjects) {
				if (Solid.Web.Model.DataObjects.GOGroupRoleObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GOGroupRoleObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GOGroupRoleObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet.GOGroupRoleObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gogrouprole") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id1) === newDataObject.Data.GOGroupName() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id2) === newDataObject.Data.GORoleName())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gogrouprole"))
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id1) === newDataObject.Data.GOGroupName() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id2) === newDataObject.Data.GORoleName())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet.GOLoginHistoryObjects) {
				if (Solid.Web.Model.DataObjects.GOLoginHistoryObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GOLoginHistoryObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GOLoginHistoryObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet.GOLoginHistoryObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gologinhistory") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.Id())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gologinhistory"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.Id())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GORoleObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GORoleObjectsDataSet.GORoleObjects) {
				if (Solid.Web.Model.DataObjects.GORoleObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GORoleObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GORoleObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GORoleObjectsDataSet.GORoleObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gorole") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.Name())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gorole"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.Name())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GOUserObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GOUserObjectsDataSet.GOUserObjects) {
				if (Solid.Web.Model.DataObjects.GOUserObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GOUserObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GOUserObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GOUserObjectsDataSet.GOUserObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gouser") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.Id())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gouser"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.Id())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet.GOUserGroupObjects) {
				if (Solid.Web.Model.DataObjects.GOUserGroupObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GOUserGroupObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GOUserGroupObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet.GOUserGroupObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gousergroup") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id1) === newDataObject.Data.GOGroupName() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id2) === newDataObject.Data.GOUserId())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gousergroup"))
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id1) === newDataObject.Data.GOGroupName() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id2) === newDataObject.Data.GOUserId())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet.GOUserRoleObjects) {
				if (Solid.Web.Model.DataObjects.GOUserRoleObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.GOUserRoleObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.GOUserRoleObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet.GOUserRoleObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "gouserrole") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id1) === newDataObject.Data.GORoleName() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id2) === newDataObject.Data.GOUserId())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "gouserrole"))
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id1) === newDataObject.Data.GORoleName() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id2) === newDataObject.Data.GOUserId())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.LocationObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.LocationObjectsDataSet.LocationObjects) {
				if (Solid.Web.Model.DataObjects.LocationObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.LocationObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.LocationObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.LocationObjectsDataSet.LocationObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "location") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.URI())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "location"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.URI())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.PlaceObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.PlaceObjectsDataSet.PlaceObjects) {
				if (Solid.Web.Model.DataObjects.PlaceObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.PlaceObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.PlaceObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.PlaceObjectsDataSet.PlaceObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "place") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(jsondata.PrimaryKeys[i] === newDataObject.Data.URI())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "place"))
					{
						if(jsondata.PrimaryKey === newDataObject.Data.URI())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		if (jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet) {
	    	for (var prop in jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet.PlaceToLocationObjects) {
				if (Solid.Web.Model.DataObjects.PlaceToLocationObject === undefined) {
					GO.log('missing Solid.Web.Model.DataObjects.PlaceToLocationObject definition. Are you missing a JS dependency?');
					break;
				}

				newDataObject = new Solid.Web.Model.DataObjects.PlaceToLocationObject();
				newDataObject.Data.IsNew(false);
				newDataObject.contextIds.push(thecontextId);
				newDataObject = GenerativeObjects.Web.JSONToDataObject(jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet.PlaceToLocationObjects[prop], newDataObject);
				newDataObject.Data.IsDirty(false);
				dataSet.AddOrReplaceObject(newDataObject);
				
				if((entityName === "placetolocation") && jsondata.PrimaryKeys !== undefined)
				{
					for(i=0; i<jsondata.PrimaryKeys.length ; i++) 
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id1) === newDataObject.Data.LocationURI() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKeys[i].Id2) === newDataObject.Data.PlaceURI())
						{
							result.push(newDataObject);
							jsondata.PrimaryKeys.splice(i, 1);
							break; // Break in order to avoid looping when the item has already been founded
						}
					}
				}
				else {
					if((entityName === "placetolocation"))
					{
						if(GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id1) === newDataObject.Data.LocationURI() && GenerativeObjects.Web.JSONToData(jsondata.PrimaryKey.Id2) === newDataObject.Data.PlaceURI())
						{
							result.push(newDataObject);
						}
					}
				}
			}
		}

		for (var i = 0; i < result.length; i++) {
			result[i].updateDependentValues();
		}
		
		return result;
	};		

	Solid.Web.Model.DataStores.MapDataSetToJSON = function(dataobject, contextId) {

        var jsondata = {};		
		jsondata.InternalObjectId = dataobject.Data.InternalObjectId(); 
		jsondata.PrimaryKey = dataobject.Data.PrimaryKey();

		jsondata.ObjectsDataSet = {};
		jsondata.ObjectsDataSet.$type = "ObjectsDataSet";

		var dataset = dataobject.ObjectsDataSet;
		
		var objects = null;
		var prop;

		if (dataset.countryObjectsDataSet) {
			objects = dataset.countryObjectsDataSet.countryObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.CountryObjectsDataSet = {};
						jsondata.ObjectsDataSet.CountryObjectsDataSet.CountryObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.CountryObjectsDataSet.CountryObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gOGroupObjectsDataSet) {
			objects = dataset.gOGroupObjectsDataSet.gOGroupObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GOGroupObjectsDataSet = {};
						jsondata.ObjectsDataSet.GOGroupObjectsDataSet.GOGroupObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GOGroupObjectsDataSet.GOGroupObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gOGroupRoleObjectsDataSet) {
			objects = dataset.gOGroupRoleObjectsDataSet.gOGroupRoleObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet = {};
						jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet.GOGroupRoleObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet.GOGroupRoleObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gOLoginHistoryObjectsDataSet) {
			objects = dataset.gOLoginHistoryObjectsDataSet.gOLoginHistoryObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet = {};
						jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet.GOLoginHistoryObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet.GOLoginHistoryObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gORoleObjectsDataSet) {
			objects = dataset.gORoleObjectsDataSet.gORoleObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GORoleObjectsDataSet = {};
						jsondata.ObjectsDataSet.GORoleObjectsDataSet.GORoleObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GORoleObjectsDataSet.GORoleObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gOUserObjectsDataSet) {
			objects = dataset.gOUserObjectsDataSet.gOUserObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GOUserObjectsDataSet = {};
						jsondata.ObjectsDataSet.GOUserObjectsDataSet.GOUserObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GOUserObjectsDataSet.GOUserObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gOUserGroupObjectsDataSet) {
			objects = dataset.gOUserGroupObjectsDataSet.gOUserGroupObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet = {};
						jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet.GOUserGroupObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet.GOUserGroupObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.gOUserRoleObjectsDataSet) {
			objects = dataset.gOUserRoleObjectsDataSet.gOUserRoleObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet = {};
						jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet.GOUserRoleObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet.GOUserRoleObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.locationObjectsDataSet) {
			objects = dataset.locationObjectsDataSet.locationObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.LocationObjectsDataSet = {};
						jsondata.ObjectsDataSet.LocationObjectsDataSet.LocationObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.LocationObjectsDataSet.LocationObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.placeObjectsDataSet) {
			objects = dataset.placeObjectsDataSet.placeObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.PlaceObjectsDataSet = {};
						jsondata.ObjectsDataSet.PlaceObjectsDataSet.PlaceObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.PlaceObjectsDataSet.PlaceObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
		if (dataset.placeToLocationObjectsDataSet) {
			objects = dataset.placeToLocationObjectsDataSet.placeToLocationObjects;
			
			if ( !GO.isObjectEmpty(objects) ) {
				var init = false;
				
				for (prop in objects) {
					if (objects[prop].Data.IsDirty() === false || GO.Web.isDataObjectInContext(objects[prop], contextId) === false)
						continue;

					if (init === false) {
						jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet = {};
						jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet.PlaceToLocationObjects = {};
						init = true;
					}

					jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet.PlaceToLocationObjects[objects[prop].Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(objects[prop]);
				}
			}
		}
        return jsondata;
	};		

	Solid.Web.Model.DataStores.MapDataObjectToJSON = function(dataobject) {
	
		if (dataobject == null)
			return null;

        var jsondata = {};		
		jsondata.InternalObjectId = dataobject.Data.InternalObjectId(); 
		jsondata.ObjectsDataSet = {};
		jsondata.ObjectsDataSet.$type = "ObjectsDataSet";

		if (dataobject._objectType === "Country") {
			jsondata.ObjectsDataSet.CountryObjectsDataSet = {};
			jsondata.ObjectsDataSet.CountryObjectsDataSet.CountryObjects = {};

			jsondata.ObjectsDataSet.CountryObjectsDataSet.CountryObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GOGroup") {
			jsondata.ObjectsDataSet.GOGroupObjectsDataSet = {};
			jsondata.ObjectsDataSet.GOGroupObjectsDataSet.GOGroupObjects = {};

			jsondata.ObjectsDataSet.GOGroupObjectsDataSet.GOGroupObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GOGroupRole") {
			jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet = {};
			jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet.GOGroupRoleObjects = {};

			jsondata.ObjectsDataSet.GOGroupRoleObjectsDataSet.GOGroupRoleObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GOLoginHistory") {
			jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet = {};
			jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet.GOLoginHistoryObjects = {};

			jsondata.ObjectsDataSet.GOLoginHistoryObjectsDataSet.GOLoginHistoryObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GORole") {
			jsondata.ObjectsDataSet.GORoleObjectsDataSet = {};
			jsondata.ObjectsDataSet.GORoleObjectsDataSet.GORoleObjects = {};

			jsondata.ObjectsDataSet.GORoleObjectsDataSet.GORoleObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GOUser") {
			jsondata.ObjectsDataSet.GOUserObjectsDataSet = {};
			jsondata.ObjectsDataSet.GOUserObjectsDataSet.GOUserObjects = {};

			jsondata.ObjectsDataSet.GOUserObjectsDataSet.GOUserObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GOUserGroup") {
			jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet = {};
			jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet.GOUserGroupObjects = {};

			jsondata.ObjectsDataSet.GOUserGroupObjectsDataSet.GOUserGroupObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "GOUserRole") {
			jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet = {};
			jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet.GOUserRoleObjects = {};

			jsondata.ObjectsDataSet.GOUserRoleObjectsDataSet.GOUserRoleObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "Location") {
			jsondata.ObjectsDataSet.LocationObjectsDataSet = {};
			jsondata.ObjectsDataSet.LocationObjectsDataSet.LocationObjects = {};

			jsondata.ObjectsDataSet.LocationObjectsDataSet.LocationObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "Place") {
			jsondata.ObjectsDataSet.PlaceObjectsDataSet = {};
			jsondata.ObjectsDataSet.PlaceObjectsDataSet.PlaceObjects = {};

			jsondata.ObjectsDataSet.PlaceObjectsDataSet.PlaceObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
		if (dataobject._objectType === "PlaceToLocation") {
			jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet = {};
			jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet.PlaceToLocationObjects = {};

			jsondata.ObjectsDataSet.PlaceToLocationObjectsDataSet.PlaceToLocationObjects[dataobject.Data.InternalObjectId()] = GenerativeObjects.Web.DataObjectToJSON(dataobject);
		}
        return jsondata;
	};		


} ());