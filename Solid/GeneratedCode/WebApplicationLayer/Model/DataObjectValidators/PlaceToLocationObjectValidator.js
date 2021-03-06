﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict'
	/// <summary>
	/// DataObject Validator object for 'PlaceToLocation'.
	/// Contains a set of method to validate the given object
	/// </summary>	
	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator = {};

	if(Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidatorCustom !== undefined) {
		Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator = new Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidatorCustom(self);
	}

	/***********************************/
    /****** VALIDATORS FOR FIELDS ******/
    /***********************************/    


	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validateLocation = function (dataobject) {
      if(dataobject.Data.Location() == undefined || dataobject.Data.Location() == null || dataobject.Data.Location() === "")
		{
			dataobject.StatusData.isLocationValid(false);
			dataobject.StatusData.locationErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Location"));
		}
		else {
			dataobject.StatusData.isLocationValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validatePlace = function (dataobject) {
      if(dataobject.Data.Place() == undefined || dataobject.Data.Place() == null || dataobject.Data.Place() === "")
		{
			dataobject.StatusData.isPlaceValid(false);
			dataobject.StatusData.placeErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Place"));
		}
		else {
			dataobject.StatusData.isPlaceValid(true);
		}
	};


	/***************************************/
    /****** VALIDATORS FOR RELATIONS ******/
    /**************************************/

	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validateLocation = function (dataobject) {
		var isValid = true;
		if ((dataobject.Data.LocationURI() === undefined || dataobject.Data.LocationURI() === null || dataobject.Data.LocationURI() === "") && dataobject.Data._location_NewObjectId() === null) {
			dataobject.StatusData.isLocationValid(false);
			dataobject.StatusData.locationErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Location"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isLocationValid(true);
			dataobject.StatusData.locationErrorMessage(null);
		}							
	};

	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validatePlace = function (dataobject) {
		var isValid = true;
		if ((dataobject.Data.PlaceURI() === undefined || dataobject.Data.PlaceURI() === null || dataobject.Data.PlaceURI() === "") && dataobject.Data._place_NewObjectId() === null) {
			dataobject.StatusData.isPlaceValid(false);
			dataobject.StatusData.placeErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Place"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isPlaceValid(true);
			dataobject.StatusData.placeErrorMessage(null);
		}							
	};

 	
	/******************************/
    /****** GLOBAL VALIDATOR ******/
    /******************************/

	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validate = function(dataobject) {

		var doContinue = true;
		var isValid = true;
		var errorMessage = "";

		if(Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator.validate !== undefined) {
			// A Custom Validator to override / add some validations.
			doContinue = Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator.validate(dataobject);
		}
		if(!doContinue)
			return;

		Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validateLocation (dataobject);
		Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validatePlace (dataobject);
		Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validateLocation(dataobject);
		Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.validatePlace(dataobject);
		doContinue = true;
		if(Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator.CustomValidation !== undefined){
			Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator.CustomValidation(dataobject);
		}


		dataobject.StatusData.errorSummary.removeAll();
	    if (dataobject.StatusData.isLocationValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.locationErrorMessage());
		}
	    if (dataobject.StatusData.isPlaceValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.placeErrorMessage());
		}
	        
		if (dataobject.StatusData.isLocationValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.locationErrorMessage());
		}			
	        
		if (dataobject.StatusData.isPlaceValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.placeErrorMessage());
		}			
		
		if(dataobject.StatusData.isPlaceToLocationEntityValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.placeToLocationEntityErrorMessage());
		}

		if(Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator.OnAfterValidate !== undefined){
			Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.CustomValidator.OnAfterValidate();
		}	
	};

	Solid.Web.Model.DataObjects.Validation.PlaceToLocationValidator.resetValidation = function(dataobject) {

		dataobject.StatusData.isLocationValid(true);
		dataobject.StatusData.locationErrorMessage(null);
		dataobject.StatusData.isPlaceValid(true);
		dataobject.StatusData.placeErrorMessage(null);
		
		dataobject.StatusData.isPlaceToLocationEntityValid(true);
		dataobject.StatusData.placeToLocationEntityErrorMessage(null);
		dataobject.StatusData.errorSummary.removeAll();
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjectValidators/PlaceToLocationObjectValidator.js");

} ());