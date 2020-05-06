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
	public class VisitedPlaceObjectsDataSet : ObjectsDataSetBase
	{
        #region fields

        private ObjectsDataSet _rootObjectDataSet;
		private ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();

		// Mapping between entity primary key and data set objects collection internal id
		private ConcurrentDictionary< System.Guid, int> _visitedPlaceObjectInternalIds = new ConcurrentDictionary< System.Guid, int>();
		
		// Collection holding all VisitedPlace objects for current dataset
		private ConcurrentDictionary< int, VisitedPlaceDataObject> _visitedPlaceObjects = new ConcurrentDictionary< int, VisitedPlaceDataObject>();

		// Temp list of merged data objects - required for merge finalization
		private ConcurrentQueue<VisitedPlaceDataObject> _mergedDataObjects;

		private ConcurrentQueue<VisitedPlaceDataObject> MergedDataObjects 
		{
			get
			{
				if (_mergedDataObjects == null)
					_mergedDataObjects = new ConcurrentQueue<VisitedPlaceDataObject>();
					
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
		public ConcurrentDictionary< System.Guid, int> VisitedPlaceObjectInternalIds
		{ 
			get { return _visitedPlaceObjectInternalIds; }
			set { _visitedPlaceObjectInternalIds = value; }
		}
		
		// Collection holding all VisitedPlace objects for current dataset
		[JsonProperty(DefaultValueHandling  = DefaultValueHandling.Ignore)]
		public ConcurrentDictionary< int, VisitedPlaceDataObject> VisitedPlaceObjects
		{ 
			get { return _visitedPlaceObjects; }
			set { _visitedPlaceObjects = value; }
		}
		
		// Index to quickly find all VisitedPlace with a given country foreign key
		public ConcurrentDictionary<System.String, List<int>> Country_FKIndex = new ConcurrentDictionary<System.String, List<int>>();
		
 
		// Index to quickly find all VisitedPlace with a given place foreign key
		public ConcurrentDictionary<System.String, List<int>> Place_FKIndex = new ConcurrentDictionary<System.String, List<int>>();
		
 
		// Index to quickly find all VisitedPlace with a given userProfile foreign key
		public ConcurrentDictionary<System.String, List<int>> UserProfile_FKIndex = new ConcurrentDictionary<System.String, List<int>>();
		
 
		
		#endregion
		
		#region initialization

        public VisitedPlaceObjectsDataSet(ObjectsDataSet rootObjectDataSet)
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
			var clone = new VisitedPlaceObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.VisitedPlaceObjects)
			{
                var cloneObject = (VisitedPlaceDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.VisitedPlaceObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.VisitedPlaceObjectInternalIds)
			{
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.VisitedPlaceObjectInternalIds.TryAdd(keyValue.Key, keyValue.Value);
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

			foreach(var fkKeyValue in this.Place_FKIndex)
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = clone.Place_FKIndex.TryAdd(fkKeyValue.Key, new List<int>());
				}

				foreach (var pk in fkKeyValue.Value)
				{
					clone.Place_FKIndex[fkKeyValue.Key].Add(pk);
				}
			}

			foreach(var fkKeyValue in this.UserProfile_FKIndex)
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = clone.UserProfile_FKIndex.TryAdd(fkKeyValue.Key, new List<int>());
				}

				foreach (var pk in fkKeyValue.Value)
				{
					clone.UserProfile_FKIndex[fkKeyValue.Key].Add(pk);
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
			var clone = new VisitedPlaceObjectsDataSet(rootDataSet as ObjectsDataSet);
			bool completed;

			foreach(var keyValue in this.VisitedPlaceObjects.Where(o => o.Value.IsDirty || o.Value.IsMarkedForDeletion))
			{
                var cloneObject = (VisitedPlaceDataObject) keyValue.Value.Clone(false);
                cloneObject.InternalObjectId = keyValue.Value.InternalObjectId;
				
				completed = false;
				while (!completed)
				{
					 completed = clone.VisitedPlaceObjects.TryAdd(keyValue.Key, cloneObject);
				}
			}

			foreach(var keyValue in this.VisitedPlaceObjectInternalIds
				.Where(o => this.VisitedPlaceObjects[o.Value].IsDirty || this.VisitedPlaceObjects[o.Value].IsMarkedForDeletion))
			{
				completed = false;
				
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = clone.VisitedPlaceObjectInternalIds.TryAdd(keyValue.Key, keyValue.Value);
				}
			}
			
			// CloneDirtyObjects is used to pass only dirty objects to server to save changes. Since indexes are not serialized, no need to clone them
            return clone;
		}

		public override IEnumerable<IDataObject> GetAllObjects()
		{
			foreach(var visitedPlace in VisitedPlaceObjects.Values)
			{
				yield return visitedPlace; 
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
					_logEngine.LogError("Error while trying to Add Object to the VisitedPlaceObjectsDataSet", "The object you are trying to add doesn't have an InternalObjectId", "VisitedPlaceObjectsDataSet", null);
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
					completed = VisitedPlaceObjects.TryAdd(newInternalId, (VisitedPlaceDataObject)objectToAdd);
				}
			}
			
			if (!objectToAdd.IsNew && existingObject == null)
			{
                //The following if should not be necessary...
				var completed = false;
				if (VisitedPlaceObjectInternalIds.ContainsKey(((VisitedPlaceDataObject)objectToAdd).PrimaryKey))
				{
					int value;
					var count2 = 0;
					while (!completed && count2++ < 15)
					{
						completed = VisitedPlaceObjectInternalIds.TryRemove(((VisitedPlaceDataObject)objectToAdd).PrimaryKey, out value);
					}
				}

				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = VisitedPlaceObjectInternalIds.TryAdd(((VisitedPlaceDataObject)objectToAdd).PrimaryKey, newInternalId);
				}
			}
			// Update relations including platform as "many" side or "one" side , pk side for one to one relations
			if((objectToAdd as VisitedPlaceDataObject) == null)
			{
				_logEngine.LogError("Unable to Add an object which is null", "Unable to add an object which is null", "VisitedPlaceDataObject", null);
				throw new PulpException("Unexpected Error: Unable to Add an object which is Null.");
			}

			// Update the Country FK Index 
			if ((objectToAdd as VisitedPlaceDataObject).CountryURI != null)
			{
				if (!Country_FKIndex.ContainsKey((System.String)(objectToAdd as VisitedPlaceDataObject).CountryURI))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = Country_FKIndex.TryAdd((System.String)(objectToAdd as VisitedPlaceDataObject).CountryURI, new List<int>());
					}
				}
				
				if (!Country_FKIndex[(System.String)(objectToAdd as VisitedPlaceDataObject).CountryURI].Contains(newInternalId))	
					Country_FKIndex[(System.String)(objectToAdd as VisitedPlaceDataObject).CountryURI].Add(newInternalId);

	            CountryDataObject relatedCountry;
	            if ((objectToAdd as VisitedPlaceDataObject)._country_NewObjectId != null)
	            {
	                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject() { IsNew = true, InternalObjectId = (objectToAdd as VisitedPlaceDataObject)._country_NewObjectId });
	            }
	            else
	            {
	                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject((System.String)(objectToAdd as VisitedPlaceDataObject).CountryURI) { IsNew = false });
	            }

	            if (relatedCountry != null && this.RootObjectDataSet.NotifyChanges)
	                relatedCountry.NotifyPropertyChanged("VisitedPlaceItems", new SeenObjectCollection());
			}
			
	 
			// Update the Place FK Index 
			if ((objectToAdd as VisitedPlaceDataObject).PlaceURI != null)
			{
				if (!Place_FKIndex.ContainsKey((System.String)(objectToAdd as VisitedPlaceDataObject).PlaceURI))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = Place_FKIndex.TryAdd((System.String)(objectToAdd as VisitedPlaceDataObject).PlaceURI, new List<int>());
					}
				}
				
				if (!Place_FKIndex[(System.String)(objectToAdd as VisitedPlaceDataObject).PlaceURI].Contains(newInternalId))	
					Place_FKIndex[(System.String)(objectToAdd as VisitedPlaceDataObject).PlaceURI].Add(newInternalId);

	            PlaceDataObject relatedPlace;
	            if ((objectToAdd as VisitedPlaceDataObject)._place_NewObjectId != null)
	            {
	                relatedPlace = _rootObjectDataSet.GetObject(new PlaceDataObject() { IsNew = true, InternalObjectId = (objectToAdd as VisitedPlaceDataObject)._place_NewObjectId });
	            }
	            else
	            {
	                relatedPlace = _rootObjectDataSet.GetObject(new PlaceDataObject((System.String)(objectToAdd as VisitedPlaceDataObject).PlaceURI) { IsNew = false });
	            }

	            if (relatedPlace != null && this.RootObjectDataSet.NotifyChanges)
	                relatedPlace.NotifyPropertyChanged("VisitedPlaceItems", new SeenObjectCollection());
			}
			
	 
			// Update the UserProfile FK Index 
			if ((objectToAdd as VisitedPlaceDataObject).UserProfileUri != null)
			{
			if (!UserProfile_FKIndex.ContainsKey((objectToAdd as VisitedPlaceDataObject).UserProfileUri))
			{
				var iscompleted = false;
				var count2 = 0;
				while (!iscompleted && count2++ < 15)
				{
					iscompleted = UserProfile_FKIndex.TryAdd((objectToAdd as VisitedPlaceDataObject).UserProfileUri, new List<int>());
				}
			}
				
			if (!UserProfile_FKIndex[(objectToAdd as VisitedPlaceDataObject).UserProfileUri].Contains(newInternalId))
				UserProfile_FKIndex[(objectToAdd as VisitedPlaceDataObject).UserProfileUri].Add(newInternalId);

            UserProfileDataObject relatedUserProfile;
            if ((objectToAdd as VisitedPlaceDataObject)._userProfile_NewObjectId != null)
            {
                relatedUserProfile = _rootObjectDataSet.GetObject(new UserProfileDataObject() { IsNew = true, InternalObjectId = (objectToAdd as VisitedPlaceDataObject)._userProfile_NewObjectId });
            }
            else
            {
                relatedUserProfile = _rootObjectDataSet.GetObject(new UserProfileDataObject((objectToAdd as VisitedPlaceDataObject).UserProfileUri) { IsNew = false });
            }

			if (relatedUserProfile != null && this.RootObjectDataSet.NotifyChanges)
                relatedUserProfile.NotifyPropertyChanged("VisitedPlaceItems", new SeenObjectCollection());
			
			}
	 
		
		}

        public override void RemoveObject(IDataObject objectToRemove)
        {
            if (VisitedPlaceObjects == null)
                return;
			bool completed;			
			int? objectToRemoveInternalId;
			
			if((objectToRemove as VisitedPlaceDataObject) == null)
			{
				_logEngine.LogError("Unable to remove null object", "The object you are trying to remove is null", "VisitedPlaceObjectsDataSet.RemoveObject", null);
				throw new PulpException("Unable to remove Null Object.");
			}

			if (objectToRemove.IsNew)
				objectToRemoveInternalId = objectToRemove.InternalObjectId;
			else
				objectToRemoveInternalId = VisitedPlaceObjectInternalIds.ContainsKey((objectToRemove as VisitedPlaceDataObject).PrimaryKey) ? (int?) VisitedPlaceObjectInternalIds[(objectToRemove as VisitedPlaceDataObject).PrimaryKey] : null;
				
			if (objectToRemoveInternalId != null)
			{
				VisitedPlaceDataObject value;
				completed = false;
				var count = 0;
				while (!completed && count++ < 15)
				{
					completed = VisitedPlaceObjects.TryRemove((int)objectToRemoveInternalId, out value);
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
						completed = VisitedPlaceObjectInternalIds.TryRemove((objectToRemove as VisitedPlaceDataObject).PrimaryKey, out idvalue);
					}
				}
				
			// Delete the Country FK Index 
				if ((objectToRemove as VisitedPlaceDataObject).CountryURI != null)
				{
					if (Country_FKIndex.ContainsKey((System.String)(objectToRemove as VisitedPlaceDataObject).CountryURI) && Country_FKIndex[(System.String)(objectToRemove as VisitedPlaceDataObject).CountryURI].Contains((int)objectToRemoveInternalId))
					{
						Country_FKIndex[(System.String)(objectToRemove as VisitedPlaceDataObject).CountryURI].Remove((int)objectToRemoveInternalId);

						if (!Country_FKIndex[(System.String)(objectToRemove as VisitedPlaceDataObject).CountryURI].Any())
						{
							List<int> outvalue;
							var iscompleted = false;
							var count2 = 0;
							while (!iscompleted && count2++ < 15)
							{
								iscompleted = Country_FKIndex.TryRemove((System.String)(objectToRemove as VisitedPlaceDataObject).CountryURI, out outvalue);
							}
						}
					}

					CountryDataObject relatedCountry;
		            if ((objectToRemove as VisitedPlaceDataObject)._country_NewObjectId != null)
		            {
		                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject() { IsNew = true, InternalObjectId = (objectToRemove as VisitedPlaceDataObject)._country_NewObjectId });
		            }
		            else
		            {
		                relatedCountry = _rootObjectDataSet.GetObject(new CountryDataObject((System.String)(objectToRemove as VisitedPlaceDataObject).CountryURI) { IsNew = false });
		            }

		            if (relatedCountry != null && this.RootObjectDataSet.NotifyChanges)
		                relatedCountry.NotifyPropertyChanged("VisitedPlaceItems", new SeenObjectCollection());
					
				}			
		 
			// Delete the Place FK Index 
				if ((objectToRemove as VisitedPlaceDataObject).PlaceURI != null)
				{
					if (Place_FKIndex.ContainsKey((System.String)(objectToRemove as VisitedPlaceDataObject).PlaceURI) && Place_FKIndex[(System.String)(objectToRemove as VisitedPlaceDataObject).PlaceURI].Contains((int)objectToRemoveInternalId))
					{
						Place_FKIndex[(System.String)(objectToRemove as VisitedPlaceDataObject).PlaceURI].Remove((int)objectToRemoveInternalId);

						if (!Place_FKIndex[(System.String)(objectToRemove as VisitedPlaceDataObject).PlaceURI].Any())
						{
							List<int> outvalue;
							var iscompleted = false;
							var count2 = 0;
							while (!iscompleted && count2++ < 15)
							{
								iscompleted = Place_FKIndex.TryRemove((System.String)(objectToRemove as VisitedPlaceDataObject).PlaceURI, out outvalue);
							}
						}
					}

					PlaceDataObject relatedPlace;
		            if ((objectToRemove as VisitedPlaceDataObject)._place_NewObjectId != null)
		            {
		                relatedPlace = _rootObjectDataSet.GetObject(new PlaceDataObject() { IsNew = true, InternalObjectId = (objectToRemove as VisitedPlaceDataObject)._place_NewObjectId });
		            }
		            else
		            {
		                relatedPlace = _rootObjectDataSet.GetObject(new PlaceDataObject((System.String)(objectToRemove as VisitedPlaceDataObject).PlaceURI) { IsNew = false });
		            }

		            if (relatedPlace != null && this.RootObjectDataSet.NotifyChanges)
		                relatedPlace.NotifyPropertyChanged("VisitedPlaceItems", new SeenObjectCollection());
					
				}			
		 
			// Delete the UserProfile FK Index 
				if ((objectToRemove as VisitedPlaceDataObject).UserProfileUri != null)
				{
				if (UserProfile_FKIndex.ContainsKey((objectToRemove as VisitedPlaceDataObject).UserProfileUri) && UserProfile_FKIndex[(objectToRemove as VisitedPlaceDataObject).UserProfileUri].Contains((int)objectToRemoveInternalId))
				{
					UserProfile_FKIndex[(objectToRemove as VisitedPlaceDataObject).UserProfileUri].Remove((int)objectToRemoveInternalId);

					if (!UserProfile_FKIndex[(objectToRemove as VisitedPlaceDataObject).UserProfileUri].Any())
					{
						List<int> outvalue;
						var iscompleted = false;
						var count2 = 0;
						while (!iscompleted  && count2++ < 15)
						{
							iscompleted = UserProfile_FKIndex.TryRemove((objectToRemove as VisitedPlaceDataObject).UserProfileUri, out outvalue);
						}
					}
				}
				
				UserProfileDataObject relatedUserProfile;
	            if ((objectToRemove as VisitedPlaceDataObject)._userProfile_NewObjectId != null)
	            {
	                relatedUserProfile = _rootObjectDataSet.GetObject(new UserProfileDataObject() { IsNew = true, InternalObjectId = (objectToRemove as VisitedPlaceDataObject)._userProfile_NewObjectId });
	            }
	            else
	            {
	                relatedUserProfile = _rootObjectDataSet.GetObject(new UserProfileDataObject((objectToRemove as VisitedPlaceDataObject).UserProfileUri) { IsNew = false });
	            }

	            if (relatedUserProfile != null && this.RootObjectDataSet.NotifyChanges)
	                relatedUserProfile.NotifyPropertyChanged("VisitedPlaceItems", new SeenObjectCollection());
				
				}
		 
			}		
		}

		public override TDataObject GetObject<TDataObject>(Type objectBaseType, int internalObjectId)
        {
            return VisitedPlaceObjects.ContainsKey(internalObjectId) ? VisitedPlaceObjects[internalObjectId] as TDataObject : null;
        }

        public override TDataObject GetObject<TDataObject>(TDataObject objectToGet)
        {
			int? objectToGetInternalId;
			
			if (objectToGet.IsNew)
				objectToGetInternalId = objectToGet.InternalObjectId;
			else
			{
				if((objectToGet as VisitedPlaceDataObject) == null)
				{
					_logEngine.LogError("Unable to get value which value is null", "The object you are trying to get doesn't have a value", "VisitedPlaceObjectsDataSet", null);
					throw new PulpException("Unable to get an element which value is null.");
				}
				objectToGetInternalId = VisitedPlaceObjectInternalIds.ContainsKey((objectToGet as VisitedPlaceDataObject).PrimaryKey) ? (int?) VisitedPlaceObjectInternalIds[(objectToGet as VisitedPlaceDataObject).PrimaryKey] : null;
			}
			if (objectToGetInternalId != null)
			{
				return VisitedPlaceObjects.ContainsKey((int)objectToGetInternalId) ? VisitedPlaceObjects[(int)objectToGetInternalId] as TDataObject : null;
			}

			return null;
        }
		
        public override IEnumerable<IDataObject> GetObjectsMarkedForDeletion()
        {
			return VisitedPlaceObjects.Values.Where(c => c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		public override IEnumerable<IDataObject> GetObjectsOutOfGraph()
        {
			return VisitedPlaceObjects.Values.Where(c => !c.IncludedInGraph && !c.IsMarkedForDeletion).Cast<IDataObject>();
        }

		
		public IEnumerable<VisitedPlaceDataObject> GetVisitedPlaceItemsForCountry(CountryDataObject countryInstance) 
		{
			if (countryInstance.IsNew)
            {
			
              return VisitedPlaceObjects.Where(o => o.Value._country_NewObjectId != null && o.Value._country_NewObjectId == countryInstance.InternalObjectId).Select(o => o.Value);
			}
				
			if (Country_FKIndex.ContainsKey(countryInstance.URI))
			{
				return Country_FKIndex[countryInstance.URI].Where(e => VisitedPlaceObjects.ContainsKey(e)).Select(e => VisitedPlaceObjects[e]);
			}
			
			return new DataObjectCollection<VisitedPlaceDataObject>();
		}
		 
		
		public IEnumerable<VisitedPlaceDataObject> GetVisitedPlaceItemsForPlace(PlaceDataObject placeInstance) 
		{
			if (placeInstance.IsNew)
            {
			
              return VisitedPlaceObjects.Where(o => o.Value._place_NewObjectId != null && o.Value._place_NewObjectId == placeInstance.InternalObjectId).Select(o => o.Value);
			}
				
			if (Place_FKIndex.ContainsKey(placeInstance.URI))
			{
				return Place_FKIndex[placeInstance.URI].Where(e => VisitedPlaceObjects.ContainsKey(e)).Select(e => VisitedPlaceObjects[e]);
			}
			
			return new DataObjectCollection<VisitedPlaceDataObject>();
		}
		 
		
		public IEnumerable<VisitedPlaceDataObject> GetVisitedPlaceItemsForUserProfile(UserProfileDataObject userProfileInstance) 
		{
			if (userProfileInstance.IsNew)
            {
			
              return VisitedPlaceObjects.Where(o => o.Value._userProfile_NewObjectId != null && o.Value._userProfile_NewObjectId == userProfileInstance.InternalObjectId).Select(o => o.Value);
			}
				
			if (UserProfile_FKIndex.ContainsKey(userProfileInstance.Uri))
			{
				return UserProfile_FKIndex[userProfileInstance.Uri].Where(e => VisitedPlaceObjects.ContainsKey(e)).Select(e => VisitedPlaceObjects[e]);
			}
			
			return new DataObjectCollection<VisitedPlaceDataObject>();
		}
		 

        public override DataObjectCollection<TDataObject> GetRelatedObjects<TDataObject>(IDataObject rootObject, string relationName)
        {
 
 
 
			return null;
		}
		
        public override void Merge(IObjectsDataSet dataSetToMerge, bool updateOrginalInternalId)
        {
			var VisitedPlaceDataSet = dataSetToMerge as VisitedPlaceObjectsDataSet;
			if(VisitedPlaceDataSet == null)
			{
				throw new PulpException("Unable to merge the current DataSet with null");
			}
            foreach (var item in VisitedPlaceDataSet.VisitedPlaceObjects.Values)
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
						_logEngine.LogError("Unable to merge elements in DataSet without InternalId", "The Element you are trying to merge doesn't have an internalId", "VisitedPlaceObjectsDataSet", null);
						throw new PulpException("Unable to merge elements in dataset without InternalId");
					}
					var completed = false;
					var count = 0;
					while (!completed && count++ < 15)
					{
						completed = _rootObjectDataSet.DatasetMergingInternalIdMapping.TryAdd((int) oldInternalId, (int) newInternalId);
					}
				}

				MergedDataObjects.Enqueue(objectToMerge as VisitedPlaceDataObject);
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
				
			foreach (var item in VisitedPlaceObjects.Values)
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
					_logEngine.LogError("Unable to reconstruct indexes.", "An error occured while trying to reconstruct indexes", "VisitedPlaceObjectsDataSet", null);
					throw new PulpException("Unable to reconstruct indexes.");
				}
					
				Country_FKIndex[fk].Add((int)item.InternalObjectId);
			}			
		 
			// Reconstruct the Place FK Index 
			Place_FKIndex = new ConcurrentDictionary< System.String, List<int>>();
				
			foreach (var item in VisitedPlaceObjects.Values)
			{
				if (item.PlaceURI == null) 
					continue;				
				
				if (item.IsMarkedForDeletion)
					continue;

				var fk = item.PlaceURI;	

				if (!Place_FKIndex.ContainsKey(fk))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = Place_FKIndex.TryAdd(fk, new List<int>());
					}
				}
				if(item.InternalObjectId == null)
				{
					_logEngine.LogError("Unable to reconstruct indexes.", "An error occured while trying to reconstruct indexes", "VisitedPlaceObjectsDataSet", null);
					throw new PulpException("Unable to reconstruct indexes.");
				}
					
				Place_FKIndex[fk].Add((int)item.InternalObjectId);
			}			
		 
			// Reconstruct the UserProfile FK Index 
			UserProfile_FKIndex = new ConcurrentDictionary< System.String, List<int>>();
				
			foreach (var item in VisitedPlaceObjects.Values)
			{
				if (item.UserProfileUri == null) 
					continue;				
				
				if (item.IsMarkedForDeletion)
					continue;

				var fk = item.UserProfileUri;	

				if (!UserProfile_FKIndex.ContainsKey(fk))
				{
					var iscompleted = false;
					var count2 = 0;
					while (!iscompleted && count2++ < 15)
					{
						iscompleted = UserProfile_FKIndex.TryAdd(fk, new List<int>());
					}
				}
				if(item.InternalObjectId == null)
				{
					_logEngine.LogError("Unable to reconstruct indexes.", "An error occured while trying to reconstruct indexes", "VisitedPlaceObjectsDataSet", null);
					throw new PulpException("Unable to reconstruct indexes.");
				}
					
				UserProfile_FKIndex[fk].Add((int)item.InternalObjectId);
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
			while (VisitedPlaceObjectInternalIds.Values.Contains(newInternalId))
			{
				newInternalId = _rootObjectDataSet.GetNextNewObjectId();
			}

			return newInternalId;
		}

		#endregion

	}	
}