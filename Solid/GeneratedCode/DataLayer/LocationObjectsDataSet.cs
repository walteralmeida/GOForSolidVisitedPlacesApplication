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
	public class LocationObjectsDataSet : ObjectsDataSetBase
	{
        #region fields

        private ObjectsDataSet _rootObjectDataSet;
		private ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();

		// Mapping between entity primary key and data set objects collection internal id
		private ConcurrentDictionary< System.String, int> _locationObjectInternalIds = new ConcurrentDictionary< System.String, int>();
		
		// Collection holding all Location objects for current dataset
		private ConcurrentDictionary< int, LocationDataObject> _locationObjects = new ConcurrentDictionary< int, LocationDataObject>();

		// Temp list of merged data objects - required for merge finalization
		private ConcurrentQueue<LocationDataObject> _mergedDataObjects;

		private ConcurrentQueue<LocationDataObject> MergedDataObjects 
		{
			get
			{
				if (_mergedDataObjects == null)
					_mergedDataObjects = new ConcurrentQueue<LocationDataObject>();
					
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
		public ConcurrentDictionary< System.String, int> LocationObjectInternalIds
		{ 
			get { return _locationObjectInternalIds; }
			set { _locationObjectInternalIds = value; }
		}
		
		// Collection holding all Location objects for current dataset
		[JsonProperty(DefaultValueHandling  = DefaultValueHandling.Ignore)]
		public ConcurrentDictionary< int, LocationDataObject> LocationObjects
		{ 
			get { return _locationObjects; }
			set { _locationObjects = value; }
		}
		
		// Index to quickly find all Location with a given country foreign key
		public ConcurrentDictionary<System.String, List<int>> Country_FKIndex = new ConcurrentDictionary<System.String, List<int>>();
		
 
		
 
		
		#endregion
		
		#region initialization

        public LocationObjectsDataSet(ObjectsDataSet rootObjectDataSet)
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
			var clone = new LocationObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.LocationObjects)
			{
                var cloneObject = (LocationDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.LocationObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.LocationObjectInternalIds)
			{
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.LocationObjectInternalIds.TryAdd(keyValue.Key, keyValue.Value);
				}
			}

			foreach(var fkKeyValue in this.Country_FKIndex)
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = clone.Country_FKIndex.TryAdd(fkKeyValue.Key, new List<int>());
				}

				foreach (var pk in fkKeyValue.Value)
				{
					clone.Country_FKIndex[fkKeyValue.Key].Add(pk);
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
			var clone = new LocationObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.LocationObjects.Where(o => o.Value.IsDirty || o.Value.IsMarkedForDeletion))
			{
                var cloneObject = (LocationDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				while (!completed)
				{
					 completed = clone.LocationObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.LocationObjectInternalIds
				.Where(o => this.LocationObjects[o.Value].IsDirty || this.LocationObjects[o.Value].IsMarkedForDeletion))
			{
				completed = false;
				
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.LocationObjectInternalIds.TryAdd(keyValue.Key, keyValue.Value);
				}
			}
			
			// CloneDirtyObjects is used to pass only dirty objects to server to save changes. Since indexes are not serialized, no need to clone them
            return clone;
		}

		public override IEnumerable<IDataObject> GetAllObjects()
		{
			foreach(var location in LocationObjects.Values)
			{
				yield return location; 
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
					_logEngine.LogError("Error while trying to Add Object to the LocationObjectsDataSet", "The object you are trying to add doesn't have an InternalObjectId", "LocationObjectsDataSet", null);
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
					completed = LocationObjects.TryAdd(newInternalId, (LocationDataObject)objectToAdd);
				}
			}
			
			if (!objectToAdd.IsNew && existingObject == null)
			{
                //The following if should not be necessary...
				var completed = false;
				if (LocationObjectInternalIds.ContainsKey(((LocationDataObject)objectToAdd).PrimaryKey))
				{
					int value;
					var count2 = 0;
					while (!completed && count2++ < 15)
					{
						completed = LocationObjectInternalIds.TryRemove(((LocationDataObject)objectToAdd).PrimaryKey, out value);
					}
				}

				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = LocationObjectInternalIds.TryAdd(((LocationDataObject)objectToAdd).PrimaryKey, newInternalId);
				}
			}
			// Update relations including platform as "many" side or "one" side , pk side for one to one relations
			if((objectToAdd as LocationDataObject) == null)
			{
				_logEngine.LogError("Unable to Add an object which is null", "Unable to add an object which is null", "LocationDataObject", null);
				throw new PulpException("Unexpected Error: Unable to Add an object which is Null.");
			}

			// Update the Country FK Index 
			if ((objectToAdd as LocationDataObject).CountryURI != null)
			{
			if (!Country_FKIndex.ContainsKey((objectToAdd as LocationDataObject).CountryURI))
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = Country_FKIndex.TryAdd((objectToAdd as LocationDataObject).CountryURI, new List<int>());
				}
			}
				
			if (!Country_FKIndex[(objectToAdd as LocationDataObject).CountryURI].Contains(newInternalId))
				Country_FKIndex[(objectToAdd as LocationDataObject).CountryURI].Add(newInternalId);

            CountryDataObject relatedCountry;
            if ((objectToAdd as LocationDataObject)._country_NewObjectId != null)
            {
                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject() { IsNew = true, InternalObjectId = (objectToAdd as LocationDataObject)._country_NewObjectId });
            }
            else
            {
                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject((objectToAdd as LocationDataObject).CountryURI) { IsNew = false });
            }

			if (relatedCountry != null && this.RootObjectDataSet.NotifyChanges)
                relatedCountry.NotifyPropertyChanged("LocationItems", new SeenObjectCollection());
			
			}
	 
	 
		
		}

        public override void RemoveObject(IDataObject objectToRemove)
        {
            if (LocationObjects == null)
                return;
			bool completed;			
			int? objectToRemoveInternalId;
			
			if((objectToRemove as LocationDataObject) == null)
			{
				_logEngine.LogError("Unable to remove null object", "The object you are trying to remove is null", "LocationObjectsDataSet.RemoveObject", null);
				throw new PulpException("Unable to remove Null Object.");
			}

			if (objectToRemove.IsNew)
				objectToRemoveInternalId = objectToRemove.InternalObjectId;
			else
				objectToRemoveInternalId = LocationObjectInternalIds.ContainsKey((objectToRemove as LocationDataObject).PrimaryKey) ? (int?) LocationObjectInternalIds[(objectToRemove as LocationDataObject).PrimaryKey] : null;
				
			if (objectToRemoveInternalId != null)
			{
				LocationDataObject value;
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = LocationObjects.TryRemove((int)objectToRemoveInternalId, out value);
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
						completed = LocationObjectInternalIds.TryRemove((objectToRemove as LocationDataObject).PrimaryKey, out idvalue);
					}
				}
				
			// Delete the Country FK Index 
				if ((objectToRemove as LocationDataObject).CountryURI != null)
				{
				if (Country_FKIndex.ContainsKey((objectToRemove as LocationDataObject).CountryURI) && Country_FKIndex[(objectToRemove as LocationDataObject).CountryURI].Contains((int)objectToRemoveInternalId))
				{
					Country_FKIndex[(objectToRemove as LocationDataObject).CountryURI].Remove((int)objectToRemoveInternalId);

					if (!Country_FKIndex[(objectToRemove as LocationDataObject).CountryURI].Any())
					{
						List<int> outvalue;
						var iscompleted = false;
						var count2 = 0;
						while (!iscompleted  && count2++ < 15)
						{
							iscompleted = Country_FKIndex.TryRemove((objectToRemove as LocationDataObject).CountryURI, out outvalue);
						}
					}
				}
				
				CountryDataObject relatedCountry;
	            if ((objectToRemove as LocationDataObject)._country_NewObjectId != null)
	            {
	                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject() { IsNew = true, InternalObjectId = (objectToRemove as LocationDataObject)._country_NewObjectId });
	            }
	            else
	            {
	                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject((objectToRemove as LocationDataObject).CountryURI) { IsNew = false });
	            }

	            if (relatedCountry != null && this.RootObjectDataSet.NotifyChanges)
	                relatedCountry.NotifyPropertyChanged("LocationItems", new SeenObjectCollection());
				
				}
		 
		 
			}		
		}

		public override TDataObject GetObject<TDataObject>(Type objectBaseType, int internalObjectId)
        {
            return LocationObjects.ContainsKey(internalObjectId) ? LocationObjects[internalObjectId] as TDataObject : null;
        }

        public override TDataObject GetObject<TDataObject>(TDataObject objectToGet)
        {
			int? objectToGetInternalId;
			
			if (objectToGet.IsNew)
				objectToGetInternalId = objectToGet.InternalObjectId;
			else
			{
				if((objectToGet as LocationDataObject) == null)
				{
					_logEngine.LogError("Unable to get value which value is null", "The object you are trying to get doesn't have a value", "LocationObjectsDataSet", null);
					throw new PulpException("Unable to get an element which value is null.");
				}
				objectToGetInternalId = LocationObjectInternalIds.ContainsKey((objectToGet as LocationDataObject).PrimaryKey) ? (int?) LocationObjectInternalIds[(objectToGet as LocationDataObject).PrimaryKey] : null;
			}
			if (objectToGetInternalId != null)
			{
				return LocationObjects.ContainsKey((int)objectToGetInternalId) ? LocationObjects[(int)objectToGetInternalId] as TDataObject : null;
			}

			return null;
        }
		
        public override IEnumerable<IDataObject> GetObjectsMarkedForDeletion()
        {
			return LocationObjects.Values.Where(c => c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		public override IEnumerable<IDataObject> GetObjectsOutOfGraph()
        {
			return LocationObjects.Values.Where(c => !c.IncludedInGraph && !c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		
		public IEnumerable<LocationDataObject> GetLocationItemsForCountry(CountryDataObject countryInstance) 
		{
			if (countryInstance.IsNew)
            {
			
              return LocationObjects.Where(o => o.Value._country_NewObjectId != null && o.Value._country_NewObjectId == countryInstance.InternalObjectId).Select(o => o.Value);
			}
				
			if (Country_FKIndex.ContainsKey(countryInstance.URI))
			{
				return Country_FKIndex[countryInstance.URI].Where(e => LocationObjects.ContainsKey(e)).Select(e => LocationObjects[e]);
			}
			
			return new DataObjectCollection<LocationDataObject>();
		}
		 
		 

        public override DataObjectCollection<TDataObject> GetRelatedObjects<TDataObject>(IDataObject rootObject, string relationName)
        {
 
			if (relationName == "PlaceToLocationItems")
            {
				IEnumerable< PlaceToLocationDataObject> relatedObjects;					
				relatedObjects = _rootObjectDataSet.PlaceToLocationObjectsDataSet.GetPlaceToLocationItemsForLocation(rootObject as LocationDataObject);
				
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
			var LocationDataSet = dataSetToMerge as LocationObjectsDataSet;
			if(LocationDataSet == null)
			{
				throw new PulpException("Unable to merge the current DataSet with null");
			}
            foreach (var item in LocationDataSet.LocationObjects.Values)
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
						_logEngine.LogError("Unable to merge elements in DataSet without InternalId", "The Element you are trying to merge doesn't have an internalId", "LocationObjectsDataSet", null);
						throw new PulpException("Unable to merge elements in dataset without InternalId");
					}
					var completed = false;
					var count = 0;
					while (!completed && count++ < 15)
					{
						completed = _rootObjectDataSet.DatasetMergingInternalIdMapping.TryAdd((int) oldInternalId, (int) newInternalId);
					}
				}

				MergedDataObjects.Enqueue(objectToMerge as LocationDataObject);
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
			// Reconstruct the Country FK Index 
			Country_FKIndex = new ConcurrentDictionary< System.String, List<int>>();
				
			foreach (var item in LocationObjects.Values)
			{
				if (item.CountryURI == null) 
					continue;				
				
				if (item.IsMarkedForDeletion)
					continue;

				var fk = item.CountryURI;	

				if (!Country_FKIndex.ContainsKey(fk))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = Country_FKIndex.TryAdd(fk, new List<int>());
					}
				}
				if(item.InternalObjectId == null)
				{
					_logEngine.LogError("Unable to reconstruct indexes.", "An error occured while trying to reconstruct indexes", "LocationObjectsDataSet", null);
					throw new PulpException("Unable to reconstruct indexes.");
				}
					
				Country_FKIndex[fk].Add((int)item.InternalObjectId);
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
			while (LocationObjectInternalIds.Values.Contains(newInternalId))
			{
				newInternalId = _rootObjectDataSet.GetNextNewObjectId();
			}

			return newInternalId;
		}

		#endregion

	}	
}