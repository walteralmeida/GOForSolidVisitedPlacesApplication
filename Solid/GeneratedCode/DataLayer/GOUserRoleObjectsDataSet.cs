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
	public class GOUserRoleObjectsDataSet : ObjectsDataSetBase
	{
        #region fields

        private ObjectsDataSet _rootObjectDataSet;
		private ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();

		// Mapping between entity primary key and data set objects collection internal id
		private ConcurrentDictionary< IdentifyingFieldsCollection<System.String,System.Guid>, int> _gOUserRoleObjectInternalIds = new ConcurrentDictionary< IdentifyingFieldsCollection<System.String,System.Guid>, int>();
		
		// Collection holding all GOUserRole objects for current dataset
		private ConcurrentDictionary< int, GOUserRoleDataObject> _gOUserRoleObjects = new ConcurrentDictionary< int, GOUserRoleDataObject>();

		// Temp list of merged data objects - required for merge finalization
		private ConcurrentQueue<GOUserRoleDataObject> _mergedDataObjects;

		private ConcurrentQueue<GOUserRoleDataObject> MergedDataObjects 
		{
			get
			{
				if (_mergedDataObjects == null)
					_mergedDataObjects = new ConcurrentQueue<GOUserRoleDataObject>();
					
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
		public ConcurrentDictionary< IdentifyingFieldsCollection<System.String,System.Guid>, int> GOUserRoleObjectInternalIds
		{ 
			get { return _gOUserRoleObjectInternalIds; }
			set { _gOUserRoleObjectInternalIds = value; }
		}
		
		// Collection holding all GOUserRole objects for current dataset
		[JsonProperty(DefaultValueHandling  = DefaultValueHandling.Ignore)]
		public ConcurrentDictionary< int, GOUserRoleDataObject> GOUserRoleObjects
		{ 
			get { return _gOUserRoleObjects; }
			set { _gOUserRoleObjects = value; }
		}
		
		// Index to quickly find all GOUserRole with a given role foreign key
		public ConcurrentDictionary<System.String, List<int>> Role_FKIndex = new ConcurrentDictionary<System.String, List<int>>();
		
 
		// Index to quickly find all GOUserRole with a given user foreign key
		public ConcurrentDictionary<System.Guid, List<int>> User_FKIndex = new ConcurrentDictionary<System.Guid, List<int>>();
		
 
		
		#endregion
		
		#region initialization

        public GOUserRoleObjectsDataSet(ObjectsDataSet rootObjectDataSet)
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
			var clone = new GOUserRoleObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.GOUserRoleObjects)
			{
                var cloneObject = (GOUserRoleDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.GOUserRoleObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.GOUserRoleObjectInternalIds)
			{
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.GOUserRoleObjectInternalIds.TryAdd(keyValue.Key.Clone(), keyValue.Value);
				}
			}

			foreach(var fkKeyValue in this.Role_FKIndex)
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = clone.Role_FKIndex.TryAdd(fkKeyValue.Key, new List<int>());
				}

				foreach (var pk in fkKeyValue.Value)
				{
					clone.Role_FKIndex[fkKeyValue.Key].Add(pk);
				}
			}

			foreach(var fkKeyValue in this.User_FKIndex)
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = clone.User_FKIndex.TryAdd(fkKeyValue.Key, new List<int>());
				}

				foreach (var pk in fkKeyValue.Value)
				{
					clone.User_FKIndex[fkKeyValue.Key].Add(pk);
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
			var clone = new GOUserRoleObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.GOUserRoleObjects.Where(o => o.Value.IsDirty || o.Value.IsMarkedForDeletion))
			{
                var cloneObject = (GOUserRoleDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				while (!completed)
				{
					 completed = clone.GOUserRoleObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.GOUserRoleObjectInternalIds
				.Where(o => this.GOUserRoleObjects[o.Value].IsDirty || this.GOUserRoleObjects[o.Value].IsMarkedForDeletion))
			{
				completed = false;
				
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.GOUserRoleObjectInternalIds.TryAdd(keyValue.Key.Clone(), keyValue.Value);
				}
			}
			
			// CloneDirtyObjects is used to pass only dirty objects to server to save changes. Since indexes are not serialized, no need to clone them
            return clone;
		}

		public override IEnumerable<IDataObject> GetAllObjects()
		{
			foreach(var gOUserRole in GOUserRoleObjects.Values)
			{
				yield return gOUserRole; 
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
					_logEngine.LogError("Error while trying to Add Object to the GOUserRoleObjectsDataSet", "The object you are trying to add doesn't have an InternalObjectId", "GOUserRoleObjectsDataSet", null);
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
					completed = GOUserRoleObjects.TryAdd(newInternalId, (GOUserRoleDataObject)objectToAdd);
				}
			}
			
			if (!objectToAdd.IsNew && existingObject == null)
			{
                //The following if should not be necessary...
				var completed = false;
				if (GOUserRoleObjectInternalIds.ContainsKey(((GOUserRoleDataObject)objectToAdd).PrimaryKeysCollection))
				{
					int value;
					var count2 = 0;
					while (!completed && count2++ < 15)
					{
						completed = GOUserRoleObjectInternalIds.TryRemove(((GOUserRoleDataObject)objectToAdd).PrimaryKeysCollection, out value);
					}
				}

				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = GOUserRoleObjectInternalIds.TryAdd(((GOUserRoleDataObject)objectToAdd).PrimaryKeysCollection, newInternalId);
				}
			}
			// Update relations including platform as "many" side or "one" side , pk side for one to one relations
			if((objectToAdd as GOUserRoleDataObject) == null)
			{
				_logEngine.LogError("Unable to Add an object which is null", "Unable to add an object which is null", "GOUserRoleDataObject", null);
				throw new PulpException("Unexpected Error: Unable to Add an object which is Null.");
			}

			// Update the Role FK Index 
			if ((objectToAdd as GOUserRoleDataObject).GORoleName != null)
			{
			if (!Role_FKIndex.ContainsKey((objectToAdd as GOUserRoleDataObject).GORoleName))
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = Role_FKIndex.TryAdd((objectToAdd as GOUserRoleDataObject).GORoleName, new List<int>());
				}
			}
				
			if (!Role_FKIndex[(objectToAdd as GOUserRoleDataObject).GORoleName].Contains(newInternalId))
				Role_FKIndex[(objectToAdd as GOUserRoleDataObject).GORoleName].Add(newInternalId);

            GORoleDataObject relatedRole;
            if ((objectToAdd as GOUserRoleDataObject)._role_NewObjectId != null)
            {
                relatedRole = _rootObjectDataSet.GetObject(new GORoleDataObject() { IsNew = true, InternalObjectId = (objectToAdd as GOUserRoleDataObject)._role_NewObjectId });
            }
            else
            {
                relatedRole = _rootObjectDataSet.GetObject(new GORoleDataObject((objectToAdd as GOUserRoleDataObject).GORoleName) { IsNew = false });
            }

			if (relatedRole != null && this.RootObjectDataSet.NotifyChanges)
                relatedRole.NotifyPropertyChanged("UserRoleItems", new SeenObjectCollection());
			
			}
	 
			// Update the User FK Index 
			if (!User_FKIndex.ContainsKey((objectToAdd as GOUserRoleDataObject).GOUserId))
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = User_FKIndex.TryAdd((objectToAdd as GOUserRoleDataObject).GOUserId, new List<int>());
				}
			}
				
			if (!User_FKIndex[(objectToAdd as GOUserRoleDataObject).GOUserId].Contains(newInternalId))
				User_FKIndex[(objectToAdd as GOUserRoleDataObject).GOUserId].Add(newInternalId);

            GOUserDataObject relatedUser;
            if ((objectToAdd as GOUserRoleDataObject)._user_NewObjectId != null)
            {
                relatedUser = _rootObjectDataSet.GetObject(new GOUserDataObject() { IsNew = true, InternalObjectId = (objectToAdd as GOUserRoleDataObject)._user_NewObjectId });
            }
            else
            {
                relatedUser = _rootObjectDataSet.GetObject(new GOUserDataObject((objectToAdd as GOUserRoleDataObject).GOUserId) { IsNew = false });
            }

			if (relatedUser != null && this.RootObjectDataSet.NotifyChanges)
                relatedUser.NotifyPropertyChanged("UserRoleItems", new SeenObjectCollection());
			
	 
		
		}

        public override void RemoveObject(IDataObject objectToRemove)
        {
            if (GOUserRoleObjects == null)
                return;
			bool completed;			
			int? objectToRemoveInternalId;
			
			if((objectToRemove as GOUserRoleDataObject) == null)
			{
				_logEngine.LogError("Unable to remove null object", "The object you are trying to remove is null", "GOUserRoleObjectsDataSet.RemoveObject", null);
				throw new PulpException("Unable to remove Null Object.");
			}

			if (objectToRemove.IsNew)
				objectToRemoveInternalId = objectToRemove.InternalObjectId;
			else
				objectToRemoveInternalId = GOUserRoleObjectInternalIds.ContainsKey((objectToRemove as GOUserRoleDataObject).PrimaryKeysCollection) ? (int?) GOUserRoleObjectInternalIds[(objectToRemove as GOUserRoleDataObject).PrimaryKeysCollection] : null;
				
			if (objectToRemoveInternalId != null)
			{
				GOUserRoleDataObject value;
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = GOUserRoleObjects.TryRemove((int)objectToRemoveInternalId, out value);
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
						completed = GOUserRoleObjectInternalIds.TryRemove((objectToRemove as GOUserRoleDataObject).PrimaryKeysCollection, out idvalue);
					}
				}
				
			// Delete the Role FK Index 
				if ((objectToRemove as GOUserRoleDataObject).GORoleName != null)
				{
				if (Role_FKIndex.ContainsKey((objectToRemove as GOUserRoleDataObject).GORoleName) && Role_FKIndex[(objectToRemove as GOUserRoleDataObject).GORoleName].Contains((int)objectToRemoveInternalId))
				{
					Role_FKIndex[(objectToRemove as GOUserRoleDataObject).GORoleName].Remove((int)objectToRemoveInternalId);

					if (!Role_FKIndex[(objectToRemove as GOUserRoleDataObject).GORoleName].Any())
					{
						List<int> outvalue;
						var iscompleted = false;
						var count2 = 0;
						while (!iscompleted  && count2++ < 15)
						{
							iscompleted = Role_FKIndex.TryRemove((objectToRemove as GOUserRoleDataObject).GORoleName, out outvalue);
						}
					}
				}
				
				GORoleDataObject relatedRole;
	            if ((objectToRemove as GOUserRoleDataObject)._role_NewObjectId != null)
	            {
	                relatedRole = _rootObjectDataSet.GetObject(new GORoleDataObject() { IsNew = true, InternalObjectId = (objectToRemove as GOUserRoleDataObject)._role_NewObjectId });
	            }
	            else
	            {
	                relatedRole = _rootObjectDataSet.GetObject(new GORoleDataObject((objectToRemove as GOUserRoleDataObject).GORoleName) { IsNew = false });
	            }

	            if (relatedRole != null && this.RootObjectDataSet.NotifyChanges)
	                relatedRole.NotifyPropertyChanged("UserRoleItems", new SeenObjectCollection());
				
				}
		 
			// Delete the User FK Index 
				if (User_FKIndex.ContainsKey((objectToRemove as GOUserRoleDataObject).GOUserId) && User_FKIndex[(objectToRemove as GOUserRoleDataObject).GOUserId].Contains((int)objectToRemoveInternalId))
				{
					User_FKIndex[(objectToRemove as GOUserRoleDataObject).GOUserId].Remove((int)objectToRemoveInternalId);

					if (!User_FKIndex[(objectToRemove as GOUserRoleDataObject).GOUserId].Any())
					{
						List<int> outvalue;
						var iscompleted = false;
						var count2 = 0;
						while (!iscompleted  && count2++ < 15)
						{
							iscompleted = User_FKIndex.TryRemove((objectToRemove as GOUserRoleDataObject).GOUserId, out outvalue);
						}
					}
				}
				
				GOUserDataObject relatedUser;
	            if ((objectToRemove as GOUserRoleDataObject)._user_NewObjectId != null)
	            {
	                relatedUser = _rootObjectDataSet.GetObject(new GOUserDataObject() { IsNew = true, InternalObjectId = (objectToRemove as GOUserRoleDataObject)._user_NewObjectId });
	            }
	            else
	            {
	                relatedUser = _rootObjectDataSet.GetObject(new GOUserDataObject((objectToRemove as GOUserRoleDataObject).GOUserId) { IsNew = false });
	            }

	            if (relatedUser != null && this.RootObjectDataSet.NotifyChanges)
	                relatedUser.NotifyPropertyChanged("UserRoleItems", new SeenObjectCollection());
				
		 
			}		
		}

		public override TDataObject GetObject<TDataObject>(Type objectBaseType, int internalObjectId)
        {
            return GOUserRoleObjects.ContainsKey(internalObjectId) ? GOUserRoleObjects[internalObjectId] as TDataObject : null;
        }

        public override TDataObject GetObject<TDataObject>(TDataObject objectToGet)
        {
			int? objectToGetInternalId;
			
			if (objectToGet.IsNew)
				objectToGetInternalId = objectToGet.InternalObjectId;
			else
			{
				if((objectToGet as GOUserRoleDataObject) == null)
				{
					_logEngine.LogError("Unable to get value which value is null", "The object you are trying to get doesn't have a value", "GOUserRoleObjectsDataSet", null);
					throw new PulpException("Unable to get an element which value is null.");
				}
				objectToGetInternalId = GOUserRoleObjectInternalIds.ContainsKey((objectToGet as GOUserRoleDataObject).PrimaryKeysCollection) ? (int?) GOUserRoleObjectInternalIds[(objectToGet as GOUserRoleDataObject).PrimaryKeysCollection] : null;
			}
			if (objectToGetInternalId != null)
			{
				return GOUserRoleObjects.ContainsKey((int)objectToGetInternalId) ? GOUserRoleObjects[(int)objectToGetInternalId] as TDataObject : null;
			}

			return null;
        }
		
        public override IEnumerable<IDataObject> GetObjectsMarkedForDeletion()
        {
			return GOUserRoleObjects.Values.Where(c => c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		public override IEnumerable<IDataObject> GetObjectsOutOfGraph()
        {
			return GOUserRoleObjects.Values.Where(c => !c.IncludedInGraph && !c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		
		public IEnumerable<GOUserRoleDataObject> GetUserRoleItemsForRole(GORoleDataObject roleInstance) 
		{
			if (roleInstance.IsNew)
            {
			
              return GOUserRoleObjects.Where(o => o.Value._role_NewObjectId != null && o.Value._role_NewObjectId == roleInstance.InternalObjectId).Select(o => o.Value);
			}
				
			if (Role_FKIndex.ContainsKey(roleInstance.Name))
			{
				return Role_FKIndex[roleInstance.Name].Where(e => GOUserRoleObjects.ContainsKey(e)).Select(e => GOUserRoleObjects[e]);
			}
			
			return new DataObjectCollection<GOUserRoleDataObject>();
		}
		 
		
		public IEnumerable<GOUserRoleDataObject> GetUserRoleItemsForUser(GOUserDataObject userInstance) 
		{
			if (userInstance.IsNew)
            {
			
              return GOUserRoleObjects.Where(o => o.Value._user_NewObjectId != null && o.Value._user_NewObjectId == userInstance.InternalObjectId).Select(o => o.Value);
			}
				
			if (User_FKIndex.ContainsKey(userInstance.Id))
			{
				return User_FKIndex[userInstance.Id].Where(e => GOUserRoleObjects.ContainsKey(e)).Select(e => GOUserRoleObjects[e]);
			}
			
			return new DataObjectCollection<GOUserRoleDataObject>();
		}
		 

        public override DataObjectCollection<TDataObject> GetRelatedObjects<TDataObject>(IDataObject rootObject, string relationName)
        {
 
 
			return null;
		}
		
        public override void Merge(IObjectsDataSet dataSetToMerge, bool updateOrginalInternalId)
        {
			var GOUserRoleDataSet = dataSetToMerge as GOUserRoleObjectsDataSet;
			if(GOUserRoleDataSet == null)
			{
				throw new PulpException("Unable to merge the current DataSet with null");
			}
            foreach (var item in GOUserRoleDataSet.GOUserRoleObjects.Values)
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
						_logEngine.LogError("Unable to merge elements in DataSet without InternalId", "The Element you are trying to merge doesn't have an internalId", "GOUserRoleObjectsDataSet", null);
						throw new PulpException("Unable to merge elements in dataset without InternalId");
					}
					var completed = false;
					var count = 0;
					while (!completed && count++ < 15)
					{
						completed = _rootObjectDataSet.DatasetMergingInternalIdMapping.TryAdd((int) oldInternalId, (int) newInternalId);
					}
				}

				MergedDataObjects.Enqueue(objectToMerge as GOUserRoleDataObject);
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
			// Reconstruct the Role FK Index 
			Role_FKIndex = new ConcurrentDictionary< System.String, List<int>>();
				
			foreach (var item in GOUserRoleObjects.Values)
			{
				if (item.GORoleName == null) 
					continue;				
				
				if (item.IsMarkedForDeletion)
					continue;

				var fk = item.GORoleName;	

				if (!Role_FKIndex.ContainsKey(fk))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = Role_FKIndex.TryAdd(fk, new List<int>());
					}
				}
				if(item.InternalObjectId == null)
				{
					_logEngine.LogError("Unable to reconstruct indexes.", "An error occured while trying to reconstruct indexes", "GOUserRoleObjectsDataSet", null);
					throw new PulpException("Unable to reconstruct indexes.");
				}
					
				Role_FKIndex[fk].Add((int)item.InternalObjectId);
			}			
		 
			// Reconstruct the User FK Index 
			User_FKIndex = new ConcurrentDictionary< System.Guid, List<int>>();
				
			foreach (var item in GOUserRoleObjects.Values)
			{
				if (item.GOUserId == null) 
					continue;				
				
				if (item.IsMarkedForDeletion)
					continue;

				var fk = item.GOUserId;	

				if (!User_FKIndex.ContainsKey(fk))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = User_FKIndex.TryAdd(fk, new List<int>());
					}
				}
				if(item.InternalObjectId == null)
				{
					_logEngine.LogError("Unable to reconstruct indexes.", "An error occured while trying to reconstruct indexes", "GOUserRoleObjectsDataSet", null);
					throw new PulpException("Unable to reconstruct indexes.");
				}
					
				User_FKIndex[fk].Add((int)item.InternalObjectId);
			}			
		 
		}

		#endregion

		#region private methods
		
		private int GetNextNewInternalObjectId()
		{
			int newInternalId = _rootObjectDataSet.GetNextNewObjectId();

			// With business entity hierarchies I was seeing objects in dataset with same internal Id. Something to do with PK being the same for entities in hierarchy perhaps?
			// Anyway, it's dangeroud because means LoadParentEntity() can get stuck in infinite loop if it finds 'itself' as parent of iteself because of the internal Ids.
			// Ensure newInternalId not already in use
			while (GOUserRoleObjectInternalIds.Values.Contains(newInternalId))
			{
				newInternalId = _rootObjectDataSet.GetNextNewObjectId();
			}

			return newInternalId;
		}

		#endregion

	}	
}