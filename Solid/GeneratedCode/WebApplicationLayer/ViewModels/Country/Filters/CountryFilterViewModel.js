﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	// filter
	Solid.Web.ViewModels.Filters.CountryFilterViewModel = function(controller, $container, $popupContainer, parentContextId) {
		var self = this;

		this.controller = controller;

		this.$container = $container;
        this.$popupContainer = $popupContainer;

		this.contextId = parentContextId ? parentContextId.concat([this.controller.applicationController.getNextContextId()]) : [this.controller.applicationController.getNextContextId()];

		// Integrate custom code if any
		if (Solid.Web.ViewModels.Filters.CountryFilterViewModelCustom !== undefined) {
		    this.customViewModel = new Solid.Web.ViewModels.Filters.CountryFilterViewModelCustom(self);
		};

		this.filterData = {
			fields: {
				Name: ko.observable(''), 
				URI: ko.observable('') 
			},
			groups: {
			}			
		};

 
		// Filter Status Data
        this.statusData = {
            filterCollectionLoaded: ko.observable(true),
            countFilterCollectionsLoaded: ko.observable(0),
	        isURIVisible: ko.pureComputed(function() {
				if (self.customViewModel && self.customViewModel.isURIVisible) {
					return self.customViewModel.isURIVisible();
				}
				return true;
			}),
	        isNameVisible: ko.pureComputed(function() {
				if (self.customViewModel && self.customViewModel.isNameVisible) {
					return self.customViewModel.isNameVisible();
				}
				return true;
			}),
			isEnabled: ko.observable(true),
            isVisible: ko.observable(true)
		};
		
		//persistent filter : used only for Filters on relations, otherwise empty
        this.KEY_BY_FILTER_DATA_OBJECTS = {
        };

		this.statusData.countFilterCollectionsLoaded.subscribe(function (newValue) {
            if (self.statusData.countFilterCollectionsLoaded() == Object.keys(self.KEY_BY_FILTER_DATA_OBJECTS).length) {
                self.statusData.filterCollectionLoaded(true);
            }
        });

        this.commands = {
            searchCommand: function () {
				self.fireOnSearch();
            },
            clearCommand: function () {
                self.clearFilterDataOnly();
				self.fireOnClear();
            }
        };
        
        this.clearFilterDataOnly = function() {
			self.filterData.fields.Name('');
			self.filterData.fields.URI('');
        };

        this.issearchCommandEnabled = ko.pureComputed(function () {
            return true;
        });

        this.isclearCommandEnabled = ko.pureComputed(function () {
            return true;
        });

		this.isclearCommandVisible = ko.pureComputed(function () {
			return !!self.getFilterPredicate();
		});

        this.events = {
            onSearch: ko.observable(false),
            onClear: ko.observable(false)       
        };

        this.fireOnSearch = function() {
			self.events.onSearch(!self.events.onSearch());
        };

        this.fireOnClear = function () {
			self.events.onClear(!self.events.onClear());            
        };

        this.getFilterPredicate = function () {
            var filterPredicate = "";

			// Name filter field
			if (self.filterData.fields.Name() !== '' && self.filterData.fields.Name() !== undefined && self.filterData.fields.Name() !== null) {
                if (filterPredicate !== "") 
					filterPredicate += " && ";
              filterPredicate += 'Name.Contains("' + self.filterData.fields.Name() + '")';
            }
				
			// URI filter field
			if (self.filterData.fields.URI() !== '' && self.filterData.fields.URI() !== undefined && self.filterData.fields.URI() !== null) {
                if (filterPredicate !== "") 
					filterPredicate += " && ";
              filterPredicate += 'URI.Contains("' + self.filterData.fields.URI() + '")';
            }
				
			// Give custom implementations opportunity to extend the filter predicate
			if (self.customViewModel && self.customViewModel.getAdditionnalFilterPredicate) {
			    var moreFilterPredicate = self.customViewModel.getAdditionnalFilterPredicate();
				if(moreFilterPredicate != "") {
					if (filterPredicate !== "") filterPredicate += " && ";
					filterPredicate += moreFilterPredicate;
				}
			}
			
			// Give custom implementations opportunity to modify the fully constructed filter predicate
			if (self.customViewModel && self.customViewModel.modifyPredicate) {
			    filterPredicate = self.customViewModel.modifyPredicate(filterPredicate);
			}

			return filterPredicate;
        };

		this.release = function (){
			self.controller.ObjectsDataSet.cleanContext(self.contextId);
			if(self.$container)
				ko.removeNode(self.$container);
		};

		this.initialize = function() {				
			// Call custom before initialize if defined
			if (self.customViewModel && self.customViewModel.onBeforeInitialize) {
			    self.customViewModel.onBeforeInitialize();
			}	
			
			// Call custom initialize if defined
			if (self.customViewModel !== undefined && self.customViewModel.initialize !== undefined) {
			    self.customViewModel.initialize();
			}
		};

        this.ShowError = function (errorMessage, title) {
			self.controller.applicationController.showAlertPopup(self, errorMessage, title, null, self.contextId);
        };	

		self.initialize();	
	
		// Apply bindings
        if (self.$container) {
            ko.applyBindings(self, self.$container.get(0));
		}
	};	

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/ViewModels/Country/Filters/CountryFilterViewModel.js");
	
} ());