﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	'use strict'
	/// <summary>
	/// DataObject Validator object for 'GOUserRole'.
	/// Contains a set of method to validate the given object
	/// </summary>	
	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator = {};

	if(Solid.Web.Model.DataObjects.Validation.GOUserRoleValidatorCustom !== undefined) {
		Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator = new Solid.Web.Model.DataObjects.Validation.GOUserRoleValidatorCustom(self);
	}

	/***********************************/
    /****** VALIDATORS FOR FIELDS ******/
    /***********************************/    


	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateRole = function (dataobject) {
      if(dataobject.Data.Role() == undefined || dataobject.Data.Role() == null || dataobject.Data.Role() === "")
		{
			dataobject.StatusData.isRoleValid(false);
			dataobject.StatusData.roleErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Role"));
		}
		else {
			dataobject.StatusData.isRoleValid(true);
		}
	};

	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateUser = function (dataobject) {
      if(dataobject.Data.User() == undefined || dataobject.Data.User() == null || dataobject.Data.User() === "")
		{
			dataobject.StatusData.isUserValid(false);
			dataobject.StatusData.userErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "User"));
		}
		else {
			dataobject.StatusData.isUserValid(true);
		}
	};


	/***************************************/
    /****** VALIDATORS FOR RELATIONS ******/
    /**************************************/

	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateRole = function (dataobject) {
		var isValid = true;
		if ((dataobject.Data.GORoleName() === undefined || dataobject.Data.GORoleName() === null || dataobject.Data.GORoleName() === "") && dataobject.Data._role_NewObjectId() === null) {
			dataobject.StatusData.isRoleValid(false);
			dataobject.StatusData.roleErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "Role"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isRoleValid(true);
			dataobject.StatusData.roleErrorMessage(null);
		}							
	};

	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateUser = function (dataobject) {
		var isValid = true;
		if ((dataobject.Data.GOUserId() === undefined || dataobject.Data.GOUserId() === null) && dataobject.Data._user_NewObjectId() === null) {
			dataobject.StatusData.isUserValid(false);
			dataobject.StatusData.userErrorMessage(Solid.Web.Messages.validationRuleRequiredMessage.replace(/%FIELDNAME%/g, "User"));
			isValid = false;
		}
		else {
			dataobject.StatusData.isUserValid(true);
			dataobject.StatusData.userErrorMessage(null);
		}							
	};

 	
	/******************************/
    /****** GLOBAL VALIDATOR ******/
    /******************************/

	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validate = function(dataobject) {

		var doContinue = true;
		var isValid = true;
		var errorMessage = "";

		if(Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator.validate !== undefined) {
			// A Custom Validator to override / add some validations.
			doContinue = Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator.validate(dataobject);
		}
		if(!doContinue)
			return;

		Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateRole (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateUser (dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateRole(dataobject);
		Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.validateUser(dataobject);
		doContinue = true;
		if(Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator.CustomValidation !== undefined){
			Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator.CustomValidation(dataobject);
		}


		dataobject.StatusData.errorSummary.removeAll();
	    if (dataobject.StatusData.isRoleValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.roleErrorMessage());
		}
	    if (dataobject.StatusData.isUserValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userErrorMessage());
		}
	        
		if (dataobject.StatusData.isRoleValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.roleErrorMessage());
		}			
	        
		if (dataobject.StatusData.isUserValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.userErrorMessage());
		}			
		
		if(dataobject.StatusData.isGOUserRoleEntityValid() === false) {
			dataobject.StatusData.errorSummary.push(dataobject.StatusData.gOUserRoleEntityErrorMessage());
		}

		if(Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator && Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator.OnAfterValidate !== undefined){
			Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.CustomValidator.OnAfterValidate();
		}	
	};

	Solid.Web.Model.DataObjects.Validation.GOUserRoleValidator.resetValidation = function(dataobject) {

		dataobject.StatusData.isRoleValid(true);
		dataobject.StatusData.roleErrorMessage(null);
		dataobject.StatusData.isUserValid(true);
		dataobject.StatusData.userErrorMessage(null);
		
		dataobject.StatusData.isGOUserRoleEntityValid(true);
		dataobject.StatusData.gOUserRoleEntityErrorMessage(null);
		dataobject.StatusData.errorSummary.removeAll();
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/DataObjectValidators/GOUserRoleObjectValidator.js");

} ());