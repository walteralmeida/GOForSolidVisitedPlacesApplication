﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict';
	
	/// <summary>
	/// DataObject class for the entity 'Place'.
	/// </summary>
	Solid.Web.Model.DataObjects.PlaceObject = function(rootobject) {
		var self = this;
		
		this._objectType = "Place";
		
		// Dealing with memory
		this.subscriptions = [];
		this.ko_computed = [];
		this.IsReleased = false;

	
		// PlaceObject Data
		this.Data = {
			// PK fields
			URI: ko.observable(null),
			URI_OldValue: ko.observable(null),	
			
			// Relation	fields (navigators + FK temporary keys observable if needed)
			_country_NewObjectId : ko.observable(null),
			Country: function () { return self.getCountry(); },
 			PlaceToLocationItems: function () { return self.getPlaceToLocationItems(); },
 		
			// Other fields
			Abstract: ko.observable(null),
			CountryURI: ko.observable(null),
			CountryURI_OldValue: ko.observable(null), // Keeping track of FK
			Name: ko.observable(null),
			// State attributes
			InternalObjectId: ko.observable(null),

			// IsDirty indicates weither the data objects has to be persisted
			IsDirty: ko.observable(true),
			IsNew: ko.observable(true),
			IsMarkedForDeletion: ko.observable(false)
		};

		// Computed
		this.ko_computed.push(this.Data.PrimaryKey = ko.pureComputed(ComputedPKForPlace, this));

 
		// timezone adjustment
		// Currently not doing anything useful, left in as a placeholder for future expansion (if e.g. we support showing dates in user-specified timezones)
		this.getTimezoneAdjustedDate = function (fieldName, isAbsolute) {
			return GO.GetDisplayDate(self.Data[fieldName](), 0, isAbsolute);
		};

		// Validation control
		this.StatusData = {
			isAbstractValid: ko.observable(true),
			abstractErrorMessage: ko.observable(null), 
			isCountryValid: ko.observable(true),
			countryErrorMessage: ko.observable(null), 
			isCountryURIValid: ko.observable(true),
			countryURIErrorMessage: ko.observable(null), 
			isNameValid: ko.observable(true),
			nameErrorMessage: ko.observable(null), 
			isPlaceToLocationItemsValid: ko.observable(true),
			placeToLocationItemsErrorMessage: ko.observable(null), 
			isURIValid: ko.observable(true),
			uRIErrorMessage: ko.observable(null), 
			
			// Used for Custom Validation Rules
			isPlaceEntityValid: ko.observable(true),
			placeEntityErrorMessage: ko.observable(null),
			errorSummary: ko.observableArray(),
			lastEditedTime: ko.observable(new Date().getTime())
		};

		// Overall validity
		this.ko_computed.push(this.StatusData.isValid = ko.pureComputed(statusDataValidationComputed, this));

		/**********************************/
		/****** ADDITIONNAL FIELDS ********/
		/**********************************/

		// Dataset
		//this.datasetClone = null;
        this.ObjectsDataSet = null;
        this.contextIds = [];
		
		// Dependencies		
        this.isInUpdateDependentCustomValues = false;
        this.DirtyHandlerOn = true;
        this.notifyChangesOn = true;
		this.onPropertyChangedHandlers = [];

		this.initialize();
	};

	// Overriding default toString with the Title field set
	Solid.Web.Model.DataObjects.PlaceObject.prototype.toString = function() {
		return this.Data.Name();
	};

	/****************************************/
    /****** PROPERTY CHANGE HANDLING ********/
    /****************************************/

 
	// DateTime handling
	Solid.Web.Model.DataObjects.PlaceObject.prototype.setDateTimeFromJSON = function(prop, date) {

		if (!date || !date.Date)
			return;

		if (!this.Data[prop])
			return;
 
		this.Data[prop](date.Date);
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.addOnPropertyChangedHandler = function( handler ) {
		this.onPropertyChangedHandlers.push(handler);
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.removeOnPropertyChangedHandler = function( handler ) {
		for (var i = 0; i < this.onPropertyChangedHandlers.length; i++) {
			if (this.onPropertyChangedHandlers[i] === handler) {
				this.onPropertyChangedHandlers.splice(i,1);
				i--;
			}
		}
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.onPropertyChanged = function (propertyName, callers) {
		if (this.notifyChangesOn === false)
			return;

		var localPropertyName = propertyName;
			
		// This is to avoid infinite loops: in case a caller receives back a property changed notification it has initially sent
        if (!callers) {
			callers = [];
		}
			
        var callerIndex = callers.indexOf(this);
		if (callerIndex !== -1)
        {
			return;
        }
			
		callers.push(this);
			
		
		// Push the notification to related objects			
		var placeToLocationItemsItems = this.Data.PlaceToLocationItems();

		if (placeToLocationItemsItems !== null && placeToLocationItemsItems) {
			for (var i=0; i < placeToLocationItemsItems.length; i++) {
				placeToLocationItemsItems[i].onPropertyChanged("Place." + localPropertyName, callers);
			}
		}

		for (var i = 0; i < this.onPropertyChangedHandlers.length; i++) {
			this.onPropertyChangedHandlers[i](localPropertyName);
		}
	};

		
    /*************************/
    /****** RELATIONS ********/
    /*************************/

	Solid.Web.Model.DataObjects.PlaceObject.prototype.getCountry = function () {
		if (!this.ObjectsDataSet)
            return null;

		if(Solid.Web.Model.DataObjects.CountryObject === undefined) {
			// case script not already loaded
			return null;
		}

		var result;
        var countryDataset = this.ObjectsDataSet.getCountryObjectsDataSet();

        if (this.Data._country_NewObjectId() !== null) {                
            result = countryDataset.GetObjectByInternalId(this.Data._country_NewObjectId(), true);
        } else {
            result = countryDataset.GetObjectByPK(this.Data.CountryURI());
        }		

		if (result)
			result.updateDependentValues();

		return result;
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.setCountry = function (valueToSet, notifyChanges, dirtyHandlerOn) {
		var existing_country = null;

		if (((this.Data.CountryURI === null) && this.Data._country_NewObjectId() === null) || this.ObjectsDataSet === null) {
			existing_country = null;
		} else {
			var countryDataset = this.ObjectsDataSet.getCountryObjectsDataSet();

			if (this.Data._country_NewObjectId() === null) {
				existing_country =  countryDataset.GetObjectByPK(this.Data.CountryURI());
			} else {
				existing_country = countryDataset.GetObjectByInternalId(this.Data._country_NewObjectId(), true);
			}				
		}
				
		if (existing_country === valueToSet) {
			return;
        }
		// Setting the navigator desync the FK. The FK should be resync
		if (valueToSet !== null) {
            this.ObjectsDataSet.AddObjectIfDoesNotExist(valueToSet);
				
			if (valueToSet.Data.IsNew()) {
				if (this.Data._country_NewObjectId() !== valueToSet.Data.InternalObjectId()) {
					this.Data._country_NewObjectId(valueToSet.Data.InternalObjectId());
				}
			} else {
				if (this.Data.CountryURI() !== valueToSet.Data.URI()) {
					this.Data._country_NewObjectId(null);

					this.Data.CountryURI(valueToSet.Data.URI());
				}
			}
		} else {
			this.Data.CountryURI(null);
		}
	};
	Solid.Web.Model.DataObjects.PlaceObject.prototype.getPlaceToLocationItems = function () {
		if (!this.ObjectsDataSet)
            return null;

		return this.ObjectsDataSet.GetRelatedObjects(this, "PlaceToLocationItems");							
	};

		
	Solid.Web.Model.DataObjects.PlaceObject.prototype.onPlaceToLocationItemsChanged = function (change, newitems, olditems, dirtyhandlerOn) {
        if (change === "add") {
            for (var i = 0 ; i < newitems.length ;  i++) {
                if (this.Data.IsNew() === true) {
                    newitems[i].Data._place_NewObjectId(this.Data.InternalObjectId());
                } else {
					newitems[i].Data.PlaceURI(this.Data.URI());
              }
            }

			if (newitems.length > 0 && dirtyhandlerOn === true)
				this.Data.IsDirty(true);
        }
        else if (change === "remove") {
            for (var i = 0 ; i < olditems.length ;  i++) {
                if ( olditems[i].Data.IsNew() === true) {
					this.ObjectsDataSet.RemoveObject(olditems[i]);
                }
            }

			if (olditems.length > 0 && dirtyhandlerOn === true)
				this.Data.IsDirty(true);
        }            
    };		

	/*************************/
    /****** VALIDATION *******/
    /*************************/       

	Solid.Web.Model.DataObjects.PlaceObject.prototype.runValidation = function () {
		Solid.Web.Model.DataObjects.Validation.PlaceValidator.validate(this);
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.resetValidation = function () {
		Solid.Web.Model.DataObjects.Validation.PlaceValidator.resetValidation(this);
	};


	/********************/
    /****** MODEL *******/
    /********************/
		
	Solid.Web.Model.DataObjects.PlaceObject.prototype.Clone = function() {
		var clone = new Solid.Web.Model.DataObjects.PlaceObject();
        clone.DirtyHandlerOn = false;
		clone.notifyChangesOn = false;
		clone.Data.InternalObjectId(this.Data.InternalObjectId());

		// Copy all fields
		clone.Data.URI_OldValue(this.Data.URI_OldValue());
		clone.Data.URI(this.Data.URI());
		clone.Data._country_NewObjectId (this.Data._country_NewObjectId());
		clone.Data.Abstract(this.Data.Abstract());
		clone.Data.CountryURI(this.Data.CountryURI());
		clone.Data.CountryURI_OldValue(this.Data.CountryURI_OldValue()),
		clone.Data.Name(this.Data.Name());
		clone.contextIds = this.contextIds;

		clone.Data.IsDirty(this.Data.IsDirty());
		clone.Data.IsNew(this.Data.IsNew());
		clone.Data.IsMarkedForDeletion(this.Data.IsMarkedForDeletion());

        clone.DirtyHandlerOn = true;
		clone.notifyChangesOn = true;

		clone.updateDependentValues();

		return clone;
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.CopyValuesFrom = function(sourceObject) {
        var oldDirtyHandlerOn = this.DirtyHandlerOn;
        var oldNotifyChangesOn = this.notifyChangesOn;
        this.DirtyHandlerOn = false;
		this.notifyChangesOn = false;

		if (sourceObject) {
			this.Data.InternalObjectId(sourceObject.Data.InternalObjectId());

			// Copy all fields
			this.Data.URI_OldValue(sourceObject.Data.URI_OldValue());
			this.Data.URI(sourceObject.Data.URI());
			this.Data._country_NewObjectId (sourceObject.Data._country_NewObjectId());
				this.Data.Abstract(sourceObject.Data.Abstract());
			this.Data.CountryURI(sourceObject.Data.CountryURI());
			this.Data.CountryURI_OldValue(sourceObject.Data.CountryURI_OldValue()),
			this.Data.Name(sourceObject.Data.Name());
			this.contextIds = sourceObject.contextIds;

			this.Data.IsDirty(sourceObject.Data.IsDirty());
			this.Data.IsNew(sourceObject.Data.IsNew());
			this.Data.IsMarkedForDeletion(sourceObject.Data.IsMarkedForDeletion());
		}

        this.DirtyHandlerOn = oldDirtyHandlerOn;
        this.notifyChangesOn = oldNotifyChangesOn;

		this.updateDependentValues();
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.updateDependentCustomValues = function () {
		if (this.isInUpdateDependentCustomValues === true || !this.notifyChangesOn)
		    return;
			
		this.isInUpdateDependentCustomValues = true;			
		this.isInUpdateDependentCustomValues = false;
	};
		
	Solid.Web.Model.DataObjects.PlaceObject.prototype.updateDependentValues = function() {
		if (!this.notifyChangesOn)
			return;
	};

	/*****************************/
    /****** INITIALIZATION *******/
    /*****************************/

	Solid.Web.Model.DataObjects.PlaceObject.prototype.initialize = function() {

		// Subscriptions
		this.subscriptions.push(this.Data.IsDirty.subscribe(isDirtySubscriptionHandler, this));
		this.subscriptions.push(this.Data.IsMarkedForDeletion.subscribe(isMarkedForDeletionSubscriptionHandler, this));
		this.subscriptions.push(this.Data.Abstract.subscribe(AbstractPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.CountryURI.subscribe(CountryURIPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.Name.subscribe(NamePropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.URI.subscribe(URIPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data._country_NewObjectId.subscribe(countryNewObjectSubscriptionHandler, this));

 
		this.updateDependentValues();
	};

	Solid.Web.Model.DataObjects.PlaceObject.prototype.release = function() {			
		if (this.IsReleased)
			return;

		this.IsReleased = true;

		var i;
		for (i = 0; i < this.ko_computed.length; i++) {
			this.ko_computed[i].dispose();
		}
		
		for (i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].dispose();
		}

		// Resetting arrays for GC
		this.ko_computed = [];
		this.subscriptions = [];
	};


	/***************************************************************/
    /****** "PRIVATE" methods, FOR SUBSCRIPTIONS / COMPUTED ********/
    /***************************************************************/
		
	/// Computed functions
		
	function ComputedPKForPlace() {
		return this.Data.URI();
	}	 
	
	function statusDataValidationComputed() {
		var isValid = true;
		isValid = isValid && this.StatusData.isAbstractValid() && this.StatusData.isNameValid() && this.StatusData.isURIValid() && this.StatusData.isPlaceEntityValid();
		isValid = isValid && this.StatusData.isCountryValid();
		return isValid;
	}

	
	/// Subscription handler
	function isDirtySubscriptionHandler(newValue) {
		if (newValue === true && this.ObjectsDataSet) {
			this.ObjectsDataSet.setContextIdsDirty(this.contextIds);
		}		
	}

	function isMarkedForDeletionSubscriptionHandler(newValue) {
		this.Data.IsDirty(true);
	}
			

	function AbstractPropertySubscriptionHandler(newValue) {
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("Abstract");
		}
    }

	function CountryURIPropertySubscriptionHandler(newValue) {
		if (this.Data.CountryURI_OldValue() !== newValue && this.ObjectsDataSet) {
			this.ObjectsDataSet.getPlaceObjectsDataSet().UpdateCountryFKIndex(this.Data.CountryURI_OldValue(), newValue, this);            
		}
		this.Data.CountryURI_OldValue(newValue);
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("CountryURI");
			this.onPropertyChanged("Country");
		}
    }

	function NamePropertySubscriptionHandler(newValue) {
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("Name");
		}
    }

	function URIPropertySubscriptionHandler(newValue) {
		// PK Changed => update dataset internalId table (don't do it if new object)
		if (this.Data.IsNew() === false && !this.isDataSetCopy && this.Data.URI_OldValue() !== newValue) {
			if (this.ObjectsDataSet) {
				this.ObjectsDataSet.getPlaceObjectsDataSet().placeObjectInternalIds[newValue] = this.ObjectsDataSet.getPlaceObjectsDataSet().placeObjectInternalIds[this.Data.URI_OldValue()];
				delete this.ObjectsDataSet.getPlaceObjectsDataSet().placeObjectInternalIds[this.Data.URI_OldValue()];
			}
		}
		
		this.Data.URI_OldValue(newValue);
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("URI");
		}
    }

	function countryNewObjectSubscriptionHandler(newValue) {
		if (this.DirtyHandlerOn === true) 			
            this.Data.IsDirty(true);

		if (this.notifyChangesOn === true) {	
			this.onPropertyChanged("Country");
		}
    }
 


 



	/*************************/
    /****** FACTORY **********/
    /*************************/

    Solid.Web.Model.DataObjects.PlaceObjectFactory = {
        createNew: function (objectsDataSet, contextId) {
            // if there is a custom implementation => call it
			if (Solid.Web.Model.DataObjects.PlaceObjectFactoryCustom) {
                return Solid.Web.Model.DataObjects.PlaceObjectFactoryCustom.createNew(objectsDataSet, contextId);
            }
            else {
                var newObject = new Solid.Web.Model.DataObjects.PlaceObject();

                if (contextId) {
                    newObject.contextIds.push(contextId);
                }

                if (objectsDataSet) {
                    objectsDataSet.AddObject(newObject);

					if (contextId)
						objectsDataSet.setContextIdsDirty(newObject.contextIds);

                }

                return newObject;
            }
        }
    };

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjects/PlaceObject.js");

} ());