﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	// 
	Solid.Web.Controllers.UserProfilePageController = function(applicationController) {
		var self = this;
		this.subscriptions = [];
		// store all subscriptions in this array, to unsubscribe on release.
		
		this._objectType = "UserProfilePage";

		this.applicationController = applicationController;
		this.ObjectsDataSet = applicationController.ObjectsDataSet;
		this.contextId = [this.applicationController.getNextContextId()];
		this.customController = undefined;

		// Integrate custom code if any
		if (Solid.Web.Controllers.UserProfilePageControllerCustom !== undefined) {
		    this.customController = new Solid.Web.Controllers.UserProfilePageControllerCustom(self);
		};

		this.pageTitle = ko.observable("User Profile");

		// Initialize View Models and Data Stores
		
			this.UserProfileForm1ViewModel = new Solid.Web.ViewModels.UserProfileForm1ViewModel(this, $("#UserProfileForm1Control"), null, null, this.contextId);		
	
		// Attach to view models events
		this.subscriptions.push(this.UserProfileForm1ViewModel.StatusData.IsBusy.subscribe( function (newValue) { self.OnUserProfileForm1ViewModelIsBusyChanged(newValue); }));
		
		this.IsInEditMode = function() {

			return  (self.UserProfileForm1ViewModel.StatusData.DisplayMode && self.UserProfileForm1ViewModel.StatusData.DisplayMode() == 'edit');
		};


		// Events Handlers
		this.OnUserProfileForm1ViewModelIsBusyChanged = function (newValue) {
		};

		this.initialize = function() {
			if (Solid.Web.Controllers.Custom && Solid.Web.Controllers.Custom.getPageTitle) {
				self.pageTitle(Solid.Web.Controllers.Custom.getPageTitle(self));
			}

			var partsCount = location.hash.split("/").length;
			var lasttagindex = 0;
			if (partsCount == 4) {
				var hash = window.location.hash;
				var allPksValid = true;
				lasttagindex = hash.lastIndexOf('/');
				var pk1 = GO.Encoding.UrlDecode(hash.substring(lasttagindex + 1).split(new RegExp("#", "g"))[0]);
				
				if(allPksValid) {
					var objectToLoad = new Solid.Web.Model.DataObjects.UserProfileObject();
					objectToLoad.Data.Uri(pk1);	
					self.UserProfileForm1ViewModel.LoadUserProfile(objectToLoad);	
				}
			}
	
			// Call custom initialize if defined
			if (self.customController !== undefined && self.customController.initialize !== undefined) {
			    self.customController.initialize();
			}
		};
		this.initialize();



		this.release = function() {
			// unsubscribe
			for(var i = 0;i <  self.subscriptions.length;i++) {
				self.subscriptions[i].dispose();
			}
			self.subscriptions = [];
			self.ObjectsDataSet.cleanContext(self.contextId);
			
			self.UserProfileForm1ViewModel.release();
			self.UserProfileForm1ViewModel = null;
		};


		return self;
	};		
	
	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Controllers/UserProfilePageController.js");
} ());
