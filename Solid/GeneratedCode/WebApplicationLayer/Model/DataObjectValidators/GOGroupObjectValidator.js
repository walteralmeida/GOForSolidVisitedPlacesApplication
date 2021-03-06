﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict'
	/// <summary>
	/// DataObject Validator object for 'GOGroup'.
	/// Contains a set of method to validate the given object
	/// </summary>	
	Solid.Web.Model.DataObjects.Validation.GOGroupValidator = {};

	if(Solid.Web.Model.DataObjects.Validation.GOGroupValidatorCustom !== undefined) {
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator = new Solid.Web.Model.DataObjects.Validation.GOGroupValidatorCustom(self);
	}

	/***********************************/
    /****** VALIDATORS FOR FIELDS ******/
    /***********************************/    


	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateDescription = function (dataobject) {
		// Max Length
		if(dataobject.Data.Description() != null && dataobject.Data.Description().length > 250)
		{
			dataobject.StatusData.isDescriptionValid(false);
			dataobject.StatusData.descriptionErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Description").replace(/%LENGTH%/g, "250"));
		}
		else {
			dataobject.StatusData.isDescriptionValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateDisplayName = function (dataobject) {
		var isValid = true;
      if(dataobject.Data.DisplayName() == undefined || dataobject.Data.DisplayName() == null || dataobject.Data.DisplayName() === "")
		{
			dataobject.StatusData.isDisplayNameValid(false);
			dataobject.StatusData.displayNameErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Display name"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isDisplayNameValid(isValid && true);
		}
		// Max Length
		if(dataobject.Data.DisplayName() != null && dataobject.Data.DisplayName().length > 200)
		{
			dataobject.StatusData.isDisplayNameValid(false);
			dataobject.StatusData.displayNameErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Display name").replace(/%LENGTH%/g, "200"));
				isValid = false;
		}
		else {
			dataobject.StatusData.isDisplayNameValid(isValid && true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateGroupRoleItems = function (dataobject) {
      if(dataobject.Data.GroupRoleItems() == undefined || dataobject.Data.GroupRoleItems() == null || dataobject.Data.GroupRoleItems() === "")
		{
			dataobject.StatusData.isGroupRoleItemsValid(false);
			dataobject.StatusData.groupRoleItemsErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "GroupRoleItems"));
		}
		else {
			dataobject.StatusData.isGroupRoleItemsValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateIsSpecialGroup = function (dataobject) {
      if(dataobject.Data.IsSpecialGroup() == undefined || dataobject.Data.IsSpecialGroup() == null || dataobject.Data.IsSpecialGroup() === "")
		{
			dataobject.StatusData.isIsSpecialGroupValid(false);
			dataobject.StatusData.isSpecialGroupErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Is Special Group"));
		}
		else {
			dataobject.StatusData.isIsSpecialGroupValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateName = function (dataobject) {
		var isValid = true;
      if(dataobject.Data.Name() == undefined || dataobject.Data.Name() == null || dataobject.Data.Name() === "")
		{
			dataobject.StatusData.isNameValid(false);
			dataobject.StatusData.nameErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Name"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isNameValid(isValid && true);
		}
		// Max Length
		if(dataobject.Data.Name() != null && dataobject.Data.Name().length > 200)
		{
			dataobject.StatusData.isNameValid(false);
			dataobject.StatusData.nameErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Name").replace(/%LENGTH%/g, "200"));
				isValid = false;
		}
		else {
			dataobject.StatusData.isNameValid(isValid && true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateSpecialGroup = function (dataobject) {
      if(dataobject.Data.SpecialGroup() == undefined || dataobject.Data.SpecialGroup() == null || dataobject.Data.SpecialGroup() === "")
		{
			dataobject.StatusData.isSpecialGroupValid(false);
			dataobject.StatusData.specialGroupErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Special Group"));
		}
		else {
			dataobject.StatusData.isSpecialGroupValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateUserGroupItems = function (dataobject) {
      if(dataobject.Data.UserGroupItems() == undefined || dataobject.Data.UserGroupItems() == null || dataobject.Data.UserGroupItems() === "")
		{
			dataobject.StatusData.isUserGroupItemsValid(false);
			dataobject.StatusData.userGroupItemsErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "UserGroupItems"));
		}
		else {
			dataobject.StatusData.isUserGroupItemsValid(true);
		}
	};


	/***************************************/
    /****** VALIDATORS FOR RELATIONS ******/
    /**************************************/

 	
	/******************************/
    /****** GLOBAL VALIDATOR ******/
    /******************************/

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validate = function(dataobject) {

		var doContinue = true;
		var isValid = true;
		var errorMessage = "";

		if(Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator.validate !== undefined) {
			// A Custom Validator to override / add some validations.
			doContinue = Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator.validate(dataobject);
		}
		if(!doContinue)
			return;

		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateDescription (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateDisplayName (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateGroupRoleItems (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateIsSpecialGroup (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateName (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateSpecialGroup (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOGroupValidator.validateUserGroupItems (dataobject);
		doContinue = true;
		if(Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator.CustomValidation !== undefined){
			Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator.CustomValidation(dataobject);
		}


		dataobject.StatusData.errorSummary.removeAll();
	    if (dataobject.StatusData.isDescriptionValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.descriptionErrorMessage());
		}
	    if (dataobject.StatusData.isDisplayNameValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.displayNameErrorMessage());
		}
	    if (dataobject.StatusData.isGroupRoleItemsValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.groupRoleItemsErrorMessage());
		}
	    if (dataobject.StatusData.isIsSpecialGroupValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.isSpecialGroupErrorMessage());
		}
	    if (dataobject.StatusData.isNameValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.nameErrorMessage());
		}
	    if (dataobject.StatusData.isSpecialGroupValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.specialGroupErrorMessage());
		}
	    if (dataobject.StatusData.isUserGroupItemsValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userGroupItemsErrorMessage());
		}
		
		if(dataobject.StatusData.isGOGroupEntityValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.gOGroupEntityErrorMessage());
		}

		if(Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator.OnAfterValidate !== undefined){
			Solid.Web.Model.DataObjects.Validation.GOGroupValidator.CustomValidator.OnAfterValidate();
		}	
	};

	Solid.Web.Model.DataObjects.Validation.GOGroupValidator.resetValidation = function(dataobject) {

		dataobject.StatusData.isDescriptionValid(true);
		dataobject.StatusData.descriptionErrorMessage(null);
		dataobject.StatusData.isDisplayNameValid(true);
		dataobject.StatusData.displayNameErrorMessage(null);
		dataobject.StatusData.isIsSpecialGroupValid(true);
		dataobject.StatusData.isSpecialGroupErrorMessage(null);
		dataobject.StatusData.isNameValid(true);
		dataobject.StatusData.nameErrorMessage(null);
		dataobject.StatusData.isSpecialGroupValid(true);
		dataobject.StatusData.specialGroupErrorMessage(null);
		
		dataobject.StatusData.isGOGroupEntityValid(true);
		dataobject.StatusData.gOGroupEntityErrorMessage(null);
		dataobject.StatusData.errorSummary.removeAll();
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjectValidators/GOGroupObjectValidator.js");

} ());