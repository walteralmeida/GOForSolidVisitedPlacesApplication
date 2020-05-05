﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
(function (global) {
    Solid.Web.Application.SourceHandler = function () {
        var self = this;
        // Keeps track of loaded Elements
        this.loadedElements = {};
        // Keeps track of loaded scripts
        this.loadedSources = {};

        this.globalRequiredSources = [
			'/Model/Components/GOSecurityProviderProxy.js'
		];

        // Defines required scripts by element
        this.requiredSourcesByElement = {
				"CountryItemsPage-Page": [
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/Country/CountryGridViewModel.js", 
					"/ViewModels/Country/Filters/CountryFilterViewModel.js", 
					"/Controllers/CountryItemsPageController.js" 
				], 
				"CountryPage-Page": [
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/Country/CountryFormViewModel.js", 
					"/Controllers/CountryPageController.js" 
				], 
				"LocationItemsPage-Page": [
					"/Model/DataObjects/LocationObject.js", 
					"/Model/DataObjectValidators/LocationObjectValidator.js", 
					"/Model/DataSets/LocationDataSet.js", 
					"/ViewModels/Location/LocationGridViewModel.js", 
					"/ViewModels/Location/Filters/LocationFilterViewModel.js", 
					"/Controllers/LocationItemsPageController.js" 
				], 
				"LocationPage-Page": [
					"/Model/DataObjects/LocationObject.js", 
					"/Model/DataObjectValidators/LocationObjectValidator.js", 
					"/Model/DataSets/LocationDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/Model/DataObjects/PlaceToLocationObject.js", 
					"/Model/DataObjectValidators/PlaceToLocationObjectValidator.js", 
					"/Model/DataSets/PlaceToLocationDataSet.js", 
					"/ViewModels/Location/LocationFormViewModel.js", 
					"/ViewModels/PlaceToLocation/PlaceToLocationGridViewModel.js", 
					"/ViewModels/PlaceToLocation/Filters/PlaceToLocationFilterViewModel.js", 
					"/Controllers/LocationPageController.js" 
				], 
				"MyProfilePage-Page": [
					"/Model/DataObjects/UserProfileObject.js", 
					"/Model/DataObjectValidators/UserProfileObjectValidator.js", 
					"/Model/DataSets/UserProfileDataSet.js", 
					"/Model/DataObjects/VisitedPlaceObject.js", 
					"/Model/DataObjectValidators/VisitedPlaceObjectValidator.js", 
					"/Model/DataSets/VisitedPlaceDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/UserProfile/UserProfileFormViewModel.js", 
					"/ViewModels/VisitedPlace/VisitedPlaceGridViewModel.js", 
					"/Controllers/MyProfilePageController.js" 
				], 
				"PlaceItemsPage-Page": [
					"/Model/DataObjects/PlaceObject.js", 
					"/Model/DataObjectValidators/PlaceObjectValidator.js", 
					"/Model/DataSets/PlaceDataSet.js", 
					"/ViewModels/Place/PlaceGridViewModel.js", 
					"/ViewModels/Place/Filters/PlaceFilterViewModel.js", 
					"/Controllers/PlaceItemsPageController.js" 
				], 
				"PlacePage-Page": [
					"/Model/DataObjects/PlaceObject.js", 
					"/Model/DataObjectValidators/PlaceObjectValidator.js", 
					"/Model/DataSets/PlaceDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/Model/DataObjects/PlaceToLocationObject.js", 
					"/Model/DataObjectValidators/PlaceToLocationObjectValidator.js", 
					"/Model/DataSets/PlaceToLocationDataSet.js", 
					"/ViewModels/Place/PlaceFormViewModel.js", 
					"/ViewModels/PlaceToLocation/PlaceToLocationGridViewModel.js", 
					"/ViewModels/PlaceToLocation/Filters/PlaceToLocationFilterViewModel.js", 
					"/Controllers/PlacePageController.js" 
				], 
				"UsersPage-Page": [
					"/Model/DataObjects/UserProfileObject.js", 
					"/Model/DataObjectValidators/UserProfileObjectValidator.js", 
					"/Model/DataSets/UserProfileDataSet.js", 
					"/Model/DataObjects/VisitedPlaceObject.js", 
					"/Model/DataObjectValidators/VisitedPlaceObjectValidator.js", 
					"/Model/DataSets/VisitedPlaceDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/UserProfile/UserProfileFormViewModel.js", 
					"/ViewModels/VisitedPlace/VisitedPlaceGridViewModel.js", 
					"/ViewModels/UserProfile/UserProfileGridViewModel.js", 
					"/Controllers/UsersPageController.js" 
				], 
				"CountryForm-Form": [
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/Country/CountryFormViewModel.js" 
				], 
				"LocationForm-Form": [
					"/Model/DataObjects/LocationObject.js", 
					"/Model/DataObjectValidators/LocationObjectValidator.js", 
					"/Model/DataSets/LocationDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/Model/DataObjects/PlaceToLocationObject.js", 
					"/Model/DataObjectValidators/PlaceToLocationObjectValidator.js", 
					"/Model/DataSets/PlaceToLocationDataSet.js", 
					"/ViewModels/Location/LocationFormViewModel.js", 
					"/ViewModels/PlaceToLocation/PlaceToLocationGridViewModel.js", 
					"/ViewModels/PlaceToLocation/Filters/PlaceToLocationFilterViewModel.js" 
				], 
				"PlaceForm-Form": [
					"/Model/DataObjects/PlaceObject.js", 
					"/Model/DataObjectValidators/PlaceObjectValidator.js", 
					"/Model/DataSets/PlaceDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/Model/DataObjects/PlaceToLocationObject.js", 
					"/Model/DataObjectValidators/PlaceToLocationObjectValidator.js", 
					"/Model/DataSets/PlaceToLocationDataSet.js", 
					"/ViewModels/Place/PlaceFormViewModel.js", 
					"/ViewModels/PlaceToLocation/PlaceToLocationGridViewModel.js", 
					"/ViewModels/PlaceToLocation/Filters/PlaceToLocationFilterViewModel.js" 
				], 
				"PlaceToLocationForm-Form": [
					"/Model/DataObjects/PlaceToLocationObject.js", 
					"/Model/DataObjectValidators/PlaceToLocationObjectValidator.js", 
					"/Model/DataSets/PlaceToLocationDataSet.js", 
					"/Model/DataObjects/PlaceObject.js", 
					"/Model/DataObjectValidators/PlaceObjectValidator.js", 
					"/Model/DataSets/PlaceDataSet.js", 
					"/Model/DataObjects/LocationObject.js", 
					"/Model/DataObjectValidators/LocationObjectValidator.js", 
					"/Model/DataSets/LocationDataSet.js", 
					"/ViewModels/PlaceToLocation/PlaceToLocationFormViewModel.js" 
				], 
				"UserProfileForm-Form": [
					"/Model/DataObjects/UserProfileObject.js", 
					"/Model/DataObjectValidators/UserProfileObjectValidator.js", 
					"/Model/DataSets/UserProfileDataSet.js", 
					"/Model/DataObjects/VisitedPlaceObject.js", 
					"/Model/DataObjectValidators/VisitedPlaceObjectValidator.js", 
					"/Model/DataSets/VisitedPlaceDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/UserProfile/UserProfileFormViewModel.js", 
					"/ViewModels/VisitedPlace/VisitedPlaceGridViewModel.js" 
				], 
				"VisitedPlaceForm-Form": [
					"/Model/DataObjects/VisitedPlaceObject.js", 
					"/Model/DataObjectValidators/VisitedPlaceObjectValidator.js", 
					"/Model/DataSets/VisitedPlaceDataSet.js", 
					"/Model/DataObjects/CountryObject.js", 
					"/Model/DataObjectValidators/CountryObjectValidator.js", 
					"/Model/DataSets/CountryDataSet.js", 
					"/ViewModels/VisitedPlace/VisitedPlaceFormViewModel.js" 
				] 
		};

        // Add script tag to load a given script
        this.getSource = function (scriptName) {

            var scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.async = true;
			// CORDOVA:
			// scriptElement.src = scriptName;
            scriptElement.src = Solid.Web.Application.buildNumber + scriptName;
            var scripts = document.getElementsByTagName('script');
            var lastscript = scripts[scripts.length-1];
            lastscript.parentNode.appendChild(scriptElement);
        };

        // Current element information. Used to handle the loading of all scripts for a element and handling callback call when all is done
        this.currentlyLoading = {};

        // Load all scripts for a Element, if required 
        this.EnsureSourcesForElement = function (elementName, elementType, callback) {
			GO.log(elementName, "Ensuring sources are loaded for " + elementName);
            
			// set current Element information
            var name = elementName || "";
            var type = elementType || "";
            var key = name + "-" + type;

            if (self.loadedElements[key]) {
				GO.log(elementName, "Sources already loaded, nothing to do");
                // Element was previously loaded => return
                callback(elementName);
                return;
            }

            self.currentlyLoading[key] = {
                count: 0,
                callback: callback
            };

            if (type === "Global") {
                self.loadSources(self.globalRequiredSources, "-Global");
                return;
            }

            // Iterate through all required scripts
            self.loadSources(self.requiredSourcesByElement[key], key);
        };

        this.loadSources = function (sources, key) {
            if (sources === undefined || sources.length === 0) {
                self.currentlyLoading[key].callback(key.split("-")[0]);
                delete self.currentlyLoading[key];
                return;
            }


            for (var i = 0; i < sources.length; i++) {
                var scriptName = sources[i];
                if (self.loadedSources[scriptName] /*&& self.loadedSources[scriptName].status === "success"*/) {
                    // script already loaded - do nothing
                    //self.currentElementLoadedSourcesCount++;
                    self.currentlyLoading[key].count++;

                    // if all scripts are loaded => callback
                    if (self.currentlyLoading[key].count == self.requiredSourcesByElement[key].length) {
						GO.log(key, "All sources loaded, continuing to next step");
                        self.loadedElements[key] = true;
                        self.currentlyLoading[key].callback(key.split("-")[0]);
                        delete self.currentlyLoading[key];
                        return true;
                    }
                }
                else {
                    self.getSource(scriptName);
                }
            }

            return false;
        };

        // callback when script loaded
        this.onSourceLoaded = function (scriptName) {
            self.loadedSources[scriptName] = true;

            for (var key in self.currentlyLoading) {

                var sources;
                if (key === "-Global")
                    sources = self.globalRequiredSources;
                else
                    sources = self.requiredSourcesByElement[key];

                if (sources.indexOf(scriptName) > -1) {

                    self.currentlyLoading[key].count++;

                    if (self.currentlyLoading[key].count == sources.length) {
                        self.loadedElements[key] = true;
                        self.currentlyLoading[key].callback(key.split("-")[0]);
                        delete self.currentlyLoading[key];
                        continue;
                    }
                }
            }
        };
	
        this.initialize = function () {
            if (
Solid.Web.Application.SourceHandlerCustom) {
                self.SourceHandlerCustom = new Solid.Web.Application.SourceHandlerCustom();

                if (self.SourceHandlerCustom.globalRequiredSources) {
                    for (var i = 0; i < self.SourceHandlerCustom.globalRequiredSources.length; i++) {
                        self.globalRequiredSources.push(self.SourceHandlerCustom.globalRequiredSources[i]);
                    }
                }

                if (self.SourceHandlerCustom.requiredSourcesByElement) {
                    for (var prop in self.SourceHandlerCustom.requiredSourcesByElement) {
                        for (var i = 0 ; i < self.SourceHandlerCustom.requiredSourcesByElement[prop].length; i++) {
                            self.requiredSourcesByElement[prop].push(self.SourceHandlerCustom.requiredSourcesByElement[prop][i]);
                        }
                    }
                }
            }
        };


        this.initialize();
	
	};
} (window));

