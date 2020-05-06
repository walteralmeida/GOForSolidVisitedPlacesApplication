﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict';
	
	/// <summary>
	/// DataObject class for the entity 'VisitedPlace'.
	/// </summary>
	Solid.Web.Model.DataObjects.VisitedPlaceObject = function(rootobject) {
		var self = this;
		
		this._objectType = "VisitedPlace";
		
		// Dealing with memory
		this.subscriptions = [];
		this.ko_computed = [];
		this.IsReleased = false;

	
		// VisitedPlaceObject Data
		this.Data = {
			// PK fields
			Id: ko.observable(Math.uuid()),
			Id_OldValue: ko.observable(Math.uuid()),	
			
			// Relation	fields (navigators + FK temporary keys observable if needed)
			_country_NewObjectId : ko.observable(null),
			_place_NewObjectId : ko.observable(null),
			_userProfile_NewObjectId : ko.observable(null),
			Country: function () { return self.getCountry(); },
 			Place: function () { return self.getPlace(); },
 			UserProfile: function () { return self.getUserProfile(); },
 		
			// Other fields
			CountryURI: ko.observable(null),
			CountryURI_OldValue: ko.observable(null), // Keeping track of FK
			Date: ko.observable(),
			Description: ko.observable(null),
			PlaceURI: ko.observable(null),
			PlaceURI_OldValue: ko.observable(null), // Keeping track of FK
			Typeofplace: ko.observable(0),
			TypeofplaceDisplayString: ko.observable(Solid.Web.Model.DataObjects.PlaceTypesEnum[0]),
			UserProfileUri: ko.observable(null),
			UserProfileUri_OldValue: ko.observable(null), // Keeping track of FK
			// State attributes
			InternalObjectId: ko.observable(null),

			// IsDirty indicates weither the data objects has to be persisted
			IsDirty: ko.observable(true),
			IsNew: ko.observable(true),
			IsMarkedForDeletion: ko.observable(false)
		};

		// Calculated fields
		this.Data.VisitedPlaceName = ko.observable(null);
		// Enumerations
				this.Data.placeTypesValues = ko.observableArray([0, 1]);

		this.Data.TypeofplaceValues = ko.observableArray([{ selectvalue : 0, visible: ko.observable(true) }, { selectvalue : 1, visible: ko.observable(true) }]);		
			
			this.TypeofplaceOptionsAfterRender = function (option, item) {
				// implement in custom TypeofplaceOptionsAfterRenderCustom if you want post render control
				if (self.TypeofplaceOptionsAfterRenderCustom) {
					self.TypeofplaceOptionsAfterRenderCustom(option, item);
				}
				else {
		            ko.applyBindingsToNode(option, { visible: item.visible }, item);
				}
			};
            this.Data.placeTypesValues.subscribe(function (changes) {
                for (var i = 0; i < changes.length; i++) {
                    if (changes[i].moved != undefined) {
                        // we don't treat moves ....
						continue;
                    }
                    if (changes[i].status == "deleted") {
                        for (var j = 0; j < self.Data.TypeofplaceValues().length; j++) {
                            if (self.Data.TypeofplaceValues()[j].selectvalue == changes[i].value) {
                                self.Data.TypeofplaceValues()[j].visible(false);
                            }
                        };                            
                    }
                    else if (changes[i].status == "added") {
                        for (var j = 0; j < self.Data.TypeofplaceValues().length; j++) {
                            if (self.Data.TypeofplaceValues()[j].selectvalue == changes[i].value) {
                                self.Data.TypeofplaceValues()[j].visible(true);
                            }
                        };                            
                    }
                }
            }, null, "arrayChange");


		// Computed
		this.ko_computed.push(this.Data.PrimaryKey = ko.pureComputed(ComputedPKForVisitedPlace, this));

		this.ko_computed.push(this.Data.Date_DisplayString = ko.pureComputed(formatDateForDate, this));	
		this.ko_computed.push(this.Data.Date_WithTimeDisplayString = ko.pureComputed(formatDateForDateWithTime, this));
 
		// timezone adjustment
		// Currently not doing anything useful, left in as a placeholder for future expansion (if e.g. we support showing dates in user-specified timezones)
		this.getTimezoneAdjustedDate = function (fieldName, isAbsolute) {
			return GO.GetDisplayDate(self.Data[fieldName](), 0, isAbsolute);
		};

		// Validation control
		this.StatusData = {
			isCountryValid: ko.observable(true),
			countryErrorMessage: ko.observable(null), 
			isCountryURIValid: ko.observable(true),
			countryURIErrorMessage: ko.observable(null), 
			isDateValid: ko.observable(true),
			dateErrorMessage: ko.observable(null), 
			isDescriptionValid: ko.observable(true),
			descriptionErrorMessage: ko.observable(null), 
			isIdValid: ko.observable(true),
			idErrorMessage: ko.observable(null), 
			isPlaceValid: ko.observable(true),
			placeErrorMessage: ko.observable(null), 
			isPlaceURIValid: ko.observable(true),
			placeURIErrorMessage: ko.observable(null), 
			isTypeofplaceValid: ko.observable(true),
			typeofplaceErrorMessage: ko.observable(null), 
			isUserProfileValid: ko.observable(true),
			userProfileErrorMessage: ko.observable(null), 
			isUserProfileUriValid: ko.observable(true),
			userProfileUriErrorMessage: ko.observable(null), 
			IsCountryVisible: ko.observable(),
			IsPlaceVisible: ko.observable(),
			
			// Used for Custom Validation Rules
			isVisitedPlaceEntityValid: ko.observable(true),
			visitedPlaceEntityErrorMessage: ko.observable(null),
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

 
	// DateTime handling
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.setDateTimeFromJSON = function(prop, date) {

		if (!date || !date.Date)
			return;

		if (!this.Data[prop])
			return;
 
		// Date is received from server as UTC (timezone offset information is 'lost' currently)
		// So offset from UTC using the local timezone offset had the offset been applied 'at the time' the date was set
		if (prop === "Date") {
			date.Date = date.Date.addMinutes(-date.Date.getTimezoneOffset());
		}
 
		this.Data[prop](date.Date);
	};

	// Triggers for Business Rules IsVisible dependency
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.updateIsCountryVisibleValue = function() {
		this.StatusData.IsCountryVisible((this.Data.Typeofplace() == 1));
	};
		
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.updateIsPlaceVisibleValue = function() {
		this.StatusData.IsPlaceVisible((this.Data.Typeofplace() == 0));
	};
		
	// Triggers for calculated fields 
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.updateVisitedPlaceNameValue = function() {
		var newValue = ((this.Data.Typeofplace() == 1) ? (this.getCountry() !== null && !!this.getCountry().Data.Name() ? this.getCountry().Data.Name() : '') : (this.getPlace() !== null && !!this.getPlace().Data.Name() ? this.getPlace().Data.Name() : ''));
		
		if (newValue !== this.Data.VisitedPlaceName())
			this.Data.VisitedPlaceName(newValue);
	};
		
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.addOnPropertyChangedHandler = function( handler ) {
		this.onPropertyChangedHandlers.push(handler);
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.removeOnPropertyChangedHandler = function( handler ) {
		for (var i = 0; i < this.onPropertyChangedHandlers.length; i++) {
			if (this.onPropertyChangedHandlers[i] === handler) {
				this.onPropertyChangedHandlers.splice(i,1);
				i--;
			}
		}
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.onPropertyChanged = function (propertyName, callers) {
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
			
		if (localPropertyName == "Typeofplace")
		{
			this.updateIsCountryVisibleValue();
			this.updateIsPlaceVisibleValue();
			this.updateVisitedPlaceNameValue();
		}
		if (localPropertyName == "Country.Name")
		{
			this.updateVisitedPlaceNameValue();
		}
		if (localPropertyName == "Place.Name")
		{
			this.updateVisitedPlaceNameValue();
		}
		if (localPropertyName == "Country")
		{
			this.updateVisitedPlaceNameValue();
		}
		if (localPropertyName == "Place")
		{
			this.updateVisitedPlaceNameValue();
		}
		
		// Push the notification to related objects			
		for (var i = 0; i < this.onPropertyChangedHandlers.length; i++) {
			this.onPropertyChangedHandlers[i](localPropertyName);
		}
	};

		
    /*************************/
    /****** RELATIONS ********/
    /*************************/

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.getCountry = function () {
		if (!this.ObjectsDataSet)
            return null;

		if ((!this.Data.CountryURI()) && this.Data._country_NewObjectId() === null)
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

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.setCountry = function (valueToSet, notifyChanges, dirtyHandlerOn) {
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
          if (valueToSet === null) {
				this.Data._country_NewObjectId(null);
				this.Data.CountryURI(null);
				}
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
			this.Data._country_NewObjectId(null);			
			this.Data.CountryURI(null);
		}
	};
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.getPlace = function () {
		if (!this.ObjectsDataSet)
            return null;

		if ((!this.Data.PlaceURI()) && this.Data._place_NewObjectId() === null)
			return null;

		if(Solid.Web.Model.DataObjects.PlaceObject === undefined) {
			// case script not already loaded
			return null;
		}

		var result;
        var placeDataset = this.ObjectsDataSet.getPlaceObjectsDataSet();

        if (this.Data._place_NewObjectId() !== null) {                
            result = placeDataset.GetObjectByInternalId(this.Data._place_NewObjectId(), true);
        } else {
            result = placeDataset.GetObjectByPK(this.Data.PlaceURI());
        }		

		if (result)
			result.updateDependentValues();

		return result;
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.setPlace = function (valueToSet, notifyChanges, dirtyHandlerOn) {
		var existing_place = null;

		if (((this.Data.PlaceURI === null) && this.Data._place_NewObjectId() === null) || this.ObjectsDataSet === null) {
			existing_place = null;
		} else {
			var placeDataset = this.ObjectsDataSet.getPlaceObjectsDataSet();

			if (this.Data._place_NewObjectId() === null) {
				existing_place =  placeDataset.GetObjectByPK(this.Data.PlaceURI());
			} else {
				existing_place = placeDataset.GetObjectByInternalId(this.Data._place_NewObjectId(), true);
			}				
		}
				
		if (existing_place === valueToSet) {
          if (valueToSet === null) {
				this.Data._place_NewObjectId(null);
				this.Data.PlaceURI(null);
				}
			return;
        }
		// Setting the navigator desync the FK. The FK should be resync
		if (valueToSet !== null) {
            this.ObjectsDataSet.AddObjectIfDoesNotExist(valueToSet);
				
			if (valueToSet.Data.IsNew()) {
				if (this.Data._place_NewObjectId() !== valueToSet.Data.InternalObjectId()) {
					this.Data._place_NewObjectId(valueToSet.Data.InternalObjectId());
				}
			} else {
				if (this.Data.PlaceURI() !== valueToSet.Data.URI()) {
					this.Data._place_NewObjectId(null);

					this.Data.PlaceURI(valueToSet.Data.URI());
				}
			}
		} else {
			this.Data._place_NewObjectId(null);			
			this.Data.PlaceURI(null);
		}
	};
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.getUserProfile = function () {
		if (!this.ObjectsDataSet)
            return null;

		if(Solid.Web.Model.DataObjects.UserProfileObject === undefined) {
			// case script not already loaded
			return null;
		}

		var result;
        var userProfileDataset = this.ObjectsDataSet.getUserProfileObjectsDataSet();

        if (this.Data._userProfile_NewObjectId() !== null) {                
            result = userProfileDataset.GetObjectByInternalId(this.Data._userProfile_NewObjectId(), true);
        } else {
            result = userProfileDataset.GetObjectByPK(this.Data.UserProfileUri());
        }		

		if (result)
			result.updateDependentValues();

		return result;
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.setUserProfile = function (valueToSet, notifyChanges, dirtyHandlerOn) {
		var existing_userProfile = null;

		if (((this.Data.UserProfileUri === null) && this.Data._userProfile_NewObjectId() === null) || this.ObjectsDataSet === null) {
			existing_userProfile = null;
		} else {
			var userProfileDataset = this.ObjectsDataSet.getUserProfileObjectsDataSet();

			if (this.Data._userProfile_NewObjectId() === null) {
				existing_userProfile =  userProfileDataset.GetObjectByPK(this.Data.UserProfileUri());
			} else {
				existing_userProfile = userProfileDataset.GetObjectByInternalId(this.Data._userProfile_NewObjectId(), true);
			}				
		}
				
		if (existing_userProfile === valueToSet) {
			return;
        }
		// Setting the navigator desync the FK. The FK should be resync
		if (valueToSet !== null) {
            this.ObjectsDataSet.AddObjectIfDoesNotExist(valueToSet);
				
			if (valueToSet.Data.IsNew()) {
				if (this.Data._userProfile_NewObjectId() !== valueToSet.Data.InternalObjectId()) {
					this.Data._userProfile_NewObjectId(valueToSet.Data.InternalObjectId());
				}
			} else {
				if (this.Data.UserProfileUri() !== valueToSet.Data.Uri()) {
					this.Data._userProfile_NewObjectId(null);

					this.Data.UserProfileUri(valueToSet.Data.Uri());
				}
			}
		} else {
			this.Data.UserProfileUri(null);
		}
	};

	/*************************/
    /****** VALIDATION *******/
    /*************************/       

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.runValidation = function () {
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validate(this);
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.resetValidation = function () {
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.resetValidation(this);
	};


	/********************/
    /****** MODEL *******/
    /********************/
		
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.Clone = function() {
		var clone = new Solid.Web.Model.DataObjects.VisitedPlaceObject();
        clone.DirtyHandlerOn = false;
		clone.notifyChangesOn = false;
		clone.Data.InternalObjectId(this.Data.InternalObjectId());

		// Copy all fields
		clone.Data.Id_OldValue(this.Data.Id_OldValue());
		clone.Data.Id(this.Data.Id());
		clone.Data._country_NewObjectId (this.Data._country_NewObjectId());
		clone.Data._place_NewObjectId (this.Data._place_NewObjectId());
		clone.Data._userProfile_NewObjectId (this.Data._userProfile_NewObjectId());
		clone.Data.CountryURI(this.Data.CountryURI());
		clone.Data.CountryURI_OldValue(this.Data.CountryURI_OldValue()),
		clone.Data.Date(this.Data.Date());
		clone.Data.Description(this.Data.Description());
		clone.Data.PlaceURI(this.Data.PlaceURI());
		clone.Data.PlaceURI_OldValue(this.Data.PlaceURI_OldValue()),
		clone.Data.Typeofplace(this.Data.Typeofplace());
		clone.Data.UserProfileUri(this.Data.UserProfileUri());
		clone.Data.UserProfileUri_OldValue(this.Data.UserProfileUri_OldValue()),
		clone.contextIds = this.contextIds;

		clone.Data.IsDirty(this.Data.IsDirty());
		clone.Data.IsNew(this.Data.IsNew());
		clone.Data.IsMarkedForDeletion(this.Data.IsMarkedForDeletion());

        clone.DirtyHandlerOn = true;
		clone.notifyChangesOn = true;

		clone.updateDependentValues();

		return clone;
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.CopyValuesFrom = function(sourceObject) {
        var oldDirtyHandlerOn = this.DirtyHandlerOn;
        var oldNotifyChangesOn = this.notifyChangesOn;
        this.DirtyHandlerOn = false;
		this.notifyChangesOn = false;

		if (sourceObject) {
			this.Data.InternalObjectId(sourceObject.Data.InternalObjectId());

			// Copy all fields
			this.Data.Id_OldValue(sourceObject.Data.Id_OldValue());
			this.Data.Id(sourceObject.Data.Id());
			this.Data._country_NewObjectId (sourceObject.Data._country_NewObjectId());
			this.Data._place_NewObjectId (sourceObject.Data._place_NewObjectId());
			this.Data._userProfile_NewObjectId (sourceObject.Data._userProfile_NewObjectId());
			this.Data.CountryURI(sourceObject.Data.CountryURI());
			this.Data.CountryURI_OldValue(sourceObject.Data.CountryURI_OldValue()),
			this.Data.Date(sourceObject.Data.Date());
			this.Data.Description(sourceObject.Data.Description());
			this.Data.PlaceURI(sourceObject.Data.PlaceURI());
			this.Data.PlaceURI_OldValue(sourceObject.Data.PlaceURI_OldValue()),
			this.Data.Typeofplace(sourceObject.Data.Typeofplace());
			this.Data.UserProfileUri(sourceObject.Data.UserProfileUri());
			this.Data.UserProfileUri_OldValue(sourceObject.Data.UserProfileUri_OldValue()),
			this.contextIds = sourceObject.contextIds;

			this.Data.IsDirty(sourceObject.Data.IsDirty());
			this.Data.IsNew(sourceObject.Data.IsNew());
			this.Data.IsMarkedForDeletion(sourceObject.Data.IsMarkedForDeletion());
		}

        this.DirtyHandlerOn = oldDirtyHandlerOn;
        this.notifyChangesOn = oldNotifyChangesOn;

		this.updateDependentValues();
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.updateDependentCustomValues = function () {
		if (this.isInUpdateDependentCustomValues === true || !this.notifyChangesOn)
		    return;
			
		this.isInUpdateDependentCustomValues = true;			
		this.isInUpdateDependentCustomValues = false;
	};
		
	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.updateDependentValues = function() {
		if (!this.notifyChangesOn)
			return;
		
		// Initialize Business Rules Visibility
		this.updateIsCountryVisibleValue();		
		this.updateIsPlaceVisibleValue();		
		
		// Computed data object properties
		this.updateVisitedPlaceNameValue();		
		this.updateDependentCustomValues();
	};

	/*****************************/
    /****** INITIALIZATION *******/
    /*****************************/

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.initialize = function() {

		// Subscriptions
		this.subscriptions.push(this.Data.IsDirty.subscribe(isDirtySubscriptionHandler, this));
		this.subscriptions.push(this.Data.IsMarkedForDeletion.subscribe(isMarkedForDeletionSubscriptionHandler, this));
		this.subscriptions.push(this.Data.CountryURI.subscribe(CountryURIPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.Date.subscribe(DatePropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.Description.subscribe(DescriptionPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.Id.subscribe(IdPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.PlaceURI.subscribe(PlaceURIPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.Typeofplace.subscribe(TypeofplacePropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.UserProfileUri.subscribe(UserProfileUriPropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.VisitedPlaceName.subscribe(VisitedPlaceNamePropertySubscriptionHandler, this));
		this.subscriptions.push(this.Data.Typeofplace.subscribe(TypeofplaceEnumSubscriptionHandler, this));
		this.subscriptions.push(this.Data._country_NewObjectId.subscribe(countryNewObjectSubscriptionHandler, this));
		this.subscriptions.push(this.Data._place_NewObjectId.subscribe(placeNewObjectSubscriptionHandler, this));
		this.subscriptions.push(this.Data._userProfile_NewObjectId.subscribe(userProfileNewObjectSubscriptionHandler, this));

 
		this.updateDependentValues();
	};

	Solid.Web.Model.DataObjects.VisitedPlaceObject.prototype.release = function() {			
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
		
	function ComputedPKForVisitedPlace() {
		return this.Data.Id();
	}	 
	
	function statusDataValidationComputed() {
		var isValid = true;
		isValid = isValid && this.StatusData.isDateValid() && this.StatusData.isDescriptionValid() && this.StatusData.isIdValid() && this.StatusData.isTypeofplaceValid() && this.StatusData.isVisitedPlaceEntityValid();
		isValid = isValid && this.StatusData.isCountryValid() && this.StatusData.isPlaceValid() && this.StatusData.isUserProfileValid();
		return isValid;
	}

	function formatDateForDate() { return GO.DateToString(this.getTimezoneAdjustedDate("Date", false), false); }	
	function formatDateForDateWithTime() { return GO.DateToString(this.getTimezoneAdjustedDate("Date", false), true); }
	
	/// Subscription handler
	function isDirtySubscriptionHandler(newValue) {
		if (newValue === true && this.ObjectsDataSet) {
			this.ObjectsDataSet.setContextIdsDirty(this.contextIds);
		}		
	}

	function isMarkedForDeletionSubscriptionHandler(newValue) {
		this.Data.IsDirty(true);
	}
			
	function TypeofplaceEnumSubscriptionHandler(newValue) {
		this.Data.TypeofplaceDisplayString(Solid.Web.Model.DataObjects.PlaceTypesEnum[this.Data.Typeofplace()]);
	};	
	

	function CountryURIPropertySubscriptionHandler(newValue) {
		if (this.Data.CountryURI_OldValue() !== newValue && this.ObjectsDataSet) {
			this.ObjectsDataSet.getVisitedPlaceObjectsDataSet().UpdateCountryFKIndex(this.Data.CountryURI_OldValue(), newValue, this);            
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

	function DatePropertySubscriptionHandler(newValue) {
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("Date");
		}
    }

	function DescriptionPropertySubscriptionHandler(newValue) {
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("Description");
		}
    }

	function IdPropertySubscriptionHandler(newValue) {
		// PK Changed => update dataset internalId table (don't do it if new object)
		if (this.Data.IsNew() === false && !this.isDataSetCopy && this.Data.Id_OldValue() !== newValue) {
			if (this.ObjectsDataSet) {
				this.ObjectsDataSet.getVisitedPlaceObjectsDataSet().visitedPlaceObjectInternalIds[newValue] = this.ObjectsDataSet.getVisitedPlaceObjectsDataSet().visitedPlaceObjectInternalIds[this.Data.Id_OldValue()];
				delete this.ObjectsDataSet.getVisitedPlaceObjectsDataSet().visitedPlaceObjectInternalIds[this.Data.Id_OldValue()];
			}
		}
		
		this.Data.Id_OldValue(newValue);
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("Id");
		}
    }

	function PlaceURIPropertySubscriptionHandler(newValue) {
		if (this.Data.PlaceURI_OldValue() !== newValue && this.ObjectsDataSet) {
			this.ObjectsDataSet.getVisitedPlaceObjectsDataSet().UpdatePlaceFKIndex(this.Data.PlaceURI_OldValue(), newValue, this);            
		}
		this.Data.PlaceURI_OldValue(newValue);
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("PlaceURI");
			this.onPropertyChanged("Place");
		}
    }

	function TypeofplacePropertySubscriptionHandler(newValue) {
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("Typeofplace");
		}
    }

	function UserProfileUriPropertySubscriptionHandler(newValue) {
		if (this.Data.UserProfileUri_OldValue() !== newValue && this.ObjectsDataSet) {
			this.ObjectsDataSet.getVisitedPlaceObjectsDataSet().UpdateUserProfileFKIndex(this.Data.UserProfileUri_OldValue(), newValue, this);            
		}
		this.Data.UserProfileUri_OldValue(newValue);
		
		if (this.DirtyHandlerOn) {			
            this.Data.IsDirty(true);
		}
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("UserProfileUri");
			this.onPropertyChanged("UserProfile");
		}
    }

	function VisitedPlaceNamePropertySubscriptionHandler(newValue) {
		
 
		if (this.notifyChangesOn) {		
			this.updateDependentCustomValues();
			this.onPropertyChanged("VisitedPlaceName");
		}
    }

	function countryNewObjectSubscriptionHandler(newValue) {
		if (this.DirtyHandlerOn === true) 			
            this.Data.IsDirty(true);

		if (this.notifyChangesOn === true) {	
			this.onPropertyChanged("Country");
		}
    }
 


	function placeNewObjectSubscriptionHandler(newValue) {
		if (this.DirtyHandlerOn === true) 			
            this.Data.IsDirty(true);

		if (this.notifyChangesOn === true) {	
			this.onPropertyChanged("Place");
		}
    }
 


	function userProfileNewObjectSubscriptionHandler(newValue) {
		if (this.DirtyHandlerOn === true) 			
            this.Data.IsDirty(true);

		if (this.notifyChangesOn === true) {	
			this.onPropertyChanged("UserProfile");
		}
    }
 



	/*************************/
    /****** FACTORY **********/
    /*************************/

    Solid.Web.Model.DataObjects.VisitedPlaceObjectFactory = {
        createNew: function (objectsDataSet, contextId) {
            // if there is a custom implementation => call it
			if (Solid.Web.Model.DataObjects.VisitedPlaceObjectFactoryCustom) {
                return Solid.Web.Model.DataObjects.VisitedPlaceObjectFactoryCustom.createNew(objectsDataSet, contextId);
            }
            else {
                var newObject = new Solid.Web.Model.DataObjects.VisitedPlaceObject();

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
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjects/VisitedPlaceObject.js");

} ());