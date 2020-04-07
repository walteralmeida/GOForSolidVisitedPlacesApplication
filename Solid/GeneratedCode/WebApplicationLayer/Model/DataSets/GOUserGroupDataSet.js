﻿
////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {	
	'use strict';

	// GOUserGroup data set. Container for all GOUserGroup objects
	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet = function (rootDataSet) {
		var self = this;

        this._rootObjectDataSet = rootDataSet;
		// Collection holding all GOUserGroup objects for current dataset - key : internal object id - value : object
		this.gOUserGroupObjects = {};
	
		// Mapping between entity primary key and objects internal id  - key : primary key(s) - value : internal object id
		this.gOUserGroupObjectInternalIds = {};
		
		this.fkIndexes = {};
		
		// Index to quickly find all GOUserGroup with a given group foreign key
		this.fkIndexes.group = {};

		
		// Index to quickly find all GOUserGroup with a given user foreign key
		this.fkIndexes.user = {};

		
	};

	/***************************
	******** METHODS ***********
	***************************/

    Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetRootObjectDataSet = function () {
        return this._rootObjectDataSet;
    };
		
    Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.SetRootObjectDataSet = function (dataSet) {
        this._rootObjectDataSet = dataSet;
    };

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.Clone = function (rootDataSet) {
		var clone = new Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet(rootDataSet);
		if (!this.gOUserGroupObjects)
			return clone;

		for (var key in this.gOUserGroupObjects) {
			var objectClone = this.gOUserGroupObjects[key].Clone();
			clone.gOUserGroupObjects = objectClone;
		}
				
		clone.gOUserGroupObjectInternalIds = {};

		for (var key0 in this.gOUserGroupObjectInternalIds) {
		clone.gOUserGroupObjectInternalIds[key0] = {};

		for (var key1 in this.gOUserGroupObjectInternalIds[key0]) {
			clone.gOUserGroupObjectInternalIds[key0][key1] = this.gOUserGroupObjectInternalIds[key0][key1];
		}
		}
		for (var fk0 in this.fkIndexes.group) {
			clone.fkIndexes.group[fk0] = this.fkIndexes.group[fk0];	
		}
		for (var fk0 in this.fkIndexes.user) {
			clone.fkIndexes.user[fk0] = this.fkIndexes.user[fk0];	
		}
			
		return clone;
	};

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.AddOrReplaceObject = function (objectToAdd) {
		this.AddObject(objectToAdd, true);	
	};

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.AddObject = function (objectToAdd, replaceIfExists) {
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
			this.gOUserGroupObjects[newInternalId] = objectToAdd;
		}
			
		if (objectToAdd.Data.IsNew() === false && !existingObject) {
			this.gOUserGroupObjectInternalIds[objectToAdd.Data.GOGroupName()] = this.gOUserGroupObjectInternalIds[objectToAdd.Data.GOGroupName()] || {};
			this.gOUserGroupObjectInternalIds[objectToAdd.Data.GOGroupName()][objectToAdd.Data.GOUserId()] = newInternalId;
		}
		// Update the Group FK Index 
		if (objectToAdd.Data.GOGroupName()) {			
			this.fkIndexes.group[objectToAdd.Data.GOGroupName()] = this.fkIndexes.group[objectToAdd.Data.GOGroupName()] || {};
			this.fkIndexes.group[objectToAdd.Data.GOGroupName()][newInternalId] = true;
		}
		// Update the User FK Index 
		if (objectToAdd.Data.GOUserId()) {			
			this.fkIndexes.user[objectToAdd.Data.GOUserId()] = this.fkIndexes.user[objectToAdd.Data.GOUserId()] || {};
			this.fkIndexes.user[objectToAdd.Data.GOUserId()][newInternalId] = true;
		}
	};
	// Update the Group FK Index 
	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.UpdateGroupFKIndex = function (old_GOGroupName, new_GOGroupName, parentEntity) {
		if (old_GOGroupName !== undefined && old_GOGroupName !== null && old_GOGroupName !== "" && this.fkIndexes.group[old_GOGroupName] && this.fkIndexes.group[old_GOGroupName][parentEntity.Data.InternalObjectId()]) {
			delete this.fkIndexes.group[old_GOGroupName][parentEntity.Data.InternalObjectId()];
		}

        if (new_GOGroupName !== undefined && new_GOGroupName !== null && new_GOGroupName !== "") {
			this.fkIndexes.group[new_GOGroupName] = this.fkIndexes.group[new_GOGroupName] || {};
			this.fkIndexes.group[new_GOGroupName][parentEntity.Data.InternalObjectId()] = true;
        }                
    };                        
	// Update the User FK Index 
	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.UpdateUserFKIndex = function (old_GOUserId, new_GOUserId, parentEntity) {
		if (old_GOUserId !== undefined && old_GOUserId !== null && this.fkIndexes.user[old_GOUserId] && this.fkIndexes.user[old_GOUserId][parentEntity.Data.InternalObjectId()]) {
			delete this.fkIndexes.user[old_GOUserId][parentEntity.Data.InternalObjectId()];
		}

        if (new_GOUserId !== undefined && new_GOUserId !== null) {
			this.fkIndexes.user[new_GOUserId] = this.fkIndexes.user[new_GOUserId] || {};
			this.fkIndexes.user[new_GOUserId][parentEntity.Data.InternalObjectId()] = true;
        }                
    };                        
		
    Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.RemoveObject = function (objectToRemove) {
        if (!this.gOUserGroupObjects)
            return;

		var objectToRemoveInternalId = null;
			
		if (objectToRemove.Data.IsNew() === true) {
			objectToRemoveInternalId = objectToRemove.Data.InternalObjectId();
		}
		else {
			if (!this.gOUserGroupObjectInternalIds[objectToRemove.Data.GOGroupName()]) 			
				return;

			if (!this.gOUserGroupObjectInternalIds[objectToRemove.Data.GOGroupName()][objectToRemove.Data.GOUserId()]) 			
				return;

			objectToRemoveInternalId = this.gOUserGroupObjectInternalIds[objectToRemove.Data.GOGroupName()][objectToRemove.Data.GOUserId()];
		}
			
		if (!objectToRemoveInternalId || !this.gOUserGroupObjects[objectToRemoveInternalId])			
			return; //object not in dataset => return
			
		this.gOUserGroupObjects[objectToRemoveInternalId].release();
		delete this.gOUserGroupObjects[objectToRemoveInternalId];
		
		if (objectToRemove.Data.IsNew() === false) {
			delete this.gOUserGroupObjectInternalIds[objectToRemove.Data.GOGroupName()][objectToRemove.Data.GOUserId()];
		}

			// Delete the Group FK Index 
		if (objectToRemove.Data.GOGroupName() && this.fkIndexes.group[objectToRemove.Data.GOGroupName()] && this.fkIndexes.group[objectToRemove.Data.GOGroupName()][objectToRemoveInternalId])
			delete this.fkIndexes.group[objectToRemove.Data.GOGroupName()][objectToRemoveInternalId];
			// Delete the User FK Index 
		if (objectToRemove.Data.GOUserId() && this.fkIndexes.user[objectToRemove.Data.GOUserId()] && this.fkIndexes.user[objectToRemove.Data.GOUserId()][objectToRemoveInternalId])
			delete this.fkIndexes.user[objectToRemove.Data.GOUserId()][objectToRemoveInternalId];
	};

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetObjectByInternalId = function (internalObjectId, includeHierarchy) {
        if (this.gOUserGroupObjects[internalObjectId])
			return this.gOUserGroupObjects[internalObjectId];		
		
		if(includeHierarchy) {
			// No hierarchy, nothing has been generated, unused bit of code
		}

		return null;
	};

 	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetObjectByPK = function(gOGroupName, gOUserId) {
		if (this.gOUserGroupObjectInternalIds[gOGroupName]) {			
			if (this.gOUserGroupObjects[this.gOUserGroupObjectInternalIds[gOGroupName][gOUserId]]) {			
				return this.gOUserGroupObjects[this.gOUserGroupObjectInternalIds[gOGroupName][gOUserId]];
		}
		}

		return null;
	};

    Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetObject = function (objectToGet) {
	    if (!this.gOUserGroupObjects)
            return null;

		var objectToGetInternalId = null;

		if (objectToGet.Data.IsNew() === true) {
			objectToGetInternalId = objectToGet.Data.InternalObjectId();
		} else {
			if (!this.gOUserGroupObjectInternalIds[objectToGet.Data.GOGroupName()]) 			
				return null;
			if (!this.gOUserGroupObjectInternalIds[objectToGet.Data.GOGroupName()][objectToGet.Data.GOUserId()]) 			
				return null;
			objectToGetInternalId = this.gOUserGroupObjectInternalIds[objectToGet.Data.GOGroupName()][objectToGet.Data.GOUserId()];
		}

		return objectToGetInternalId === null ? null : this.gOUserGroupObjects[objectToGetInternalId];
    };

    Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetObjectsMarkedForDeletion = function () {
        if (!this.gOUserGroupObjects)
            return [];

		var toReturn = [];
			
		for (var prop in this.gOUserGroupObjects) {
			if (this.gOUserGroupObjects[prop].Data.IsMarkedForDeletion()) {
				toReturn.push(this.gOUserGroupObjects[prop]);
			}
		}

		return toReturn;
    };

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetUserGroupItemsForGroup = function (group) {
		var result = [];

		if (group.Data.IsNew()) {
            for (var prop in this.gOUserGroupObjects) {
                if (this.gOUserGroupObjects[prop].Data._group_NewObjectId() === group.Data.InternalObjectId())
                    result.push(this.gOUserGroupObjects[prop]);
            }
        } else {
			if (this.fkIndexes.group[group.Data.Name()]){
				for (var internalId in this.fkIndexes.group[group.Data.Name()])
					result.push(this.gOUserGroupObjects[internalId]);
			}
		}

		return result;
	};

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetUserGroupItemsForUser = function (user) {
		var result = [];

		if (user.Data.IsNew()) {
            for (var prop in this.gOUserGroupObjects) {
                if (this.gOUserGroupObjects[prop].Data._user_NewObjectId() === user.Data.InternalObjectId())
                    result.push(this.gOUserGroupObjects[prop]);
            }
        } else {
			if (this.fkIndexes.user[user.Data.Id()]){
				for (var internalId in this.fkIndexes.user[user.Data.Id()])
					result.push(this.gOUserGroupObjects[internalId]);
			}
		}

		return result;
	};

	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.GetRelatedObjects = function (rootObject, relationName) {
		return null;
	};
		
	Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.cleanContext = function (thecontextId) {
		for (var prop in this.gOUserGroupObjects) {
			var shouldDelete = true;

			if (this.gOUserGroupObjects[prop].contextIds.length !== 0) {
				var contextIdsToKeep = [],
					len = this.gOUserGroupObjects[prop].contextIds.length;
				for (var i = 0; i < len; i++) {
					var contextId = this.gOUserGroupObjects[prop].contextIds[i];

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
					
				this.gOUserGroupObjects[prop].contextIds	= contextIdsToKeep;
					
				shouldDelete = (contextIdsToKeep.length === 0);
			}
				 				
			if (shouldDelete === true) {
				this.RemoveObject(this.gOUserGroupObjects[prop]);				
			}
		}
	};
		
    Solid.Web.Model.DataSets.gOUserGroupObjectsDataSet.prototype.Merge = function (dataSetToMerge) {
		if (!dataSetToMerge.gOUserGroupObjects)
			return;
            					
		for (prop in dataSetToMerge.gOUserGroupObjects) {
			if (dataSetToMerge.gOUserGroupObjects[prop].Data.IsNew() === true)
                throw Error("Can't merge data sets with new objects");
				
			var objectToMerge = dataSetToMerge.gOUserGroupObjects[prop].Clone();
			objectToMerge.Data.InternalObjectId(null);
			objectToMerge.ObjectsDataSet = this._rootObjectDataSet;
            this._rootObjectDataSet.AddOrReplaceObject(objectToMerge);
        }
    };
		

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataSets/GOUserGroupDataSet.js");
} ());