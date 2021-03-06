﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict'
	/// <summary>
	/// DataObject Validator object for 'VisitedPlace'.
	/// Contains a set of method to validate the given object
	/// </summary>	
	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator = {};

	if(Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidatorCustom !== undefined) {
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator = new Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidatorCustom(self);
	}

	/***********************************/
    /****** VALIDATORS FOR FIELDS ******/
    /***********************************/    


	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateDate = function (dataobject) {
      if(dataobject.Data.Date() == undefined || dataobject.Data.Date() == null || dataobject.Data.Date() === "")
		{
			dataobject.StatusData.isDateValid(false);
			dataobject.StatusData.dateErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Date"));
		}
		else {
			dataobject.StatusData.isDateValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateDescription = function (dataobject) {
		// Max Length
		if(dataobject.Data.Description() != null && dataobject.Data.Description().length > 500)
		{
			dataobject.StatusData.isDescriptionValid(false);
			dataobject.StatusData.descriptionErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Description").replace(/%LENGTH%/g, "500"));
		}
		else {
			dataobject.StatusData.isDescriptionValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateId = function (dataobject) {
      if(dataobject.Data.Id() == undefined || dataobject.Data.Id() == null || dataobject.Data.Id() === "")
		{
			dataobject.StatusData.isIdValid(false);
			dataobject.StatusData.idErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Id"));
		}
		else {
			dataobject.StatusData.isIdValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateTypeofplace = function (dataobject) {
      if(dataobject.Data.Typeofplace() == undefined || dataobject.Data.Typeofplace() == null || dataobject.Data.Typeofplace() === "")
		{
			dataobject.StatusData.isTypeofplaceValid(false);
			dataobject.StatusData.typeofplaceErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Type of place"));
		}
		else {
			dataobject.StatusData.isTypeofplaceValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateUserProfile = function (dataobject) {
      if(dataobject.Data.UserProfile() == undefined || dataobject.Data.UserProfile() == null || dataobject.Data.UserProfile() === "")
		{
			dataobject.StatusData.isUserProfileValid(false);
			dataobject.StatusData.userProfileErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "UserProfile"));
		}
		else {
			dataobject.StatusData.isUserProfileValid(true);
		}
	};


	/***************************************/
    /****** VALIDATORS FOR RELATIONS ******/
    /**************************************/

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateUserProfile = function (dataobject) {
		var isValid = true;
		if ((dataobject.Data.UserProfileUri() === undefined || dataobject.Data.UserProfileUri() === null || dataobject.Data.UserProfileUri() === "") && dataobject.Data._userProfile_NewObjectId() === null) {
			dataobject.StatusData.isUserProfileValid(false);
			dataobject.StatusData.userProfileErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "UserProfile"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isUserProfileValid(true);
			dataobject.StatusData.userProfileErrorMessage(null);
		}							
	};

 	
	/******************************/
    /****** GLOBAL VALIDATOR ******/
    /******************************/

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validate = function(dataobject) {

		var doContinue = true;
		var isValid = true;
		var errorMessage = "";

		if(Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator.validate !== undefined) {
			// A Custom Validator to override / add some validations.
			doContinue = Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator.validate(dataobject);
		}
		if(!doContinue)
			return;

		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateDate (dataobject);
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateDescription (dataobject);
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateId (dataobject);
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateTypeofplace (dataobject);
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateUserProfile (dataobject);
		Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.validateUserProfile(dataobject);
		doContinue = true;
		if(Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator.CustomValidation !== undefined){
			Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator.CustomValidation(dataobject);
		}


		dataobject.StatusData.errorSummary.removeAll();
	    if (dataobject.StatusData.isDateValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.dateErrorMessage());
		}
	    if (dataobject.StatusData.isDescriptionValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.descriptionErrorMessage());
		}
	    if (dataobject.StatusData.isIdValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.idErrorMessage());
		}
	    if (dataobject.StatusData.isTypeofplaceValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.typeofplaceErrorMessage());
		}
	    if (dataobject.StatusData.isUserProfileValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userProfileErrorMessage());
		}
	        
		if (dataobject.StatusData.isUserProfileValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userProfileErrorMessage());
		}			
		
		if(dataobject.StatusData.isVisitedPlaceEntityValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.visitedPlaceEntityErrorMessage());
		}

		if(Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator.OnAfterValidate !== undefined){
			Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.CustomValidator.OnAfterValidate();
		}	
	};

	Solid.Web.Model.DataObjects.Validation.VisitedPlaceValidator.resetValidation = function(dataobject) {

		dataobject.StatusData.isDateValid(true);
		dataobject.StatusData.dateErrorMessage(null);
		dataobject.StatusData.isDescriptionValid(true);
		dataobject.StatusData.descriptionErrorMessage(null);
		dataobject.StatusData.isIdValid(true);
		dataobject.StatusData.idErrorMessage(null);
		dataobject.StatusData.isTypeofplaceValid(true);
		dataobject.StatusData.typeofplaceErrorMessage(null);
		dataobject.StatusData.isCountryValid(true);
		dataobject.StatusData.countryErrorMessage(null);
		dataobject.StatusData.isPlaceValid(true);
		dataobject.StatusData.placeErrorMessage(null);
		dataobject.StatusData.isUserProfileValid(true);
		dataobject.StatusData.userProfileErrorMessage(null);
		
		dataobject.StatusData.isVisitedPlaceEntityValid(true);
		dataobject.StatusData.visitedPlaceEntityErrorMessage(null);
		dataobject.StatusData.errorSummary.removeAll();
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjectValidators/VisitedPlaceObjectValidator.js");

} ());