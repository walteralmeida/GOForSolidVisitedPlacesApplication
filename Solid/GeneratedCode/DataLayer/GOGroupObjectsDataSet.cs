﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.DependencyInjection;
using GenerativeObjects.Practices.Logging;
using GenerativeObjects.Practices.ExceptionHandling;
using System.Collections.Concurrent;
using GenerativeObjects.Practices.LayerSupportClasses;
using Unity;


namespace Solid.Data.DataObjects
{
	[JsonObject(MemberSerialization.OptIn)]
	public class GOGroupObjectsDataSet : ObjectsDataSetBase
	{
        #region fields

        private ObjectsDataSet _rootObjectDataSet;
		private ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();

		// Mapping between entity primary key and data set objects collection internal id
		private ConcurrentDictionary< System.String, int> _gOGroupObjectInternalIds = new ConcurrentDictionary< System.String, int>();
		
		// Collection holding all GOGroup objects for current dataset
		private ConcurrentDictionary< int, GOGroupDataObject> _gOGroupObjects = new ConcurrentDictionary< int, GOGroupDataObject>();

		// Temp list of merged data objects - required for merge finalization
		private ConcurrentQueue<GOGroupDataObject> _mergedDataObjects;

		private ConcurrentQueue<GOGroupDataObject> MergedDataObjects 
		{
			get
			{
				if (_mergedDataObjects == null)
					_mergedDataObjects = new ConcurrentQueue<GOGroupDataObject>();
					
				return _mergedDataObjects;
			}
		}
		
		private void ClearMergedDataObjects()
		{
			_mergedDataObjects = null;
		}

        #endregion

		#region properties

        public ObjectsDataSet RootObjectDataSet
        {
            get { return _rootObjectDataSet; }
            set
            {
                _rootObjectDataSet = value;
            }
        }
		
		// Mapping between entity primary key and data set objects collection internal id
		public ConcurrentDictionary< System.String, int> GOGroupObjectInternalIds
		{ 
			get { return _gOGroupObjectInternalIds; }
			set { _gOGroupObjectInternalIds = value; }
		}
		
		// Collection holding all GOGroup objects for current dataset
		[JsonProperty(DefaultValueHandling  = DefaultValueHandling.Ignore)]
		public ConcurrentDictionary< int, GOGroupDataObject> GOGroupObjects
		{ 
			get { return _gOGroupObjects; }
			set { _gOGroupObjects = value; }
		}
		
		
 
		
 
		
		#endregion
		
		#region initialization

        public GOGroupObjectsDataSet(ObjectsDataSet rootObjectDataSet)
        {
            _rootObjectDataSet = rootObjectDataSet;
        }

        #endregion

		#region IObjectsDataSet implementation

		public override IObjectsDataSet Clone()
		{
			throw new PulpException("Forbidden on sub dataset");		
		}

		public override IObjectsDataSet Clone(IObjectsDataSet rootDataSet)
		{
			var clone = new GOGroupObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.GOGroupObjects)
			{
                var cloneObject = (GOGroupDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.GOGroupObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.GOGroupObjectInternalIds)
			{
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.GOGroupObjectInternalIds.TryAdd(keyValue.Key, keyValue.Value);
				}
			}



			
			return clone;
		}

		public override IObjectsDataSet CloneDirtyObjects()
		{
			throw new PulpException("Forbidden on sub dataset");		
		}

		public override IObjectsDataSet CloneDirtyObjects(IObjectsDataSet rootDataSet)
		{
			var clone = new GOGroupObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.GOGroupObjects.Where(o => o.Value.IsDirty || o.Value.IsMarkedForDeletion))
			{
                var cloneObject = (GOGroupDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				while (!completed)
				{
					 completed = clone.GOGroupObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.GOGroupObjectInternalIds
				.Where(o => this.GOGroupObjects[o.Value].IsDirty || this.GOGroupObjects[o.Value].IsMarkedForDeletion))
			{
				completed = false;
				
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.GOGroupObjectInternalIds.TryAdd(keyValue.Key, keyValue.Value);
				}
			}
			
			// CloneDirtyObjects is used to pass only dirty objects to server to save changes. Since indexes are not serialized, no need to clone them
            return clone;
		}

		public override IEnumerable<IDataObject> GetAllObjects()
		{
			foreach(var gOGroup in GOGroupObjects.Values)
			{
				yield return gOGroup; 
			}				
		}

