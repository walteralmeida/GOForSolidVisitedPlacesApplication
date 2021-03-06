﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;
using GenerativeObjects.Practices;
using GenerativeObjects.Practices.Logging;
using GenerativeObjects.Practices.DependencyInjection;
using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using Newtonsoft.Json;
using System.Xml.Serialization;
using System.Collections.Specialized;
using GenerativeObjects.Practices.MVPVM;
using GenerativeObjects.Practices.MVPVM.Commands;
using GenerativeObjects.Practices.ORMSupportClasses;
using System.Collections.Concurrent;
using GenerativeObjects.Practices.LayerSupportClasses;
using Unity;
 
 
using Parameters = System.Collections.Generic.Dictionary<string, object>;


namespace Solid.Data.DataObjects
{
	/// <summary>
	/// DataObject class for the entity 'Place'.
	/// </summary>
    [JsonObject(MemberSerialization.OptIn)]
	public partial class PlaceDataObject : DataObject
	{
		#region Fields

		private ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();
		public virtual Parameters CurrentTransactionParameters => ApplicationSettings.Container.Resolve<IDataProviderTransaction>().Parameters;
 
		[JsonProperty ("Abstract")]
		protected System.String _abstract;
		[JsonProperty ("Name")]
		protected System.String _name;
		[JsonProperty ("URI")]
		protected System.String _uRI;
	
	
		// fields to store relation Ids when relating to new objects (with no PK set yet)


		#endregion
		
		#region initialization
		
		/// <summary>
		/// Default Constructor
		/// </summary>
		public PlaceDataObject() : base ()		
		{
		}

		/// <summary>
		/// Main Constructor
		/// </summary>
		public PlaceDataObject(System.String uRI)
			: base()
		{
			this._uRI = uRI;
		}

		/// <summary>
		/// Copy Constructor
		/// </summary>
		public PlaceDataObject(PlaceDataObject template, bool deepCopy)
		{
			this.SetAbstractValue(template.Abstract, false, false);
			this.SetNameValue(template.Name, false, false);
			this.SetURIValue(template.URI, false, false);
 
 
 
			this.SetIsNewValue(template.IsNew, false, false);

			if (deepCopy)
			{

				this.ObjectsDataSet = template.ObjectsDataSet.Clone();
				// Remove the template object from the dataset
                this.ObjectsDataSet.RemoveObject(template);
				// And Replace by the one we're currently constructing
                this.ObjectsDataSet.AddObject(this);
			}
		
			this.SetIsDirtyValue(template.IsDirty, false, false);
			this.SetIsMarkedForDeletionValue(template.IsMarkedForDeletion, false, false);
		}

		public virtual PlaceDataObject Copy()
		{
			return Copy(true);
		}
		
		public virtual PlaceDataObject Copy(bool deepCopy)
		{
			return new PlaceDataObject(this, deepCopy);
		}
		
		public override void CopyValuesFrom(IDataObject sourceObject, bool deepCopy)
        {
			var placeSource = sourceObject as PlaceDataObject;

			if (ReferenceEquals(null, placeSource))
				throw new PulpException("Wrong type of object");

			this.SetIsNewValue(sourceObject.IsNew, false, false);						
			this.SetAbstractValue(placeSource.Abstract, false, false);
			this.SetNameValue(placeSource.Name, false, false);
			this.SetURIValue(placeSource.URI, false, false);


			if (deepCopy)
			{
				this.ObjectsDataSet = placeSource.ObjectsDataSet.Clone();
				// Remove the source object from the dataset
                this.ObjectsDataSet.RemoveObject(placeSource);
				// And Replace by the one we're currently constructing
                this.ObjectsDataSet.AddObject(this);
			}

			this.SetIsDirtyValue(sourceObject.IsDirty, false, false);
			this.SetIsMarkedForDeletionValue(sourceObject.IsMarkedForDeletion, false, false);
		}

        public override bool Equals(System.Object obj)
        {
            var p = obj as PlaceDataObject;
            
			if (p == null)
            {
                return false;
            }

			if (p.IsNew) 
				return base.Equals(obj);
				
            // Return true if the identifying fields match:
			return  p._uRI == this._uRI;
        }


        public override int GetHashCode()
        {		
			
			return _uRI == null ? -1 : _uRI.GetHashCode();
		}

		public override void UpdateRelatedInternalIds(ConcurrentDictionary<int, int> datasetMergingInternalIdMapping)
        {


		}

		#endregion
        
		#region Relation properties		
		

