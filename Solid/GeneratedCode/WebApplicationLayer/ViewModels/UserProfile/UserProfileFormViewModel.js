﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 

(function () {
	// 
	Solid.Web.ViewModels.UserProfileFormViewModel = function(controller, $formContainer, sDataBindRoot, $popupContainer, parentContextId, options) {
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

		this.DataStore = new Solid.Web.Model.DataStores.DataStore(controller.applicationController.ObjectsDataSet, 'userprofile');
		// Related Data Stores

 
		this.isMemoryOnly = false;

		// Object data
		this.UserProfileObject = ko.observable(new Solid.Web.Model.DataObjects.UserProfileObject());
		this.UserProfileObject().ObjectsDataSet = this.controller.ObjectsDataSet;
		this.CurrentObject = ko.pureComputed(function () { return this.UserProfileObject() }, this);

		// Sub-grids ViewModels
		this.VisitedPlaceItemsGridViewModel = new Solid.Web.ViewModels.VisitedPlaceGridViewModel(self.controller, null, sDataBindRoot +  "VisitedPlaceItemsGridViewModel", $popupContainer, self.contextId);
		this.VisitedPlaceItemsGridViewModel.getSourceCollection = function () { return self.UserProfileObject().getVisitedPlaceItems(); };		
		this.VisitedPlaceItemsGridViewModel.NewvisitedplaceCommandInitActions.push ( 
			function (newobject) {
				newobject.setUserProfile(self.CurrentObject());; 
		});				
 
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
		if (Solid.Web.ViewModels.UserProfileFormViewModelCustom !== undefined) {
		    this.customViewModel = new Solid.Web.ViewModels.UserProfileFormViewModelCustom(self);
		};

		this.StatusData.Title = ko.pureComputed(function() { 
			if (self.customViewModel !== undefined && self.customViewModel.Title !== undefined) {
				return self.customViewModel.Title();
			}	
			
			if(!self.UserProfileObject())
				return;
							
			return self.alternateTitle || 'My Profile'; 
		});

		this.runValidation = function() {
			self.UserProfileObject().runValidation();

			var isValid = self.UserProfileObject().StatusData.isValid();
			self.StatusData.errorSummary.removeAll();
			for (var i=0; i < self.UserProfileObject().StatusData.errorSummary().length; i++) {
				self.StatusData.errorSummary.push(self.UserProfileObject().StatusData.errorSummary()[i]);
			}

			// Remove duplicates
			self.StatusData.errorSummary(GO.Array.Distinct(self.StatusData.errorSummary()));

			self.StatusData.isValid(isValid);
		};

		this.resetValidation = function () {
			self.UserProfileObject().resetValidation();
			self.StatusData.isValid(true);
			self.StatusData.errorSummary.removeAll();
		};

		this.onContextIdsStatusChanged = function() {
			self.StatusData.IsUIDirty(self.controller.ObjectsDataSet.isContextIdDirty(self.contextId));			
		};

		this.controller.ObjectsDataSet.AddContextIdsStatusChangeHandler(self.onContextIdsStatusChanged);


		this.StatusData.IsWebIdLinkVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsWebIdLinkVisible !== undefined) {
				return self.customViewModel.IsWebIdLinkVisible();
			}
			
			return true;
		});

		this.StatusData.IsWebIdLinkReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsWebIdLinkReadOnly !== undefined) {
				return self.customViewModel.IsWebIdLinkReadOnly();
			}
			return false;
        });

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

		this.StatusData.IsOrganizationNameVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsOrganizationNameVisible !== undefined) {
				return self.customViewModel.IsOrganizationNameVisible();
			}
			
			return true;
		});

		this.StatusData.IsOrganizationNameReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsOrganizationNameReadOnly !== undefined) {
				return self.customViewModel.IsOrganizationNameReadOnly();
			}
			return false;
        });

		this.StatusData.IsRoleVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsRoleVisible !== undefined) {
				return self.customViewModel.IsRoleVisible();
			}
			
			return true;
		});

		this.StatusData.IsRoleReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsRoleReadOnly !== undefined) {
				return self.customViewModel.IsRoleReadOnly();
			}
			return false;
        });

		this.StatusData.IsVisitedPlaceItemsVisible = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsVisitedPlaceItemsVisible !== undefined) {
				return self.customViewModel.IsVisitedPlaceItemsVisible();
			}
			
			return true;
		});

		this.StatusData.IsVisitedPlaceItemsReadOnly = ko.pureComputed( function () {
			if (self.customViewModel !== undefined && self.customViewModel.IsVisitedPlaceItemsReadOnly !== undefined) {
				return self.customViewModel.IsVisitedPlaceItemsReadOnly();
			}
			return false;
        });

		// Propagate Display Mode change to subgrids
        this.subscriptions.push(this.StatusData.DisplayMode.subscribe (function(newValue) {
			self.VisitedPlaceItemsGridViewModel.StatusData.DisplayMode(newValue);	
		}));
		// Form events data
		this.Events = {
            UserProfileLoaded: ko.observable(false),
            UserProfileSaved: ko.observable(false),
            UserProfileDeleted: ko.observable(false),
			UserProfileSetInMemory: ko.observable(false),
            StartEdit: ko.observable(false),
            CancelEdit: ko.observable(false),
            EndEdit: ko.observable(false)
		};
				
		// Form commands data
		this.Commands = {
      };

		// Form computed command data

		// var generatedIncludes = "";
		// The server auto-maps the include path if we send the following auto-include-id
		this.include = "auto-include-id-004328d0-bf8e-4d33-8f30-341cb5fac456";
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
            self.viewLoader.loadView( { viewName : "PartialViews/UserProfile/UserProfileFormControlPartialView", parentName : ($popupContainer ? $popupContainer.get(0).id : null), successHandler : self.onViewLoaded } ); 
            self.popupCaller = caller;
            if (self.isMemoryOnly) {
                    self.SetUserProfileObject(objectToEdit);
            }
            else {
                    self.LoadUserProfile(objectToEdit);
            }
            self.StatusData.isPopup(true);
        };

		this.showAsCreateNewPopup = function(caller, defaultObject) {
             // Dynamically load the required view
            self.StatusData.IsBusy(true);
            self.viewLoader.loadView( { viewName : "PartialViews/UserProfile/UserProfileFormControlPartialView", parentName : ($popupContainer ? $popupContainer.get(0).id : null), successHandler : self.onViewLoaded } ); 
            self.popupCaller = caller;

            self.SetUserProfileObject(defaultObject);
			self.controller.ObjectsDataSet.AddOrReplaceObject(self.UserProfileObject());

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


        this.SetUserProfileObject = function (objectToSet) {
            			
			if (objectToSet && (objectToSet === self.UserProfileObject()))
				return;

			if (objectToSet && objectToSet.contextIds)
			    objectToSet.contextIds.push(self.contextId);
			
			if (self.UserProfileObject().Data.IsNew() === true) {
				// If the old dataobject has not been saved => not used anymore, remove it from dataset
				self.controller.ObjectsDataSet.RemoveObject(self.UserProfileObject());
			}
			
			
			if (objectToSet) {
				var objectFromDataset = self.controller.ObjectsDataSet.GetObject(objectToSet);						
				self.UserProfileObject(objectFromDataset);
                self.StatusData.IsEmpty(false);
            }
            else {
                self.StatusData.IsEmpty(true);
            }
			
			self.onUserProfileObjectChanged();
			self.Events.UserProfileSetInMemory(!self.Events.UserProfileSetInMemory());
						
			if (self.StatusData.isPopup()) 
				ApplicationController.centerPopup();	
				
			if (self.isMemoryOnly && self.isOpenInEditMode) {
				self.isOpenInEditMode = false;
				self.Modify();
			}
		};

		this.onUserProfileObjectChanged = function() {
			
			// Reload all sub-grids data
			if (self.UserProfileObject().Data.IsNew()) {
				 
				var theCollection = self.UserProfileObject().Data.VisitedPlaceItems();
                self.VisitedPlaceItemsGridViewModel.SetVisitedPlaceObjectCollection( theCollection );
				self.VisitedPlaceItemsGridViewModel.isMemoryOnlyCollection = true;
	            self.VisitedPlaceItemsGridViewModel.totalCollection(theCollection !== null ? theCollection.length : 0);
				self.VisitedPlaceItemsGridViewModel.pageNumber(0);	            
				self.VisitedPlaceItemsGridViewModel.totalPageNumber(0);
	        } else {

				
				self.VisitedPlaceItemsGridViewModel.isMemoryOnlyCollection = false;
				
				// Resetting filters
                self.VisitedPlaceItemsGridViewModel.baseFilterPredicate = 'UserProfileUri == "' + self.UserProfileObject().Data.Uri() + '"';
			        self.VisitedPlaceItemsGridViewModel.filterPredicate = self.VisitedPlaceItemsGridViewModel.baseFilterPredicate;
			    				
				// Rebinding subgrid
                self.VisitedPlaceItemsGridViewModel.LoadVisitedPlaceObjectCollection();
            }

 			
			self.StatusData.IsUIDirty(self.controller.ObjectsDataSet.isContextIdDirty(self.contextId));			
		};

 
		
        this.GetUserProfileObject = function () {
            return self.UserProfileObject();
        };

        this.LoadUserProfile = function (objectToLoad) {
			
			self.StatusData.IsBusy(true);
			var configuration = {};			
			configuration.contextId = self.contextId;
			configuration.include = this.include;
			   

			configuration.pks = {
				Uri : objectToLoad.Data.Uri()
			};          

			configuration.successHandler =  self.OnUserProfileLoaded;
			configuration.errorHandler = self.ShowError;
			self.DataStore.LoadObject(configuration);
        };

        this.Rebind = function() {
			if(self.isMemoryOnly === false) { 
				if(!self.UserProfileObject().Data.IsNew()) {
					self.LoadUserProfile(self.UserProfileObject());
				}
			}
        };

        // Define the load completed functions
        this.OnUserProfileLoaded = function (objectLoaded) {
			// if we do next line : delete all related entities
			//self.controller.ObjectsDataSet.cleanContext(self.contextId);	
            self.SetUserProfileObject(objectLoaded);
            self.StatusData.IsBusy(false);
            // the next line is to force notification of change: this way we emulate event handling
            self.Events.UserProfileLoaded(!self.Events.UserProfileLoaded());

			// Centers the popup div in case the content made it shift toward the page's bottom
			self.controller.applicationController.centerPopup();
				
			if (!!self.isOpenInEditMode) {
				self.isOpenInEditMode = false;
				self.Modify();
			}
		};

        this.OnUserProfileSaved = function (objectSaved) {
			GO.log("UserProfileForm", "UserProfileObject saved with success");
			self.SetUserProfileObject(objectSaved);
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

			


        this.OnUserProfileDeleted = function () {
			GO.log("UserProfileForm", "UserProfileObject deleted with success");
            self.controller.ObjectsDataSet.cleanContext(self.contextId);	
			self.SetUserProfileObject(null);
            self.StatusData.IsBusy(false);
            // the next line is to force notification of change: this way we emulate event handling
            self.Events.UserProfileDeleted(!self.Events.UserProfileDeleted());
			self.closePopup(true);
        };


        //////////////////////////////////////////////

		this.Edit = function () { self.Modify(); }

        this.Modify = function () {
			GO.log("UserProfileForm", "Entering modification of UserProfileObject");
			
			// propagate to Sub-Grids
			self.VisitedPlaceItemsGridViewModel.isMemoryOnlyCollection = true;	
	        self.SavedData = new Solid.Web.Model.DataObjects.UserProfileObject();
			self.SavedData.CopyValuesFrom(self.UserProfileObject());

			// remember the original GOUser 
			self.SavedData.relatedGOUser = self.CurrentObject().getGOUser();
 
            self.StatusData.DisplayMode('edit');
            self.StatusData.PreviousIsEmpty = self.StatusData.IsEmpty();
            self.StatusData.IsEmpty(false);
			
			if (self.StatusData.isPopup())			
				ApplicationController.centerPopup();			
			
			// notify listeners
            self.Events.StartEdit(!self.Events.StartEdit());
        };

        this.CancelEdit = function (isCommandCall) {
			GO.log("UserProfileForm", "CancelEdit of UserProfileObject");


            self.StatusData.DisplayMode('view');

			// For PK to FK one-to-one lookups, remove the linked related FK side instance and the last linked instance to ensure we don't leave any 'dangerous'
			// stale data behind. Any intermediate instances cna only have null FKs anyway (so long as we filter pk to fk side lookups for unlinked entities, which we do)
			if (self.SavedData.relatedGOUser != self.CurrentObject().getGOUser()) {
				if (self.SavedData.relatedGOUser != null) {
					self.controller.ObjectsDataSet.RemoveObject(self.SavedData.relatedGOUser);
				}
				if (self.CurrentObject().getGOUser() != null) {
					self.controller.ObjectsDataSet.RemoveObject(self.CurrentObject().getGOUser());
				}
			}
 
			if (self.UserProfileObject().Data.IsNew() === true) {
				// If the old dataobject has not been saved => not used anymore, remove it from dataset
				self.controller.ObjectsDataSet.RemoveObject(self.UserProfileObject());
			}

            self.UserProfileObject().CopyValuesFrom(self.SavedData);
			self.SavedData = null;
            self.StatusData.IsEmpty(self.StatusData.PreviousIsEmpty);

			self.onUserProfileObjectChanged();
            // notify listeners
            self.Events.CancelEdit(!self.Events.CancelEdit());

			// reset contextIds status
			self.controller.ObjectsDataSet.resetContextIdDirty(self.contextId);
			self.resetValidation();

            if (self.StatusData.isPopup())
                self.closePopup(false);
        };

        this.EndEdit = function () {
			GO.log("UserProfileForm", "EndEdit on UserProfileObject");

            self.SavedData = null;
			self.StatusData.DisplayMode('view');
            self.StatusData.IsBusy(false);

            // notify listeners
			self.UserProfileObject().StatusData.lastEditedTime(new Date().getTime());
            self.Events.EndEdit(!self.Events.EndEdit());
        };

        this.CreateNew = function () {
			GO.log("UserProfileForm", "Creating new UserProfileObject");
            self.SavedData = new Solid.Web.Model.DataObjects.UserProfileObject();
			self.SavedData.CopyValuesFrom(self.UserProfileObject());
            self.StatusData.PreviousIsEmpty = self.StatusData.IsEmpty();
			self.controller.ObjectsDataSet.cleanContext(self.contextId);
	        var objectToAdd = Solid.Web.Model.DataObjects.UserProfileObjectFactory.createNew(self.controller.ObjectsDataSet, self.contextId);
			self.SetUserProfileObject(objectToAdd);


			
			self.StatusData.DisplayMode('edit');
            self.StatusData.IsEmpty(false);

  
            // notify listeners
            self.Events.StartEdit(!self.Events.StartEdit());
        };

		this.OnBeforeSave = function() {
			var diff = GO.compareEntities(self.SavedData, self.UserProfileObject());
		    GO.log("UserProfileForm", "Before Saving (diff)", diff);

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
					self.OnUserProfileSaved(self.UserProfileObject());
				}
				else {
					var configuration = {};			
					configuration.contextId = self.contextId;
					configuration.include = this.include;
					configuration.objectToSave = self.GetUserProfileObject();
					configuration.successHandler =  self.OnUserProfileSaved;
					configuration.errorHandler = self.ShowError;		
					GO.log("UserProfileForm", "Sending payload to UserProfileObject DataStore");
					self.DataStore.SaveObject(configuration);
				}
			}

			if (self.customViewModel !== undefined && self.customViewModel.onAfterSave !== undefined) {
				self.customViewModel.onAfterSave();
			}
        };

		this.onConfirmDelete = function (confirm) {
            if (confirm === true) {
				var objectToDelete = self.GetUserProfileObject()
				var configuration = {};			
				configuration.contextId = self.contextId;
				configuration.pks = {
					Uri : objectToDelete.Data.Uri()
			};          

				configuration.successHandler =  self.OnUserProfileDeleted;
				configuration.errorHandler = self.ShowError;

				self.DataStore.DeleteObject(configuration);
            }
            else {
                self.StatusData.IsBusy(false);
            }
		};

        this.Delete = function () {
            self.StatusData.IsBusy(true);
			self.controller.applicationController.showConfirmPopup(self, Solid.Web.Messages.confirmDeleteMessage.replace(/%ENTITY%/g, "UserProfile"), Solid.Web.Messages.confirmDeletePopupTitle, self.onConfirmDelete, self.contextId);
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
 		
			// Sub-grids ViewModels
			self.VisitedPlaceItemsGridViewModel.release();
			self.VisitedPlaceItemsGridViewModel = null;
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
		window.ApplicationSourceHandler.onSourceLoaded("/ViewModels/UserProfile/UserProfileFormViewModel.js");
} ());