	    public override void AddObject(IDataObject objectToAdd, bool replaceIfExists)
        {
			var existingObject = GetObject(objectToAdd);
            if (!replaceIfExists && existingObject != null)
                throw new PulpException("Object already exists");

			int newInternalId; 
			
            if (existingObject != null)
			{
                //RemoveObject(existingObject);
				if(existingObject.InternalObjectId == null)
				{
					_logEngine.LogError("Error while trying to Add Object to the GOGroupObjectsDataSet", "The object you are trying to add doesn't have an InternalObjectId", "GOGroupObjectsDataSet", null);
					throw new PulpException("Error while trying to add an object to the dataset without InternalObjectId");
				}
                newInternalId = (int) existingObject.InternalObjectId;
                objectToAdd.InternalObjectId = newInternalId;
				existingObject.CopyValuesFrom(objectToAdd, false);
			}
			else
			{
            	newInternalId = GetNextNewInternalObjectId();
				objectToAdd.InternalObjectId = newInternalId;

				 var completed = false;
				 var count = 0;
				while (!completed && count++ < 15)
				{
					completed = GOGroupObjects.TryAdd(newInternalId, (GOGroupDataObject)objectToAdd);
				}
			}
			
			if (!objectToAdd.IsNew && existingObject == null)
			{
                //The following if should not be necessary...
				var completed = false;
				if (GOGroupObjectInternalIds.ContainsKey(((GOGroupDataObject)objectToAdd).PrimaryKey))
				{
					int value;
					var count2 = 0;
					while (!completed && count2++ < 15)
					{
						completed = GOGroupObjectInternalIds.TryRemove(((GOGroupDataObject)objectToAdd).PrimaryKey, out value);
					}
				}

				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = GOGroupObjectInternalIds.TryAdd(((GOGroupDataObject)objectToAdd).PrimaryKey, newInternalId);
				}
			}
			// Update relations including platform as "many" side or "one" side , pk side for one to one relations
			if((objectToAdd as GOGroupDataObject) == null)
			{
				_logEngine.LogError("Unable to Add an object which is null", "Unable to add an object which is null", "GOGroupDataObject", null);
				throw new PulpException("Unexpected Error: Unable to Add an object which is Null.");
			}

	 
	 
		
		}

        public override void RemoveObject(IDataObject objectToRemove)
        {
            if (GOGroupObjects == null)
                return;
			bool completed;			
			int? objectToRemoveInternalId;
			
			if((objectToRemove as GOGroupDataObject) == null)
			{
				_logEngine.LogError("Unable to remove null object", "The object you are trying to remove is null", "GOGroupObjectsDataSet.RemoveObject", null);
				throw new PulpException("Unable to remove Null Object.");
			}

			if (objectToRemove.IsNew)
				objectToRemoveInternalId = objectToRemove.InternalObjectId;
			else
				objectToRemoveInternalId = GOGroupObjectInternalIds.ContainsKey((objectToRemove as GOGroupDataObject).PrimaryKey) ? (int?) GOGroupObjectInternalIds[(objectToRemove as GOGroupDataObject).PrimaryKey] : null;
				
			if (objectToRemoveInternalId != null)
			{
				GOGroupDataObject value;
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = GOGroupObjects.TryRemove((int)objectToRemoveInternalId, out value);
				}

                // Reinit InternalObjectId only if the object to remove is part of the current dataset
				if (ReferenceEquals(objectToRemove.ObjectsDataSet, this._rootObjectDataSet))
					objectToRemove.InternalObjectId = null;
				
				if (!objectToRemove.IsNew)
				{
					int idvalue;
					completed = false;
					count = 0;
					while (!completed && count++ < 15)
					{
						completed = GOGroupObjectInternalIds.TryRemove((objectToRemove as GOGroupDataObject).PrimaryKey, out idvalue);
					}
				}
				
		 
		 
			}		
		}

		public override TDataObject GetObject<TDataObject>(Type objectBaseType, int internalObjectId)
        {
            return GOGroupObjects.ContainsKey(internalObjectId) ? GOGroupObjects[internalObjectId] as TDataObject : null;
        }

        public override TDataObject GetObject<TDataObject>(TDataObject objectToGet)
        {
			int? objectToGetInternalId;
			
			if (objectToGet.IsNew)
				objectToGetInternalId = objectToGet.InternalObjectId;
			else
			{
				if((objectToGet as GOGroupDataObject) == null)
				{
					_logEngine.LogError("Unable to get value which value is null", "The object you are trying to get doesn't have a value", "GOGroupObjectsDataSet", null);
					throw new PulpException("Unable to get an element which value is null.");
				}
				objectToGetInternalId = GOGroupObjectInternalIds.ContainsKey((objectToGet as GOGroupDataObject).PrimaryKey) ? (int?) GOGroupObjectInternalIds[(objectToGet as GOGroupDataObject).PrimaryKey] : null;
			}
			if (objectToGetInternalId != null)
			{
				return GOGroupObjects.ContainsKey((int)objectToGetInternalId) ? GOGroupObjects[(int)objectToGetInternalId] as TDataObject : null;
			}

			return null;
        }
		
        public override IEnumerable<IDataObject> GetObjectsMarkedForDeletion()
        {
			return GOGroupObjects.Values.Where(c => c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		public override IEnumerable<IDataObject> GetObjectsOutOfGraph()
        {
			return GOGroupObjects.Values.Where(c => !c.IncludedInGraph && !c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		 
		 

        public override DataObjectCollection<TDataObject> GetRelatedObjects<TDataObject>(IDataObject rootObject, string relationName)
        {
			if (relationName == "GroupRoleItems")
            {
				IEnumerable< GOGroupRoleDataObject> relatedObjects;					
				relatedObjects = _rootObjectDataSet.GOGroupRoleObjectsDataSet.GetGroupRoleItemsForGroup(rootObject as GOGroupDataObject);
				
				var result = new DataObjectCollection<TDataObject>();
				
				if (relatedObjects != null)
				{
                    result.NotifyChanges = false;

					foreach(var relatedObject in relatedObjects)
						result.Add(relatedObject as TDataObject);

                    result.NotifyChanges = true;
				}	
				
                result.ObjectsDataSet = this._rootObjectDataSet;

				return result;
			}
 
			if (relationName == "UserGroupItems")
            {
				IEnumerable< GOUserGroupDataObject> relatedObjects;					
				relatedObjects = _rootObjectDataSet.GOUserGroupObjectsDataSet.GetUserGroupItemsForGroup(rootObject as GOGroupDataObject);
				
				var result = new DataObjectCollection<TDataObject>();
				
				if (relatedObjects != null)
				{
                    result.NotifyChanges = false;

					foreach(var relatedObject in relatedObjects)
						result.Add(relatedObject as TDataObject);

                    result.NotifyChanges = true;
				}	
				
                result.ObjectsDataSet = this._rootObjectDataSet;

				return result;
			}
 
			return null;
		}
		
        public override void Merge(IObjectsDataSet dataSetToMerge, bool updateOrginalInternalId)
        {
			var GOGroupDataSet = dataSetToMerge as GOGroupObjectsDataSet;
			if(GOGroupDataSet == null)
			{
				throw new PulpException("Unable to merge the current DataSet with null");
			}
            foreach (var item in GOGroupDataSet.GOGroupObjects.Values)
            {
                var oldInternalId = item.InternalObjectId;

				var objectToMerge = item.Clone(false);
                objectToMerge.InternalObjectId = null;
                objectToMerge.ObjectsDataSet = this._rootObjectDataSet;
				
				objectToMerge.IsMarkedForDeletion = item.IsMarkedForDeletion;
                
				_rootObjectDataSet.AddOrReplaceObject(objectToMerge);
                var newInternalId = objectToMerge.InternalObjectId;
                if (updateOrginalInternalId)
                    item.InternalObjectId = newInternalId;

				if (oldInternalId != null && !_rootObjectDataSet.DatasetMergingInternalIdMapping.ContainsKey((int) oldInternalId))
				{
					if(newInternalId == null)
					{
						_logEngine.LogError("Unable to merge elements in DataSet without InternalId", "The Element you are trying to merge doesn't have an internalId", "GOGroupObjectsDataSet", null);
						throw new PulpException("Unable to merge elements in dataset without InternalId");
					}
					var completed = false;
					var count = 0;
					while (!completed && count++ < 15)
					{
						completed = _rootObjectDataSet.DatasetMergingInternalIdMapping.TryAdd((int) oldInternalId, (int) newInternalId);
					}
				}

				MergedDataObjects.Enqueue(objectToMerge as GOGroupDataObject);
            }
        }
		
		public override void FinalizeMerge()
		{
			foreach(var mergedObject in MergedDataObjects)
			{
				mergedObject.UpdateRelatedInternalIds(_rootObjectDataSet.DatasetMergingInternalIdMapping);
			}
			
			ClearMergedDataObjects();
		}

		public override void ReconstructIndexes()
		{
		 
		 
		}

		#endregion

		#region private methods
		
		private int GetNextNewInternalObjectId()
		{
			int newInternalId = _rootObjectDataSet.GetNextNewObjectId();

			// With business entity hierarchies I was seeing objects in dataset with same internal Id. Something to do with PK being the same for entities in hierarchy perhaps?
			// Anyway, it's dangeroud because means LoadParentEntity() can get stuck in infinite loop if it finds 'itself' as parent of iteself because of the internal Ids.
			// Ensure newInternalId not already in use
			while (GOGroupObjectInternalIds.Values.Contains(newInternalId))
			{
				newInternalId = _rootObjectDataSet.GetNextNewObjectId();
			}

			return newInternalId;
		}

		#endregion

	}	
}