		public virtual DataObjectCollection<PlaceToLocationDataObject> LoadPlaceToLocationItems(bool skipSecurity = false)
		{
			return LoadPlaceToLocationItems(CurrentTransactionParameters ?? new Parameters(), skipSecurity);
		}

		public virtual DataObjectCollection<PlaceToLocationDataObject> LoadPlaceToLocationItems(Parameters parameters, bool skipSecurity = false)
		{
			// load the collection if not yet loaded
            if (!__placeToLocationItemsAlreadyLazyLoaded)
            {
				__placeToLocationItemsAlreadyLazyLoaded = true;
                var filterPredicate = "PlaceURI == @0";
                var filterArguments = new object[] { (System.String)this.URI };
				var result = ApplicationSettings.Container.Resolve<IDataProvider<PlaceToLocationDataObject>>().GetCollection(null, filterPredicate, filterArguments, parameters : parameters, skipSecurity: skipSecurity);
                // Reference Links are not serialized => should reconstruct them now
                if (result != null && result.ObjectsDataSet != null) 
                { 
                    Merge(result.ObjectsDataSet);
                }
            }

			return GetPlaceToLocationItems(false);
		}
		
		private bool __placeToLocationItemsAlreadyLazyLoaded = false;
		[JsonProperty]
		public virtual DataObjectCollection<PlaceToLocationDataObject> PlaceToLocationItems 
		{
			get
			{			
				return GetPlaceToLocationItems(true);
			}
		}
		
		public virtual bool ShouldSerializePlaceToLocationItems()
		{
			return ObjectsDataSet != null && ObjectsDataSet.RelationsToInclude != null && ObjectsDataSet.RelationsToInclude.ContainsKey("PlaceDataObject") && ObjectsDataSet.RelationsToInclude["PlaceDataObject"].Contains("PlaceToLocationItems");
		}

		public virtual DataObjectCollection<PlaceToLocationDataObject> GetPlaceToLocationItems(bool allowLazyLoading)
		{
			if (ObjectsDataSet == null)
				return null;

			// Lazy loading enabled and collection not yet loaded => load the collection
			if (allowLazyLoading && LazyLoadingEnabled && !__placeToLocationItemsAlreadyLazyLoaded)
			{
				LoadPlaceToLocationItems();
			}
			var placeToLocationItems = ObjectsDataSet.GetRelatedObjects<PlaceToLocationDataObject>(this, "PlaceToLocationItems");							
			placeToLocationItems.CollectionChanged += new NotifyCollectionChangedEventHandler(PlaceToLocationItems_CollectionChanged);
				
			return placeToLocationItems;
		}

        private void PlaceToLocationItems_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            switch (e.Action)
            {
                case NotifyCollectionChangedAction.Add:
                    foreach (var item in e.NewItems)
                    {
						var relatedObj = item as PlaceToLocationDataObject;
						if (relatedObj == null)
						{
							_logEngine.LogError("Add Event throw an Exception", "Unable to get value of expected related Object : PlaceToLocation", "PlaceDataObject.PlaceToLocationItems_CollectionChanged", null);
							throw new PulpException("Unexpected Error : The Add Event of PlaceDataObject throw an exception while trying to add PlaceToLocationDataObject : NullReference occured");
						}

						if (this.IsNew)
						{
							relatedObj._place_NewObjectId = this.InternalObjectId;
						}
						else
						{
							relatedObj.PlaceURI = this.URI;
						}
 
						if (relatedObj.IsNew && relatedObj.PlaceURI == default(System.String))
							relatedObj.PlaceURI = this.URI;
                    }
                    break;
                case NotifyCollectionChangedAction.Remove:
                    // foreach (var item in e.OldItems)
                    // {
                        //(item as PlaceToLocationDataObject).Place = null;
                    // }
                    break;
            }            
        }


		public virtual DataObjectCollection<VisitedPlaceDataObject> LoadVisitedPlaceItems(bool skipSecurity = false)
		{
			return LoadVisitedPlaceItems(CurrentTransactionParameters ?? new Parameters(), skipSecurity);
		}

		public virtual DataObjectCollection<VisitedPlaceDataObject> LoadVisitedPlaceItems(Parameters parameters, bool skipSecurity = false)
		{
			// load the collection if not yet loaded
            if (!__visitedPlaceItemsAlreadyLazyLoaded)
            {
				__visitedPlaceItemsAlreadyLazyLoaded = true;
                var filterPredicate = "PlaceURI == @0";
                var filterArguments = new object[] { (System.String)this.URI };
				var result = ApplicationSettings.Container.Resolve<IDataProvider<VisitedPlaceDataObject>>().GetCollection(null, filterPredicate, filterArguments, parameters : parameters, skipSecurity: skipSecurity);
                // Reference Links are not serialized => should reconstruct them now
                if (result != null && result.ObjectsDataSet != null) 
                { 
                    Merge(result.ObjectsDataSet);
                }
            }

			return GetVisitedPlaceItems(false);
		}
		
