﻿
////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {	
	'use strict';

	// Place data set. Container for all Place objects
	Solid.Web.Model.DataSets.placeObjectsDataSet = function (rootDataSet) {
		var self = this;

        this._rootObjectDataSet = rootDataSet;
		// Collection holding all Place objects for current dataset - key : internal object id - value : object
		this.placeObjects = {};
	
		// Mapping between entity primary key and objects internal id  - key : primary key(s) - value : internal object id
		this.placeObjectInternalIds = {};
		
		this.fkIndexes = {};
		
		// Index to quickly find all Place with a given country foreign key
		this.fkIndexes.country = {};


		
	};

	/***************************
	******** METHODS ***********
	***************************/

    Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetRootObjectDataSet = function () {
        return this._rootObjectDataSet;
    };
		
    Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.SetRootObjectDataSet = function (dataSet) {
        this._rootObjectDataSet = dataSet;
    };

	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.Clone = function (rootDataSet) {
		var clone = new Solid.Web.Model.DataSets.placeObjectsDataSet(rootDataSet);
		if (!this.placeObjects)
			return clone;

		for (var key in this.placeObjects) {
			var objectClone = this.placeObjects[key].Clone();
			clone.placeObjects = objectClone;
		}
				
		clone.placeObjectInternalIds = {};

		for (var key0 in this.placeObjectInternalIds) {
			clone.placeObjectInternalIds[key0] = this.placeObjectInternalIds[key0];
		}
		for (var fk0 in this.fkIndexes.country) {
			clone.fkIndexes.country[fk0] = this.fkIndexes.country[fk0];	
		}
			
		return clone;
	};

	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.AddOrReplaceObject = function (objectToAdd) {
		this.AddObject(objectToAdd, true);	
	};

	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.AddObject = function (objectToAdd, replaceIfExists) {
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
			this.placeObjects[newInternalId] = objectToAdd;
		}
			
		if (objectToAdd.Data.IsNew() === false && !existingObject) {
			this.placeObjectInternalIds[objectToAdd.Data.URI()] = newInternalId;
		}
		// Update the Country FK Index 
		if (objectToAdd.Data.CountryURI()) {			
			this.fkIndexes.country[objectToAdd.Data.CountryURI()] = this.fkIndexes.country[objectToAdd.Data.CountryURI()] || {};
			this.fkIndexes.country[objectToAdd.Data.CountryURI()][newInternalId] = true;
		}
	};
	// Update the Country FK Index 
	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.UpdateCountryFKIndex = function (old_CountryURI, new_CountryURI, parentEntity) {
		if (old_CountryURI !== undefined && old_CountryURI !== null && old_CountryURI !== "" && this.fkIndexes.country[old_CountryURI] && this.fkIndexes.country[old_CountryURI][parentEntity.Data.InternalObjectId()]) {
			delete this.fkIndexes.country[old_CountryURI][parentEntity.Data.InternalObjectId()];
		}

        if (new_CountryURI !== undefined && new_CountryURI !== null && new_CountryURI !== "") {
			this.fkIndexes.country[new_CountryURI] = this.fkIndexes.country[new_CountryURI] || {};
			this.fkIndexes.country[new_CountryURI][parentEntity.Data.InternalObjectId()] = true;
        }                
    };                        
		
    Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.RemoveObject = function (objectToRemove) {
        if (!this.placeObjects)
            return;

		var objectToRemoveInternalId = null;
			
		if (objectToRemove.Data.IsNew() === true) {
			objectToRemoveInternalId = objectToRemove.Data.InternalObjectId();
		}
		else {
			if (!this.placeObjectInternalIds[objectToRemove.Data.URI()]) 			
				return;

			objectToRemoveInternalId = this.placeObjectInternalIds[objectToRemove.Data.URI()];
		}
			
		if (!objectToRemoveInternalId || !this.placeObjects[objectToRemoveInternalId])			
			return; //object not in dataset => return
			
		this.placeObjects[objectToRemoveInternalId].release();
		delete this.placeObjects[objectToRemoveInternalId];
		
		if (objectToRemove.Data.IsNew() === false) {
			delete this.placeObjectInternalIds[objectToRemove.Data.URI()];
		}

			// Delete the Country FK Index 
		if (objectToRemove.Data.CountryURI() && this.fkIndexes.country[objectToRemove.Data.CountryURI()] && this.fkIndexes.country[objectToRemove.Data.CountryURI()][objectToRemoveInternalId])
			delete this.fkIndexes.country[objectToRemove.Data.CountryURI()][objectToRemoveInternalId];
	};

	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetObjectByInternalId = function (internalObjectId, includeHierarchy) {
        if (this.placeObjects[internalObjectId])
			return this.placeObjects[internalObjectId];		
		
		if(includeHierarchy) {
			// No hierarchy, nothing has been generated, unused bit of code
		}

		return null;
	};

 	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetObjectByPK = function(uRI) {
		if (this.placeObjects[this.placeObjectInternalIds[uRI]]) {			
			return this.placeObjects[this.placeObjectInternalIds[uRI]];
		}

		return null;
	};

    Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetObject = function (objectToGet) {
	    if (!this.placeObjects)
            return null;

		var objectToGetInternalId = null;

		if (objectToGet.Data.IsNew() === true) {
			objectToGetInternalId = objectToGet.Data.InternalObjectId();
		} else {
			if (!this.placeObjectInternalIds[objectToGet.Data.URI()]) 			
				return null;
			objectToGetInternalId = this.placeObjectInternalIds[objectToGet.Data.URI()];
		}

		return objectToGetInternalId === null ? null : this.placeObjects[objectToGetInternalId];
    };

    Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetObjectsMarkedForDeletion = function () {
        if (!this.placeObjects)
            return [];

		var toReturn = [];
			
		for (var prop in this.placeObjects) {
			if (this.placeObjects[prop].Data.IsMarkedForDeletion()) {
				toReturn.push(this.placeObjects[prop]);
			}
		}

		return toReturn;
    };

	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetPlaceItemsForCountry = function (country) {
		var result = [];

		if (country.Data.IsNew()) {
            for (var prop in this.placeObjects) {
                if (this.placeObjects[prop].Data._country_NewObjectId() === country.Data.InternalObjectId())
                    result.push(this.placeObjects[prop]);
            }
        } else {
			if (this.fkIndexes.country[country.Data.URI()]){
				for (var internalId in this.fkIndexes.country[country.Data.URI()])
					result.push(this.placeObjects[internalId]);
			}
		}

		return result;
	};

	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.GetRelatedObjects = function (rootObject, relationName) {
		if (relationName == "PlaceToLocationItems") {
            var result = [];
			var relatedDataSet = this._rootObjectDataSet.getPlaceToLocationObjectsDataSet();
			if (relatedDataSet !== undefined) 
				result = relatedDataSet.GetPlaceToLocationItemsForPlace(rootObject);

			return result;
		}		
		return null;
	};
		
	Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.cleanContext = function (thecontextId) {
		for (var prop in this.placeObjects) {
			var shouldDelete = true;

			if (this.placeObjects[prop].contextIds.length !== 0) {
				var contextIdsToKeep = [],
					len = this.placeObjects[prop].contextIds.length;
				for (var i = 0; i < len; i++) {
					var contextId = this.placeObjects[prop].contextIds[i];

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
					
				this.placeObjects[prop].contextIds	= contextIdsToKeep;
					
				shouldDelete = (contextIdsToKeep.length === 0);
			}
				 				
			if (shouldDelete === true) {
				this.RemoveObject(this.placeObjects[prop]);				
			}
		}
	};
		
    Solid.Web.Model.DataSets.placeObjectsDataSet.prototype.Merge = function (dataSetToMerge) {
		if (!dataSetToMerge.placeObjects)
			return;
            					
		for (prop in dataSetToMerge.placeObjects) {
			if (dataSetToMerge.placeObjects[prop].Data.IsNew() === true)
                throw Error("Can't merge data sets with new objects");
				
			var objectToMerge = dataSetToMerge.placeObjects[prop].Clone();
			objectToMerge.Data.InternalObjectId(null);
			objectToMerge.ObjectsDataSet = this._rootObjectDataSet;
            this._rootObjectDataSet.AddOrReplaceObject(objectToMerge);
        }
    };
		

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataSets/PlaceDataSet.js");
} ());