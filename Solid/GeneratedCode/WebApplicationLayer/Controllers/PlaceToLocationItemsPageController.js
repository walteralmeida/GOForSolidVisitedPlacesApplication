﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	// 
	Solid.Web.Controllers.PlaceToLocationItemsPageController = function(applicationController) {
		var self = this;
		this.subscriptions = [];
		// store all subscriptions in this array, to unsubscribe on release.
		
		this._objectType = "PlaceToLocationItemsPage";

		this.applicationController = applicationController;
		this.ObjectsDataSet = applicationController.ObjectsDataSet;
		this.contextId = [this.applicationController.getNextContextId()];
		this.customController = undefined;

		// Integrate custom code if any
		if (Solid.Web.Controllers.PlaceToLocationItemsPageControllerCustom !== undefined) {
		    this.customController = new Solid.Web.Controllers.PlaceToLocationItemsPageControllerCustom(self);
		};

		this.pageTitle = ko.observable("PlaceToLocations Page");

		// Initialize View Models and Data Stores
		
			this.PlaceToLocationItemsViewModel = new Solid.Web.ViewModels.PlaceToLocationGridViewModel(this, $("#PlaceToLocationGrid"), null, null, this.contextId);		
	
		// Attach to view models events
		this.subscriptions.push(this.PlaceToLocationItemsViewModel.StatusData.IsBusy.subscribe( function (newValue) { self.OnPlaceToLocationItemsViewModelIsBusyChanged(newValue); }));
		
		this.IsInEditMode = function() {

			return  (self.PlaceToLocationItemsViewModel.StatusData.DisplayMode && self.PlaceToLocationItemsViewModel.StatusData.DisplayMode() == 'edit');
		};


		// Events Handlers
		this.OnPlaceToLocationItemsViewModelIsBusyChanged = function (newValue) {
		};

		this.initialize = function() {
			if (Solid.Web.Controllers.Custom && Solid.Web.Controllers.Custom.getPageTitle) {
				self.pageTitle(Solid.Web.Controllers.Custom.getPageTitle(self));
			}

	
			// Call custom initialize if defined
			if (self.customController !== undefined && self.customController.initialize !== undefined) {
			    self.customController.initialize();
			}
		// Initial data load for all source elements (no dependencies)
			if (!GO.Filter.hasUrlFilter(self.PlaceToLocationItemsViewModel.FILTER_NAME, self.PlaceToLocationItemsViewModel)) {
				self.PlaceToLocationItemsViewModel.LoadPlaceToLocationObjectCollection();
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
			
			self.PlaceToLocationItemsViewModel.release();
			self.PlaceToLocationItemsViewModel = null;
		};


		return self;
	};		
	
	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Controllers/PlaceToLocationItemsPageController.js");
} ());