		private bool __visitedPlaceItemsAlreadyLazyLoaded = false;
		[JsonProperty]
		public virtual DataObjectCollection<VisitedPlaceDataObject> VisitedPlaceItems 
		{
			get
			{			
				return GetVisitedPlaceItems(true);
			}
		}
		
		public virtual bool ShouldSerializeVisitedPlaceItems()
		{
			return ObjectsDataSet != null && ObjectsDataSet.RelationsToInclude != null && ObjectsDataSet.RelationsToInclude.ContainsKey("PlaceDataObject") && ObjectsDataSet.RelationsToInclude["PlaceDataObject"].Contains("VisitedPlaceItems");
		}

		public virtual DataObjectCollection<VisitedPlaceDataObject> GetVisitedPlaceItems(bool allowLazyLoading)
		{
			if (ObjectsDataSet == null)
				return null;

			// Lazy loading enabled and collection not yet loaded => load the collection
			if (allowLazyLoading && LazyLoadingEnabled && !__visitedPlaceItemsAlreadyLazyLoaded)
			{
				LoadVisitedPlaceItems();
			}
			var visitedPlaceItems = ObjectsDataSet.GetRelatedObjects<VisitedPlaceDataObject>(this, "VisitedPlaceItems");							
			visitedPlaceItems.CollectionChanged += new NotifyCollectionChangedEventHandler(VisitedPlaceItems_CollectionChanged);
				
			return visitedPlaceItems;
		}

