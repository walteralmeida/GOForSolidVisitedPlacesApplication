﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict'
	/// <summary>
	/// DataObject Validator object for 'GOUser'.
	/// Contains a set of method to validate the given object
	/// </summary>	
	Solid.Web.Model.DataObjects.Validation.GOUserValidator = {};

	if(Solid.Web.Model.DataObjects.Validation.GOUserValidatorCustom !== undefined) {
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator = new Solid.Web.Model.DataObjects.Validation.GOUserValidatorCustom(self);
	}

	/***********************************/
    /****** VALIDATORS FOR FIELDS ******/
    /***********************************/    


	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateBlocked = function (dataobject) {
      if(dataobject.Data.Blocked() == undefined || dataobject.Data.Blocked() == null || dataobject.Data.Blocked() === "")
		{
			dataobject.StatusData.isBlockedValid(false);
			dataobject.StatusData.blockedErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Blocked"));
		}
		else {
			dataobject.StatusData.isBlockedValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateEmailAddress = function (dataobject) {
		var isValid = true;
      if(dataobject.Data.EmailAddress() == undefined || dataobject.Data.EmailAddress() == null || dataobject.Data.EmailAddress() === "")
		{
			dataobject.StatusData.isEmailAddressValid(false);
			dataobject.StatusData.emailAddressErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Email"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isEmailAddressValid(isValid && true);
		}
		// Max Length
		if(dataobject.Data.EmailAddress() != null && dataobject.Data.EmailAddress().length > 150)
		{
			dataobject.StatusData.isEmailAddressValid(false);
			dataobject.StatusData.emailAddressErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Email").replace(/%LENGTH%/g, "150"));
				isValid = false;
		}
		else {
			dataobject.StatusData.isEmailAddressValid(isValid && true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateEmailValidated = function (dataobject) {
      if(dataobject.Data.EmailValidated() == undefined || dataobject.Data.EmailValidated() == null || dataobject.Data.EmailValidated() === "")
		{
			dataobject.StatusData.isEmailValidatedValid(false);
			dataobject.StatusData.emailValidatedErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Email Verified?"));
		}
		else {
			dataobject.StatusData.isEmailValidatedValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateFirstName = function (dataobject) {
		// Max Length
		if(dataobject.Data.FirstName() != null && dataobject.Data.FirstName().length > 100)
		{
			dataobject.StatusData.isFirstNameValid(false);
			dataobject.StatusData.firstNameErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "First Name").replace(/%LENGTH%/g, "100"));
		}
		else {
			dataobject.StatusData.isFirstNameValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateFullName = function (dataobject) {
		var isValid = true;
      if(dataobject.Data.FullName() == undefined || dataobject.Data.FullName() == null || dataobject.Data.FullName() === "")
		{
			dataobject.StatusData.isFullNameValid(false);
			dataobject.StatusData.fullNameErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Full Name"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isFullNameValid(isValid && true);
		}
		// Max Length
		if(dataobject.Data.FullName() != null && dataobject.Data.FullName().length > 250)
		{
			dataobject.StatusData.isFullNameValid(false);
			dataobject.StatusData.fullNameErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Full Name").replace(/%LENGTH%/g, "250"));
				isValid = false;
		}
		else {
			dataobject.StatusData.isFullNameValid(isValid && true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateId = function (dataobject) {
      if(dataobject.Data.Id() == undefined || dataobject.Data.Id() == null || dataobject.Data.Id() === "")
		{
			dataobject.StatusData.isIdValid(false);
			dataobject.StatusData.idErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Id"));
		}
		else {
			dataobject.StatusData.isIdValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateLastName = function (dataobject) {
		// Max Length
		if(dataobject.Data.LastName() != null && dataobject.Data.LastName().length > 100)
		{
			dataobject.StatusData.isLastNameValid(false);
			dataobject.StatusData.lastNameErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Surname").replace(/%LENGTH%/g, "100"));
		}
		else {
			dataobject.StatusData.isLastNameValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validatePassword = function (dataobject) {
		var isValid = true;
      if(dataobject.Data.Password() == undefined || dataobject.Data.Password() == null || dataobject.Data.Password() === "")
		{
			dataobject.StatusData.isPasswordValid(false);
			dataobject.StatusData.passwordErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Password"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isPasswordValid(isValid && true);
		}
		// Max Length
		if(dataobject.Data.Password() != null && dataobject.Data.Password().length > 150)
		{
			dataobject.StatusData.isPasswordValid(false);
			dataobject.StatusData.passwordErrorMessage(Solid.Web.Messages.validationRuleMaxLengthMessage.replace(/%FIELDNAME%/g, "Password").replace(/%LENGTH%/g, "150"));
				isValid = false;
		}
		else {
			dataobject.StatusData.isPasswordValid(isValid && true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUnregistered = function (dataobject) {
      if(dataobject.Data.Unregistered() == undefined || dataobject.Data.Unregistered() == null || dataobject.Data.Unregistered() === "")
		{
			dataobject.StatusData.isUnregisteredValid(false);
			dataobject.StatusData.unregisteredErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Unregistered"));
		}
		else {
			dataobject.StatusData.isUnregisteredValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUserGroupItems = function (dataobject) {
      if(dataobject.Data.UserGroupItems() == undefined || dataobject.Data.UserGroupItems() == null || dataobject.Data.UserGroupItems() === "")
		{
			dataobject.StatusData.isUserGroupItemsValid(false);
			dataobject.StatusData.userGroupItemsErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "UserGroupItems"));
		}
		else {
			dataobject.StatusData.isUserGroupItemsValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUserRoleItems = function (dataobject) {
      if(dataobject.Data.UserRoleItems() == undefined || dataobject.Data.UserRoleItems() == null || dataobject.Data.UserRoleItems() === "")
		{
			dataobject.StatusData.isUserRoleItemsValid(false);
			dataobject.StatusData.userRoleItemsErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "UserRoleItems"));
		}
		else {
			dataobject.StatusData.isUserRoleItemsValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUserValidated = function (dataobject) {
      if(dataobject.Data.UserValidated() == undefined || dataobject.Data.UserValidated() == null || dataobject.Data.UserValidated() === "")
		{
			dataobject.StatusData.isUserValidatedValid(false);
			dataobject.StatusData.userValidatedErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Admin Approved?"));
		}
		else {
			dataobject.StatusData.isUserValidatedValid(true);
		}
	};


	/***************************************/
    /****** VALIDATORS FOR RELATIONS ******/
    /**************************************/

 	
	/******************************/
    /****** GLOBAL VALIDATOR ******/
    /******************************/

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.validate = function(dataobject) {

		var doContinue = true;
		var isValid = true;
		var errorMessage = "";

		if(Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator.validate !== undefined) {
			// A Custom Validator to override / add some validations.
			doContinue = Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator.validate(dataobject);
		}
		if(!doContinue)
			return;

		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateBlocked (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateEmailAddress (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateEmailValidated (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateFirstName (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateFullName (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateId (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateLastName (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validatePassword (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUnregistered (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUserGroupItems (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUserRoleItems (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserValidator.validateUserValidated (dataobject);
		doContinue = true;
		if(Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator.CustomValidation !== undefined){
			Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator.CustomValidation(dataobject);
		}


		dataobject.StatusData.errorSummary.removeAll();
	    if (dataobject.StatusData.isBlockedValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.blockedErrorMessage());
		}
	    if (dataobject.StatusData.isEmailAddressValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.emailAddressErrorMessage());
		}
	    if (dataobject.StatusData.isEmailValidatedValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.emailValidatedErrorMessage());
		}
	    if (dataobject.StatusData.isFirstNameValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.firstNameErrorMessage());
		}
	    if (dataobject.StatusData.isFullNameValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.fullNameErrorMessage());
		}
	    if (dataobject.StatusData.isIdValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.idErrorMessage());
		}
	    if (dataobject.StatusData.isLastNameValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.lastNameErrorMessage());
		}
	    if (dataobject.StatusData.isPasswordValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.passwordErrorMessage());
		}
	    if (dataobject.StatusData.isUnregisteredValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.unregisteredErrorMessage());
		}
	    if (dataobject.StatusData.isUserGroupItemsValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userGroupItemsErrorMessage());
		}
	    if (dataobject.StatusData.isUserRoleItemsValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userRoleItemsErrorMessage());
		}
	    if (dataobject.StatusData.isUserValidatedValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userValidatedErrorMessage());
		}
		
		if(dataobject.StatusData.isGOUserEntityValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.gOUserEntityErrorMessage());
		}

		if(Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator.OnAfterValidate !== undefined){
			Solid.Web.Model.DataObjects.Validation.GOUserValidator.CustomValidator.OnAfterValidate();
		}	
	};

	Solid.Web.Model.DataObjects.Validation.GOUserValidator.resetValidation = function(dataobject) {

		dataobject.StatusData.isBlockedValid(true);
		dataobject.StatusData.blockedErrorMessage(null);
		dataobject.StatusData.isEmailAddressValid(true);
		dataobject.StatusData.emailAddressErrorMessage(null);
		dataobject.StatusData.isEmailValidatedValid(true);
		dataobject.StatusData.emailValidatedErrorMessage(null);
		dataobject.StatusData.isFirstNameValid(true);
		dataobject.StatusData.firstNameErrorMessage(null);
		dataobject.StatusData.isFullNameValid(true);
		dataobject.StatusData.fullNameErrorMessage(null);
		dataobject.StatusData.isIdValid(true);
		dataobject.StatusData.idErrorMessage(null);
		dataobject.StatusData.isLastNameValid(true);
		dataobject.StatusData.lastNameErrorMessage(null);
		dataobject.StatusData.isPasswordValid(true);
		dataobject.StatusData.passwordErrorMessage(null);
		dataobject.StatusData.isUnregisteredValid(true);
		dataobject.StatusData.unregisteredErrorMessage(null);
		dataobject.StatusData.isUserValidatedValid(true);
		dataobject.StatusData.userValidatedErrorMessage(null);
		dataobject.StatusData.isUserProfileValid(true);
		dataobject.StatusData.userProfileErrorMessage(null);
		
		dataobject.StatusData.isGOUserEntityValid(true);
		dataobject.StatusData.gOUserEntityErrorMessage(null);
		dataobject.StatusData.errorSummary.removeAll();
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjectValidators/GOUserObjectValidator.js");

} ());