﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	// 
	Solid.Web.ViewModels.LocationFormViewModel = function(controller, $formContainer, sDataBindRoot, $popupContainer, parentContextId, options) {
		var self = this;
		this.controller = controller;
		this.subscriptions = [];

		if (sDataBindRoot)
			sDataBindRoot = sDataBindRoot + ".";
		else
			sDataBindRoot = "";
			
		this.$formContainer = $formContainer;

		this.contextId = parentContextId ? parentContextId.concat([this.controller.applicationController.getNextContextId()]) : [this.controller.applicationController.getNextContextId()];
		this.popupWidth = options && options.popupWidth;
		this.alternateTitle = options && options.alternateTitle;

		this.DataStore = new Solid.Web.Model.DataStores.DataStore(controller.applicationController.ObjectsDataSet, 'location');
		// Related Data Stores

 
		this.isMemoryOnly = false;

		// Object data
		this.LocationObject = ko.observable(new Solid.Web.Model.DataObjects.LocationObject());
		this.LocationObject().ObjectsDataSet = this.controller.ObjectsDataSet;
		this.CurrentObject = ko.pureComputed(function () { return this.LocationObject() }, this);

 
		// Form status data
        this.StatusData = {
			IsUIDirty : ko.observable (false),
            // Control properties         
			IsBusy: ko.observable(false),
            IsEnabled: ko.observable(true),
			IsVisible: ko.observable(true),
            DisplayMode: ko.observable('view'),
            ShowTitle : ko.observable(true),

            PreviousIsEmpty : true,
            IsEmpty : ko.observable(true),
			isPopup : ko.observable(false),
			isValid : ko.observable(true),
			errorSummary : ko.observableArray()
		};

 
		// Integrate custom code if any
		if (Solid.Web.ViewModels.LocationFormViewModelCustom !== undefined) {
		    this.customViewModel = new Solid.Web.ViewModels.LocationFormViewModelCustom(self);
		};

		this.StatusData.Title = ko.pureComputed(function() { 
			if (self.customViewModel !== undefined && self.customViewModel.Title !== undefined) {
				return self.customViewModel.Title();
			}	
			
			if(!self.LocationObject())
				return;
							
			return self.alternateTitle || 'Location Details'; 
		});

		this.runValidation = function() {
			self.LocationObject().runValidation();

			var isValid = self.LocationObject().StatusData.isValid();
			self.StatusData.errorSummary.removeAll();
			for (var i=0; i < self.LocationObject().StatusData.errorSummary().length; i++) {
				self.StatusData.errorSummary.push(self.LocationObject().StatusData.errorSummary()[i]);
			}

			// Remove duplicates
			self.StatusData.errorSummary(GO.Array.Distinct(self.StatusData.errorSummary()));

			self.StatusData.isValid(isValid);
		};

		this.resetValidation = function () {
			self.LocationObject().resetValidation();
			self.StatusData.isValid(true);
			self.StatusData.errorSummary.removeAll();
		};

		this.onContextIdsStatusChanged = function() {
			self.StatusData.IsUIDirty(self.controller.ObjectsDataSet.isContextIdDirty(self.contextId));			
		};

		this.controller.ObjectsDataSet.AddContextIdsStatusChangeHandler(self.onContextIdsStatusChanged);


		this.StatusData.IsNameVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsNameVisible !== undefined) {
				return self.customViewModel.IsNameVisible();
			}
			
			return true;
		});

		this.StatusData.IsNameReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsNameReadOnly !== undefined) {
				return self.customViewModel.IsNameReadOnly();
			}
			return false;
        });

		this.StatusData.IsURILinkVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsURILinkVisible !== undefined) {
				return self.customViewModel.IsURILinkVisible();
			}
			
			return true;
		});

		this.StatusData.IsURILinkReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsURILinkReadOnly !== undefined) {
				return self.customViewModel.IsURILinkReadOnly();
			}
			return false;
        });

		this.StatusData.IsAbstractVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsAbstractVisible !== undefined) {
				return self.customViewModel.IsAbstractVisible();
			}
			
			return true;
		});

		this.StatusData.IsAbstractReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsAbstractReadOnly !== undefined) {
				return self.customViewModel.IsAbstractReadOnly();
			}
			return false;
        });

		// Form events data
		this.Events = {
            LocationLoaded: ko.observable(false),
            LocationSaved: ko.observable(false),
            LocationDeleted: ko.observable(false),
			LocationSetInMemory: ko.observable(false),
            StartEdit: ko.observable(false),
            CancelEdit: ko.observable(false),
            EndEdit: ko.observable(false)
		};
				
		// Form commands data
		this.Commands = {
			CreateNewCommand: function() {
				self.CreateNew(true);
			}, 
			EditCommand: function() {
				self.Edit(true);
			}, 
			DeleteCommand: function() {
				self.Delete(true);
			}, 
			SaveCommand: function() {
				self.Save(true);
			}, 
			CancelEditCommand: function() {
				self.CancelEdit(true);
			} 
      };

		// Form computed command data
		this.Commands.IsCancelEditCommandVisible = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsCancelEditCommandVisible !== undefined) {
				return self.customViewModel.IsCancelEditCommandVisible();
			}

            return  (self.StatusData.DisplayMode() == 'edit'); 
        });

        this.Commands.IsCancelEditCommandEnabled = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsCancelEditCommandEnabled !== undefined) {
				return self.customViewModel.IsCancelEditCommandEnabled();
			}

            return (self.StatusData.DisplayMode() == 'edit');
        });

      this.Commands.IsEditCommandVisible = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsModifyCommandVisible !== undefined) {
				return self.customViewModel.IsModifyCommandVisible();
			}

            return (self.StatusData.DisplayMode() == 'view' && !self.StatusData.IsEmpty() && self.DataStore && self.DataStore.CheckAuthorizationForEntityAndMethod('save')); 
        });
        this.Commands.IsModifyCommandVisible = this.Commands.IsEditCommandVisible;

        this.Commands.IsEditCommandEnabled = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsModifyCommandEnabled !== undefined) {
				return self.customViewModel.IsModifyCommandEnabled();
			}

            return (self.StatusData.DisplayMode() == 'view');
        });
        this.Commands.IsModifyCommandEnabled = this.Commands.IsEditCommandEnabled;

      this.Commands.IsSaveCommandVisible = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsSaveCommandVisible !== undefined) {
				return self.customViewModel.IsSaveCommandVisible();
			}

            return (self.StatusData.DisplayMode() == 'edit' && self.DataStore &&  self.DataStore.CheckAuthorizationForEntityAndMethod('save')); 
        });

        this.Commands.IsSaveCommandEnabled = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsSaveCommandEnabled !== undefined) {
				return self.customViewModel.IsSaveCommandEnabled();
			}

            return (self.StatusData.DisplayMode() == 'edit');
            //return (self.StatusData.DisplayMode() == 'edit' && self.StatusData.IsUIDirty() === true);
        });

      this.Commands.IsDeleteCommandVisible = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsDeleteCommandVisible !== undefined) {
				return self.customViewModel.IsDeleteCommandVisible();
			}
			
			return (self.StatusData.DisplayMode() == 'view' && !self.StatusData.IsEmpty()  && self.DataStore &&  self.DataStore.CheckAuthorizationForEntityAndMethod('delete')); 

        });

        this.Commands.IsDeleteCommandEnabled = ko.pureComputed(function () {
			if(self.customViewModel !== undefined && self.customViewModel.IsDeleteCommandEnabled !== undefined) {
				return self.customViewModel.IsDeleteCommandEnabled();
			}
            return (self.StatusData.DisplayMode() == 'view');
        });

      this.Commands.IsCreateNewCommandVisible = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsCreateNewCommandVisible !== undefined) {
				return self.customViewModel.IsCreateNewCommandVisible();
			}

            return (self.StatusData.DisplayMode() == 'view' && !self.StatusData.isPopup() && self.DataStore && self.DataStore.CheckAuthorizationForEntityAndMethod('save')); 
        });

        this.Commands.IsCreateNewCommandEnabled = ko.pureComputed(function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsCreateNewCommandEnabled !== undefined) {
				return self.customViewModel.IsCreateNewCommandEnabled();
			}

            return (self.StatusData.DisplayMode() == 'view' && !self.StatusData.isPopup());
        });


		// var generatedIncludes = "";
		// The server auto-maps the include path if we send the following auto-include-id
		this.include = "auto-include-id-606f7503-3674-4cc6-b5f5-2589d2231be2";
		// Popups management
        // this.viewLoader = new Solid.Web.Views.viewLoader();
		this.viewLoader = controller.applicationController.viewLoader;

        this.popupCaller = null;
		this.$popupContainer = $popupContainer;
		
        //The close event is emitted by the dialog extension - see html markup
        this.onPopupClosed = function (rebindrequired) {
			self.StatusData.isPopup(false);
		    if (self.StatusData.DisplayMode() === 'edit') {
		        self.CancelEdit(false);
		    }
			if (rebindrequired) {
				self.popupCaller.Rebind();
			}
			self.release();
        };

		this.showAsEditPopup = function(caller, objectToEdit) {
        // Dynamically load the required view
			self.StatusData.IsBusy(true);
            self.viewLoader.loadView( { viewName : "PartialViews/Location/LocationFormControlPartialView", parentName : ($popupContainer ? $popupContainer.get(0).id : null), successHandler : self.onViewLoaded } ); 
            self.popupCaller = caller;
            if (self.isMemoryOnly) {
                    self.SetLocationObject(objectToEdit);
            }
            else {
                    self.LoadLocation(objectToEdit);
            }
            self.StatusData.isPopup(true);
        };

		this.showAsCreateNewPopup = function(caller, defaultObject) {
             // Dynamically load the required view
            self.StatusData.IsBusy(true);
            self.viewLoader.loadView( { viewName : "PartialViews/Location/LocationFormControlPartialView", parentName : ($popupContainer ? $popupContainer.get(0).id : null), successHandler : self.onViewLoaded } ); 
            self.popupCaller = caller;

            self.SetLocationObject(defaultObject);
			self.controller.ObjectsDataSet.AddOrReplaceObject(self.LocationObject());

            self.StatusData.isPopup(true);
            self.Modify();
        };          

		this.closePopup = function (rebindrequired) {
			controller.applicationController.closeCurrentPopup(rebindrequired);
        };

        this.onViewLoaded = function (viewData) {
            self.$popupContainer.html(viewData);
			self.$popupContainer.show();

			ko.applyBindings(self, self.$popupContainer.get(0));
        	self.StatusData.IsBusy(false);

			self.controller.applicationController.centerPopup();
        };


        this.SetLocationObject = function (objectToSet) {
            			
			if (objectToSet && (objectToSet === self.LocationObject()))
				return;

			if (objectToSet && objectToSet.contextIds)
			    objectToSet.contextIds.push(self.contextId);
			
			if (self.LocationObject().Data.IsNew() === true) {
				// If the old dataobject has not been saved => not used anymore, remove it from dataset
				self.controller.ObjectsDataSet.RemoveObject(self.LocationObject());
			}
			
			
			if (objectToSet) {
				var objectFromDataset = self.controller.ObjectsDataSet.GetObject(objectToSet);						
				self.LocationObject(objectFromDataset);
                self.StatusData.IsEmpty(false);
            }
            else {
                self.StatusData.IsEmpty(true);
            }
			
			self.onLocationObjectChanged();
			self.Events.LocationSetInMemory(!self.Events.LocationSetInMemory());
						
			if (self.StatusData.isPopup()) 
				ApplicationController.centerPopup();	
				
			if (self.isMemoryOnly && self.isOpenInEditMode) {
				self.isOpenInEditMode = false;
				self.Modify();
			}
		};

		this.onLocationObjectChanged = function() {
 			
			self.StatusData.IsUIDirty(self.controller.ObjectsDataSet.isContextIdDirty(self.contextId));			
		};

 
		
        this.GetLocationObject = function () {
            return self.LocationObject();
        };

        this.LoadLocation = function (objectToLoad) {
			
			self.StatusData.IsBusy(true);
			var configuration = {};			
			configuration.contextId = self.contextId;
			configuration.include = this.include;
			   

			configuration.pks = {
				URI : objectToLoad.Data.URI()
			};          

			configuration.successHandler =  self.OnLocationLoaded;
			configuration.errorHandler = self.ShowError;
			self.DataStore.LoadObject(configuration);
        };

        this.Rebind = function() {
			if(self.isMemoryOnly === false) { 
				if(!self.LocationObject().Data.IsNew()) {
					self.LoadLocation(self.LocationObject());
				}
			}
        };

        // Define the load completed functions
        this.OnLocationLoaded = function (objectLoaded) {
			// if we do next line : delete all related entities
			//self.controller.ObjectsDataSet.cleanContext(self.contextId);	
            self.SetLocationObject(objectLoaded);
            self.StatusData.IsBusy(false);
            // the next line is to force notification of change: this way we emulate event handling
            self.Events.LocationLoaded(!self.Events.LocationLoaded());

			// Centers the popup div in case the content made it shift toward the page's bottom
			self.controller.applicationController.centerPopup();
				
			if (!!self.isOpenInEditMode) {
				self.isOpenInEditMode = false;
				self.Modify();
			}
		};

        this.OnLocationSaved = function (objectSaved) {
			GO.log("LocationForm", "LocationObject saved with success");
			self.SetLocationObject(objectSaved);
			self.EndEdit();
			if (self.StatusData.isPopup()) {
				var preventRebind = false;
				if(self.popupCaller.CallAfterSaveRelatedEntity) {
					// The CallAfterSaveRelatedEntity may return true to prevent rebind when closing the popup
					preventRebind = self.popupCaller.CallAfterSaveRelatedEntity(objectSaved);
				}
                self.closePopup(!preventRebind);
			}
 
        };

			


        this.OnLocationDeleted = function () {
			GO.log("LocationForm", "LocationObject deleted with success");
            self.controller.ObjectsDataSet.cleanContext(self.contextId);	
			self.SetLocationObject(null);
            self.StatusData.IsBusy(false);
            // the next line is to force notification of change: this way we emulate event handling
            self.Events.LocationDeleted(!self.Events.LocationDeleted());
 
			self.closePopup(true);
        };


        //////////////////////////////////////////////

		this.Edit = function () { self.Modify(); }

        this.Modify = function () {
			GO.log("LocationForm", "Entering modification of LocationObject");
	        self.SavedData = new Solid.Web.Model.DataObjects.LocationObject();
			self.SavedData.CopyValuesFrom(self.LocationObject());

 
            self.StatusData.DisplayMode('edit');
            self.StatusData.PreviousIsEmpty = self.StatusData.IsEmpty();
            self.StatusData.IsEmpty(false);
			
			if (self.StatusData.isPopup())			
				ApplicationController.centerPopup();			
			
			// notify listeners
            self.Events.StartEdit(!self.Events.StartEdit());
        };

        this.CancelEdit = function (isCommandCall) {
			GO.log("LocationForm", "CancelEdit of LocationObject");


            self.StatusData.DisplayMode('view');

 
			if (self.LocationObject().Data.IsNew() === true) {
				// If the old dataobject has not been saved => not used anymore, remove it from dataset
				self.controller.ObjectsDataSet.RemoveObject(self.LocationObject());
			}

            self.LocationObject().CopyValuesFrom(self.SavedData);
			self.SavedData = null;
            self.StatusData.IsEmpty(self.StatusData.PreviousIsEmpty);

			self.onLocationObjectChanged();
            // notify listeners
            self.Events.CancelEdit(!self.Events.CancelEdit());

			// reset contextIds status
			self.controller.ObjectsDataSet.resetContextIdDirty(self.contextId);
			self.resetValidation();

			if (isCommandCall)
			{
 
			}			
            if (self.StatusData.isPopup())
                self.closePopup(false);
        };

        this.EndEdit = function () {
			GO.log("LocationForm", "EndEdit on LocationObject");

            self.SavedData = null;
			self.StatusData.DisplayMode('view');
            self.StatusData.IsBusy(false);

            // notify listeners
			self.LocationObject().StatusData.lastEditedTime(new Date().getTime());
            self.Events.EndEdit(!self.Events.EndEdit());
        };

        this.CreateNew = function () {
			GO.log("LocationForm", "Creating new LocationObject");
            self.SavedData = new Solid.Web.Model.DataObjects.LocationObject();
			self.SavedData.CopyValuesFrom(self.LocationObject());
            self.StatusData.PreviousIsEmpty = self.StatusData.IsEmpty();
			self.controller.ObjectsDataSet.cleanContext(self.contextId);
	        var objectToAdd = Solid.Web.Model.DataObjects.LocationObjectFactory.createNew(self.controller.ObjectsDataSet, self.contextId);
			self.SetLocationObject(objectToAdd);


			
			self.StatusData.DisplayMode('edit');
            self.StatusData.IsEmpty(false);

  
            // notify listeners
            self.Events.StartEdit(!self.Events.StartEdit());
        };

		this.OnBeforeSave = function() {
			var diff = GO.compareEntities(self.SavedData, self.LocationObject());
		    GO.log("LocationForm", "Before Saving (diff)", diff);

			return true;
		};

        this.Save = function () {
			var doContinue = true;

			if (self.customViewModel !== undefined && self.customViewModel.onBeforeSave !== undefined) {
				doContinue = self.customViewModel.onBeforeSave();
			}
		
			if (doContinue) {
                doContinue = self.OnBeforeSave();
            }

            if (doContinue) {

				self.runValidation();
            
				if (self.StatusData.isValid() === false)
					return;

				self.StatusData.IsBusy(true);

				if (self.isMemoryOnly) {
					self.OnLocationSaved(self.LocationObject());
				}
				else {
					var configuration = {};			
					configuration.contextId = self.contextId;
					configuration.include = this.include;
					configuration.objectToSave = self.GetLocationObject();
					configuration.successHandler =  self.OnLocationSaved;
					configuration.errorHandler = self.ShowError;		
					GO.log("LocationForm", "Sending payload to LocationObject DataStore");
					self.DataStore.SaveObject(configuration);
				}
			}

			if (self.customViewModel !== undefined && self.customViewModel.onAfterSave !== undefined) {
				self.customViewModel.onAfterSave();
			}
        };

		this.onConfirmDelete = function (confirm) {
            if (confirm === true) {
				var objectToDelete = self.GetLocationObject()
				var configuration = {};			
				configuration.contextId = self.contextId;
				configuration.pks = {
					URI : objectToDelete.Data.URI()
			};          

				configuration.successHandler =  self.OnLocationDeleted;
				configuration.errorHandler = self.ShowError;

				self.DataStore.DeleteObject(configuration);
            }
            else {
                self.StatusData.IsBusy(false);
            }
		};

        this.Delete = function () {
            self.StatusData.IsBusy(true);
			self.controller.applicationController.showConfirmPopup(self, Solid.Web.Messages.confirmDeleteMessage.replace(/%ENTITY%/g, "Location"), Solid.Web.Messages.confirmDeletePopupTitle, self.onConfirmDelete, self.contextId);
        };



		this.release = function() {

			// Remove Custom ViewModel reference
			if (self.customViewModel !== undefined) {
				if(self.customViewModel.release !== undefined) {
				    self.customViewModel.release();
				}
				delete self.customViewModel;
			}

			self.DataStore = null;

			 
            // Cleaning references to subscriptions & handlers
			self.controller.ObjectsDataSet.RemoveContextIdsStatusChangeHandler(self.onContextIdsStatusChanged);			
			for(var i=0; i < self.subscriptions.length; i++)
			{
				self.subscriptions[i].dispose();
			}
			self.subscriptions = [];
			// Cleaning the context if data has been saved already
			if (!self.isMemoryOnly) {
				self.controller.ObjectsDataSet.cleanContext(self.contextId);
			}
			if(self.$formContainer) {
				ko.removeNode(self.$formContainer.get(0));
			}
		};


 
        this.ShowError = function (errorMessage, title) {
			self.isOpenInEditMode = false;
			self.controller.applicationController.showAlertPopup(self, errorMessage, title, null, self.contextId);
            self.StatusData.IsBusy(false);
        };		

		this.getErrorClass = ko.pureComputed(function () {
            if (self.customViewModel !== undefined && self.customViewModel.getErrorClass !== undefined) {
                return self.customViewModel.getErrorClass();
            }
            return "errorText";
        });
		
		this.initialize = function() {
			// Call custom initialize if defined
			if (self.customViewModel !== undefined && self.customViewModel.initialize !== undefined) {
			    self.customViewModel.initialize();
			}
		};

		self.initialize();
	
		// Apply bindings
		if (self.$formContainer) {
			ko.applyBindings(self, self.$formContainer.get(0));
    		self.StatusData.IsBusy(false);
		}
	};		

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/ViewModels/Location/LocationFormViewModel.js");
} ());