        private void VisitedPlaceItems_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            switch (e.Action)
            {
                case NotifyCollectionChangedAction.Add:
                    foreach (var item in e.NewItems)
                    {
						var relatedObj = item as VisitedPlaceDataObject;
						if (relatedObj == null)
						{
							_logEngine.LogError("Add Event throw an Exception", "Unable to get value of expected related Object : VisitedPlace", "PlaceDataObject.VisitedPlaceItems_CollectionChanged", null);
							throw new PulpException("Unexpected Error : The Add Event of PlaceDataObject throw an exception while trying to add VisitedPlaceDataObject : NullReference occured");
						}

						if (this.IsNew)
						{
							relatedObj._place_NewObjectId = this.InternalObjectId;
						}
						else
						{
							relatedObj.PlaceURI = this.URI;
						}
 
						if (relatedObj.IsNew && relatedObj.PlaceURI == default(System.String))
							relatedObj.PlaceURI = this.URI;
                    }
                    break;
                case NotifyCollectionChangedAction.Remove:
                    // foreach (var item in e.OldItems)
                    // {
                        //(item as VisitedPlaceDataObject).Place = null;
                    // }
                    break;
            }            
        }

		public override void ClearLazyLoadFlags()
		{
			__placeToLocationItemsAlreadyLazyLoaded = false;
			__visitedPlaceItemsAlreadyLazyLoaded = false;
		}

		public override IEnumerable<IDataObject> GetAllRelatedReferencedObjects()
		{
			var result = new List<IDataObject>();
			return result;
		}
		
		public override IEnumerable<IDataObject> GetAllRelatedReferencingObjects()
		{
			var result = new List<IDataObject>();
			if (LoadPlaceToLocationItems() != null)
				result.AddRange(PlaceToLocationItems);
			if (LoadVisitedPlaceItems() != null)
				result.AddRange(VisitedPlaceItems);
			return result;
		}

		public override bool HasUpstreamReferenceTo(IDataObject other)
		{
			if (other == null)
				return false;

			return false;
		}

		#endregion

		#region Commands for Custom fields


		#endregion

		#region Properties
		
		public virtual System.String PrimaryKey
		{
			get { return URI; }
		}

		public virtual void SetPrimaryKeyValue(System.String valueToSet, bool notifyChanges, bool dirtyHandlerOn)
		{
			SetURIValue(valueToSet, notifyChanges, dirtyHandlerOn);
		}
	
			
			
		public virtual void SetAbstractValue(System.String valueToSet)
		{
			SetAbstractValue(valueToSet, true, true);
		}

		public virtual void SetAbstractValue(System.String valueToSet, bool notifyChanges, bool dirtyHandlerOn)
		{
			if (_abstract != valueToSet)
			{
				_abstract = valueToSet;

				OnPropertyChanged("Abstract", notifyChanges, dirtyHandlerOn);
			}
		}
		
		/// <summary> The Abstract property of the Place DataObject</summary>
        public virtual System.String Abstract 
		{
			get	{ return String.IsNullOrEmpty(_abstract) ? null : _abstract; }
			
			
			set
			{
				SetAbstractValue(value);
			}
		}		
			
			
		public virtual void SetNameValue(System.String valueToSet)
		{
			SetNameValue(valueToSet, true, true);
		}

		public virtual void SetNameValue(System.String valueToSet, bool notifyChanges, bool dirtyHandlerOn)
		{
			if (_name != valueToSet)
			{
				_name = valueToSet;

				OnPropertyChanged("Name", notifyChanges, dirtyHandlerOn);
			}
		}
		
		/// <summary> The Name property of the Place DataObject</summary>
        public virtual System.String Name 
		{
			get	{ return _name; }
			
			
			set
			{
				SetNameValue(value);
			}
		}		
			
			
		public virtual void SetURIValue(System.String valueToSet)
		{
			SetURIValue(valueToSet, true, true);
		}

		public virtual void SetURIValue(System.String valueToSet, bool notifyChanges, bool dirtyHandlerOn)
		{
			if (_uRI != valueToSet)
			{
              if (this.ObjectsDataSet != null && !this.IsNew)
                {
                    throw new PulpException("PK field of an existing object is being changed");
                }
				_uRI = valueToSet;

				OnPropertyChanged("URI", notifyChanges, dirtyHandlerOn);
				OnPropertyChanged("PrimaryKey", notifyChanges, dirtyHandlerOn);
			}
		}
		
		/// <summary> The URI property of the Place DataObject</summary>
        public virtual System.String URI 
		{
			get	{ return _uRI; }
			
			
			set
			{
				SetURIValue(value);
			}
		}		
			
		
		/// <summary> The URI Link property of the Place DataObject</summary>
        public virtual System.String URILink 
		{
			get	
			{ 
				if (!AreCalculationsEnabled)
					return default(System.String);

				return ("<a href=\"" + URI + "\" target=\"_blank\">" + URI + "</a>");				
			}
			
		}		
		#endregion
		
		#region Business rules implementation

		
		protected override void OnPropertyChanged(string propertyName, bool notifyChanges, bool dirtyHandlerOn, SeenObjectCollection callers)
        {
            // This is to avoid infinite loops: in case a caller receives back a property changed notification it has initially sent
            if (callers.GetSeenObject(this) != null)
                return;

            base.OnPropertyChanged(propertyName, notifyChanges, dirtyHandlerOn, callers);
			
            if (!notifyChanges)
                return;

			if (propertyName == "URI")
			{
				OnPropertyChanged("URILink", true, dirtyHandlerOn);
			}

			
			// Push the notification to related objects
			if (GetPlaceToLocationItems(false) != null)
            {
                foreach (var item in GetPlaceToLocationItems(false))
                {
                    item.NotifyPropertyChanged(String.Concat("Place.", propertyName), callers);                    
                }
            }

			if (GetVisitedPlaceItems(false) != null)
            {
                foreach (var item in GetVisitedPlaceItems(false))
                {
                    item.NotifyPropertyChanged(String.Concat("Place.", propertyName), callers);                    
                }
            }

        }		

		#endregion
								
        #region Implementation of IDataObject

	    public override IDataObject Clone()
	    {
	        return Clone(true);
	    }
		
		public override IDataObject Clone(bool recursive)
	    {
	        return new PlaceDataObject(this, recursive);
	    }


		public override bool Compare(IDataObject obj)
		{
			if(!(obj is PlaceDataObject))
				return false;

			var p = (PlaceDataObject) obj;
			var fieldsComparison = true;
			fieldsComparison &= this.Abstract == p.Abstract;
			fieldsComparison &= this.Name == p.Name;
			fieldsComparison &= this.URI == p.URI;
			return fieldsComparison;
		}

		
		#endregion

        public override void AttachEventHandlers()
        {
        }

		public override string PrimaryKeyString
		{
			get
			{
				return $"{URI}";
			}
		}

		// Intended for use only by DataProvider to sync database generated PK to this instance
		public override void AssignPrimaryKey(object pk) 
		{
			this.URI = (System.String)pk;
		}

		public override void OnDeserialized(bool dataset = true)
		{
			OnDataObjectDeserialized();

			if (dataset)
			{
				if (this.ObjectsDataSet != null)
				{
					foreach (var obj in this.ObjectsDataSet.GetAllObjects().OfType<DataObject>().Where(o => o != this))
					{
						obj.OnDeserialized(dataset: false);
					}
				}
			}
		}

		private void OnDataObjectDeserialized()
		{	
        }
	}

	[JsonObject(MemberSerialization.OptIn)]
	public class PlaceCollectionContainer
	{
		[JsonProperty]
		public List<int> InternalObjectIds { get; set; }


		[JsonProperty]
		public List<System.String> PrimaryKeys { get; set; }
	
		[JsonProperty]
		public IObjectsDataSet ObjectsDataSet { get; set; }

		public PlaceCollectionContainer()
		{
		}
		
        public PlaceCollectionContainer(DataObjectCollection<PlaceDataObject> placeItems)
        {
			Construct(placeItems);
		}

		public void Construct(DataObjectCollection<PlaceDataObject> placeItems)
        {
            if (placeItems == null)
                return;
				
			this.PrimaryKeys = placeItems.Select(c => c.PrimaryKey).ToList();
            if (placeItems.ObjectsDataSet == null)
            {
                placeItems.ObjectsDataSet = ApplicationSettings.Container.Resolve<IObjectsDataSet>();
            }
	
			this.InternalObjectIds = placeItems.Select(c => c.InternalObjectId).Cast<int>().ToList();
            this.ObjectsDataSet = placeItems.ObjectsDataSet;
		}

		public DataObjectCollection<PlaceDataObject> ExtractPlaceItems()
        {
			if (InternalObjectIds == null)
				return null;

            var result = new DataObjectCollection<PlaceDataObject> {ObjectsDataSet = this.ObjectsDataSet };

			result.ObjectsDataSet.DirtyHandlerOn = false;
			result.ObjectsDataSet.NotifyChanges = false;


			foreach (var internalObjectId in InternalObjectIds)
            {
                var item = this.ObjectsDataSet.GetObject<PlaceDataObject>(typeof(PlaceDataObject), internalObjectId);
                result.Add(item);
            }

			result.ObjectsDataSet.DirtyHandlerOn = true;
			result.ObjectsDataSet.NotifyChanges = true;
		
            return result;
        }
	}

	// Container classes
	
	[JsonObject(MemberSerialization.OptIn)]
	public class PlaceContainer 
	{

		private ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();

		[JsonProperty]
		public int InternalObjectId { get; set; }

		[JsonProperty]
		public System.String PrimaryKey { get; set; }
		[JsonProperty]
		public IObjectsDataSet ObjectsDataSet { get; set; }
        public PlaceContainer() 
		{
		}

        public PlaceContainer(PlaceDataObject place) 
		{
			Construct(place, false);
		}

        public PlaceContainer(PlaceDataObject place, bool includeDirtyObjectsOnly) 
		{
			Construct(place, includeDirtyObjectsOnly);
		}

		public virtual void Construct(PlaceDataObject place, bool includeDirtyObjectsOnly)
		{
            if (place == null)
                return;

			this.PrimaryKey = place.PrimaryKey;
			
            if (place.ObjectsDataSet == null)
            {
                var dataset = ApplicationSettings.Container.Resolve<IObjectsDataSet>();
                dataset.AddObject(place);
            }

			if(place.ObjectsDataSet == null)
			{
				_logEngine.LogError("Unable to set a dataset to the Entity Place", "Unable to set a dataset to the entity. Container may not be initialized", "PlaceDataObject", null);
				throw new PulpException("Unexpected Error : Unable to set a dataset to the entity : Place");
			}

			if(place.InternalObjectId == null)
			{
				_logEngine.LogError("Unable to construct an object without InternalObjectId in PlaceDataObject", "The Object you are trying to construct doesn't have an InternalObjectId", "PlaceDataObject", null);
				throw new PulpException("Unexpected Error : Unable to construct an object without InternalObjectId in PlaceDataObject");
			}
			this.InternalObjectId = (int) place.InternalObjectId;
			this.ObjectsDataSet = includeDirtyObjectsOnly ? place.ObjectsDataSet.CloneDirtyObjects() : place.ObjectsDataSet;
		}
		
		public PlaceDataObject ExtractPlace()
        {
            if (InternalObjectId == 0)
                return null;

            var result = this.ObjectsDataSet.GetObject<PlaceDataObject>(typeof(PlaceDataObject), InternalObjectId);
            if (result != null)
				result.ObjectsDataSet = this.ObjectsDataSet;
            return result;
        }	
	}
}