


/**
  * English application messages. You can change language via Project Configuration / Target Language (Project.TargetLanguage), delete this file and re-generate.
  * This file is generated once.
  * It contains all the generic error messages for the application. 
  * You can modifiy it as it won't be overwritten.
  */
(function (global) {
    Solid.Web.Messages = {
		//Buttons
        okLabel:							"OK",
        cancelLabel:						"Cancel",
		yesLabel:							"Yes",
        noLabel:							"No",
		
		// Dropdown menu 
		addItemLabel:						"Click to add...",
		noMatchLabel:						"No match found",
		noAvailableDataLabel:				"No available data",

        // UnsavedChanges
        unsavedChangesMessage:				"You have unsaved changes. Are you sure you want to leave this page?",

        // Loading
        loadingMessage:						"Loading, please wait...",
        pageLoadingMessage:					"Page is loading, please wait...",

        // Error when loading apage
        genericPageError:					"An error occured while loading this page. Please contact an administrator.",
        
        // Error from any JSON query
        popupTitle:							"Error",
        genericPopupError:					"An error occured. Please contact an administrator.",

        // DataStore errors
        // %ENTITY% will be replaced by the entity's name
        deleteError:						"Error while deleting entity %ENTITY%",
        saveError:							"Error while saving entity %ENTITY%",
	    getError:							"Error while loading entity %ENTITY%",
	    getCollectionError:					"Error while loading the %ENTITY% collection",
	    countError:							"Error while counting entity %ENTITY%",

        // Component error
        // %OPERATION% will be replaced by the Operation's name
	    componentError:						"Error while calling %OPERATION%",

		// Confirm Delete
		confirmDeleteMessage:				"Are you sure you want to delete this %ENTITY%?",
		confirmDeletePopupTitle:			"Confirm Deletion",

		// File Upload
		uploadSuccess:						"File %FILENAME% uploaded with success",
		uploadFail:							"Uploading file %FILENAME% failed",
		uploadingMessage:					"Uploading %FILENAME%",
		uploadMaxSizeReached:				"Unable to upload the file. File size should be less than %SIZE% kb",

		// Membership
		identification:						"Identification",
		connection:							"Connection",
		connecting:							"Connecting",
		userName:							"User Name",
        userNameMandatory:					"User Name is mandatory",
		firstName:							"First Name",
        firstNameMandatory:					"First Name is mandatory",
		lastName:							"Last Name",
        lastNameMandatory:					"Last Name is mandatory",
		password:							"Password",
		passwordMandatory:					"Password is mandatory",
		rememberMe:							"Remember me",
		login:								"Login",
		register:							"Register",
		registering:						"Registering",
		lostPassword:						"Lost Password?",
		changePassword:						"Change Password",
		changingPassword:					"Changing Password",	
		changePasswordMismatchNewConfirm:	"The confirming password did not match",
		changePasswordError:				"Unable to change your password.",
		invalidCurrentPassword:				"Invalid Current Password.",
		currentPassword:					"Current Password",
		newPassword:						"New Password",
		confirmPassword:					"Confirm Password",
		emailAddress:						"Email",
        emailAddressMandatory:				"Email Address is mandatory",
		resetPassword:						"Reset Password",
		resettingPassword:					"Resetting Password",
		resetCommand:						"Reset",
		resettingCommand:					"Resetting...",
		incorrectEmail:						"The provided Email Address is invalid.",
		passwordHasExpired:					"Your password has expired. Please create a new password.",
		authorization:						"Authorization",
		authorizationError:					"Authorization check: An error occurred.",
		permissionDenied:					"Permission Denied.",
		nullSecurityToken:					"Please enter your credentials to continue.",
		invalidSecurityToken:				"Please re-enter your credentials to continue.",
		expiredSecurityToken:				"You were logged out due to inactivity.<br>Please re-enter your credentials to continue.",
		noActivityLogOut:					"You were logged out due to inactivity.<br>Please re-enter your credentials to continue.",
		warningNoActivity:					"Due to inactivity, your session will be disconnected soon. Click to keep your session open.",
		unauthorized:						"Error: The request was cancelled because you are not sufficiently authorised.",
		unknownUsernameOrPassword:			"Unknown username or password.",
		accountCreation:					"Account Creation",
		validate:							"Validate",
		validating:							"Validating",
		pleaseValidateEmail:				"Please validate your email address:",
		emailVerificationEmailSent:			"You have been sent an email containing a link for you to verify your email address",
		resetPasswordEmailSent:				"You have been sent an email containing a link to reset your password",
		resetPasswordSuccess:				"Your password has been reset, you can now log-in:",
		emailVerified:						"Thank you for verifying your email address - you may now login:",
		emailVerifiedAdminApprovalPending:	"Thank you for verifying your email address. An administrator has been notified - when your account has been approved you will receive a confirmation email.",

		// LogMote
		logmoteConnection :					"LogMote Connection",
		welcomeUser:						"Welcome",
		loginLink:							"Log In",
		logoutLink:							"Log Out",

		// SAML
		samlConnection:					    "SSO Connexion",

		// Global Search
        searchPlaceholder:					"Search terms...",
        searchResultTypeData:				"Data",
        searchResultTypeDocument:			"Document",		
        searchFieldLabel:					"Field Name",
        searchDownloadLink:					"Download file",
        searchSeeDetailsLink:				"View details",

        // Validation Rules
        validationRuleRequiredMessage:		"%FIELDNAME% is a mandatory field",
        validationRuleLikeMessage:			"%FIELDNAME% has to be like '%PATTERN%",
        validationRuleRegExMessage:			"%FIELDNAME% has to match the regular expression %PATTERN%",
        validationRuleRangeMessage:			"%FIELDNAME% has to be in the range [%MIN%, %MAX%]",
        validationRuleMaxMessage:			"%FIELDNAME% has to be less than or equal to %MAX%",
        validationRuleMinMessage:			"%FIELDNAME% has to be greater than or equal to %MIN%",
        validationRuleMaxLengthMessage:		"%FIELDNAME%'s length has to be less than %LENGTH%",
        validationRuleCustomMessage:		"%ENTITYNAME% does not respect the given rule: %RULE%",

		// Upload Image size error
		uploadImageTooLarge:				"{image.name} must be no larger than {maxImageWidth} x {maxImageHeight} (selected image was {image.width} x {image.height})",
		uploadAllowedFileExtensions:		"Allowed file types: ",

		// Image Cropping Warning
		imageCroppingNotSaved:				"You haven't validated cropping for image %LABEL%.<br>Continuing will automatically save the current cropping area.",
		imageCroppingNotSavedConfirmTitle:	"Cropping in progress!",
	};
} (window));
