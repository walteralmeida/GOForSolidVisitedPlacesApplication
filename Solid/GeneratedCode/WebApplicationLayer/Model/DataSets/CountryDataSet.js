﻿
////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {	
	'use strict';

	// Country data set. Container for all Country objects
	Solid.Web.Model.DataSets.countryObjectsDataSet = function (rootDataSet) {
		var self = this;

        this._rootObjectDataSet = rootDataSet;
		// Collection holding all Country objects for current dataset - key : internal object id - value : object
		this.countryObjects = {};
	
		// Mapping between entity primary key and objects internal id  - key : primary key(s) - value : internal object id
		this.countryObjectInternalIds = {};
		
		this.fkIndexes = {};

		
	};

	/***************************
	******** METHODS ***********
	***************************/

    Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.GetRootObjectDataSet = function () {
        return this._rootObjectDataSet;
    };
		
    Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.SetRootObjectDataSet = function (dataSet) {
        this._rootObjectDataSet = dataSet;
    };

	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.Clone = function (rootDataSet) {
		var clone = new Solid.Web.Model.DataSets.countryObjectsDataSet(rootDataSet);
		if (!this.countryObjects)
			return clone;

		for (var key in this.countryObjects) {
			var objectClone = this.countryObjects[key].Clone();
			clone.countryObjects = objectClone;
		}
				
		clone.countryObjectInternalIds = {};

		for (var key0 in this.countryObjectInternalIds) {
			clone.countryObjectInternalIds[key0] = this.countryObjectInternalIds[key0];
		}
			
		return clone;
	};

	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.AddOrReplaceObject = function (objectToAdd) {
		this.AddObject(objectToAdd, true);	
	};

	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.AddObject = function (objectToAdd, replaceIfExists) {
		var existingObject = this.GetObject(objectToAdd);

        if (!replaceIfExists && existingObject)
            throw new Error("Object already exists");

		var newInternalId = 0;
			
		if (existingObject) {
			// We copy values instead of just replacing the object to make sure we don't loose existing ko notifications
			newInternalId = existingObject.Data.InternalObjectId();
			objectToAdd.Data.InternalObjectId(newInternalId);
			// we merge the contextIds because the objects may be associated to several context Ids
			for (var i = 0; i < existingObject.contextIds.length; i++) {
				var exist = false;
				for (var j = 0; j < objectToAdd.contextIds.length; j++) {
					if (existingObject.contextIds[i].join() === objectToAdd.contextIds[j].join()) {
						exist = true;
						break;
					}
				}

				if (exist === false)
					objectToAdd.contextIds.push(existingObject.contextIds[i]);
			}

			existingObject.CopyValuesFrom(objectToAdd);
		}
		else {
			newInternalId = this._rootObjectDataSet.getNextNewObjectId();
			objectToAdd.Data.InternalObjectId(newInternalId);
			this.countryObjects[newInternalId] = objectToAdd;
		}
			
		if (objectToAdd.Data.IsNew() === false && !existingObject) {
			this.countryObjectInternalIds[objectToAdd.Data.URI()] = newInternalId;
		}
	};
		
    Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.RemoveObject = function (objectToRemove) {
        if (!this.countryObjects)
            return;

		var objectToRemoveInternalId = null;
			
		if (objectToRemove.Data.IsNew() === true) {
			objectToRemoveInternalId = objectToRemove.Data.InternalObjectId();
		}
		else {
			if (!this.countryObjectInternalIds[objectToRemove.Data.URI()]) 			
				return;

			objectToRemoveInternalId = this.countryObjectInternalIds[objectToRemove.Data.URI()];
		}
			
		if (!objectToRemoveInternalId || !this.countryObjects[objectToRemoveInternalId])			
			return; //object not in dataset => return
			
		this.countryObjects[objectToRemoveInternalId].release();
		delete this.countryObjects[objectToRemoveInternalId];
		
		if (objectToRemove.Data.IsNew() === false) {
			delete this.countryObjectInternalIds[objectToRemove.Data.URI()];
		}

	};

	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.GetObjectByInternalId = function (internalObjectId, includeHierarchy) {
        if (this.countryObjects[internalObjectId])
			return this.countryObjects[internalObjectId];		
		
		if(includeHierarchy) {
			// No hierarchy, nothing has been generated, unused bit of code
		}

		return null;
	};

 	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.GetObjectByPK = function(uRI) {
		if (this.countryObjects[this.countryObjectInternalIds[uRI]]) {			
			return this.countryObjects[this.countryObjectInternalIds[uRI]];
		}

		return null;
	};

    Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.GetObject = function (objectToGet) {
	    if (!this.countryObjects)
            return null;

		var objectToGetInternalId = null;

		if (objectToGet.Data.IsNew() === true) {
			objectToGetInternalId = objectToGet.Data.InternalObjectId();
		} else {
			if (!this.countryObjectInternalIds[objectToGet.Data.URI()]) 			
				return null;
			objectToGetInternalId = this.countryObjectInternalIds[objectToGet.Data.URI()];
		}

		return objectToGetInternalId === null ? null : this.countryObjects[objectToGetInternalId];
    };

    Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.GetObjectsMarkedForDeletion = function () {
        if (!this.countryObjects)
            return [];

		var toReturn = [];
			
		for (var prop in this.countryObjects) {
			if (this.countryObjects[prop].Data.IsMarkedForDeletion()) {
				toReturn.push(this.countryObjects[prop]);
			}
		}

		return toReturn;
    };

	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.GetRelatedObjects = function (rootObject, relationName) {
		if (relationName == "VisitedPlaceItems") {
            var result = [];
			var relatedDataSet = this._rootObjectDataSet.getVisitedPlaceObjectsDataSet();
			if (relatedDataSet !== undefined) 
				result = relatedDataSet.GetVisitedPlaceItemsForCountry(rootObject);

			return result;
		}		
		return null;
	};
		
	Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.cleanContext = function (thecontextId) {
		for (var prop in this.countryObjects) {
			var shouldDelete = true;

			if (this.countryObjects[prop].contextIds.length !== 0) {
				var contextIdsToKeep = [],
					len = this.countryObjects[prop].contextIds.length;
				for (var i = 0; i < len; i++) {
					var contextId = this.countryObjects[prop].contextIds[i];

					if (contextId.length < thecontextId.length) {
						contextIdsToKeep.push(contextId);
 					} else {										
						for (var j=0; j < thecontextId.length; j++) {
							if (contextId[j] !== thecontextId[j]) {
								contextIdsToKeep.push(contextId);
								break;
							}
						}
					}
				}
					
				this.countryObjects[prop].contextIds	= contextIdsToKeep;
					
				shouldDelete = (contextIdsToKeep.length === 0);
			}
				 				
			if (shouldDelete === true) {
				this.RemoveObject(this.countryObjects[prop]);				
			}
		}
	};
		
    Solid.Web.Model.DataSets.countryObjectsDataSet.prototype.Merge = function (dataSetToMerge) {
		if (!dataSetToMerge.countryObjects)
			return;
            					
		for (prop in dataSetToMerge.countryObjects) {
			if (dataSetToMerge.countryObjects[prop].Data.IsNew() === true)
                throw Error("Can't merge data sets with new objects");
				
			var objectToMerge = dataSetToMerge.countryObjects[prop].Clone();
			objectToMerge.Data.InternalObjectId(null);
			objectToMerge.ObjectsDataSet = this._rootObjectDataSet;
            this._rootObjectDataSet.AddOrReplaceObject(objectToMerge);
        }
    };
		

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataSets/CountryDataSet.js");
} ());