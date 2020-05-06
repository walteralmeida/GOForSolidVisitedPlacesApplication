﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
////////////////////////////////////////////////////////////////////////////////////////////

(function () {
	//
	Solid.Web.ViewModels.UserProfileGridViewModel = function(controller, $gridContainer, sDataBindRoot, $popupContainer, parentContextId, options) {
		var self = this;

		this.subscriptions = [];

		this.controller = controller;

		this.sDataBindRoot = sDataBindRoot ? sDataBindRoot : "";

		this.sDatabindRootWithDot = this.sDataBindRoot !== "" ? this.sDataBindRoot + "." : this.sDataBindRoot;

		this.$gridContainer = $gridContainer;
        this.$popupContainer = $popupContainer;

		this.gridInitialised = false;

		this.contextId = parentContextId ? parentContextId.concat([this.controller.applicationController.getNextContextId()]) : [this.controller.applicationController.getNextContextId()];

		this.alternateTitle = options && options.alternateTitle;

		this.DataStore = new Solid.Web.Model.DataStores.DataStore(controller.applicationController.ObjectsDataSet, 'gouser');

		this.isMemoryOnlyCollection = false;

		// Object Data
		this.GOUserObjectCollection = ko.observableArray();

		self.subscriptions.push(self.GOUserObjectCollection.subscribe( function (newValue) {
			if (newValue) { for (var i = 0; i < newValue.length; i++) { newValue[i].ObjectsDataSet = self.controller.ObjectsDataSet; } }
		}));

		// Filter attributes
		this.baseFilterPredicate = null;
		this.filterPredicate = null;
	    this.filterParameters = null;


		this.include = null;
		this.sortColumnName = ko.observable(null); // rather bind to the oSort object
        this.sortOrder = ko.observable(null); // rather bind to the oSort object
		this.multiSortOrderBy = "";
		this.multiSortMode = false;

        this.oSort = ko.pureComputed({
            read:function() {
                if(this.sortColumnName() === null || this.sortOrder() === null)
                    return null;
                return {
                    columnName:this.sortColumnName(),
                    order:this.sortOrder()
                };
            },
            write:function(oNewValue) {
                if(!oNewValue || oNewValue.columnName == undefined || oNewValue.order == undefined) {
                    //debugger;
                    throw new Error("correct format of sort option is : { columnName:'col', order:'desc' }");
                }
                this.sortColumnName(oNewValue.columnName);
                this.sortOrder(oNewValue.order);
            }
        }, this);

		this.selectedObjectId = ko.observable(null);
		this.selectedObject = ko.pureComputed(function () {
            if (this.selectedObjectId() == -1)
                return null;
            return this.controller.ObjectsDataSet.GetObjectByInternalId("GOUser", this.selectedObjectId());
        }, this);

        self.subscriptions.push(this.selectedObjectId.subscribe ( function( newValue ) {
        	if (self.gridSettings.selectedId() != newValue )
                self.gridSettings.selectedId(newValue);
        }));

        this.totalPageNumber = ko.observable(0);
        this.totalCollection = ko.observable(0);

		// manage pagination
		this.ignorePageChange = false;

        this.pageNumber = ko.observable(0); // 0 based
        this.pageSize = 15;

        this.bAutoHide = false;
	  	self.subscriptions.push(this.totalPageNumber.subscribe(function (newValue) {
        	if (self.gridSettings)
                self.totalPageNumber(newValue);

        }));
		this.doubleClickCommand = ko.observable({ line: 0 });		

		// Grid Status Data
        this.StatusData = {
            // Control properties
            IsBusy: ko.observable(false),
            IsEnabled: ko.observable(true),
			IsVisible: ko.observable(true),
            IsEmpty: ko.pureComputed( function () {
                return !self.GOUserObjectCollection() || self.GOUserObjectCollection().length === 0;
            }),
            ShowTitle: ko.observable(true),
			DisplayMode: ko.observable('view')
		};

		// Integrate custom code if any
		if (Solid.Web.ViewModels.UserProfileGridViewModelCustom !== undefined) {
		    this.customViewModel = new Solid.Web.ViewModels.UserProfileGridViewModelCustom(self);
		};

		this.StatusData.Title = ko.pureComputed(function() {
			if (self.customViewModel && self.customViewModel.Title !== undefined) {
				return self.customViewModel.Title();
			}
			return self.alternateTitle || "Registrated Users";
		});

		self.subscriptions.push(this.StatusData.IsEnabled.subscribe(function (newValue) {
            if (self.GridWidget)
                self.GridWidget.enabled(newValue);
        }));		

		// Events
        this.Events = {
			GOUserCollectionLoaded: ko.observable(false),
			CollectionLoaded: ko.observable(false),
			Rebound : ko.observable(false)
        };

		this.CallAfterSaveRelatedEntity = function () {
			ko.postbox.publish('GOUser.ChangedOnGrid', { contextId: self.contextId, action: 'add', gridName: 'UserProfileGrid' });
		}

        this.SetGOUserObjectCollection = function(dataObjectCollection) {
		    GO.log("UserProfileGrid", "Setting new collection");

            self.selectedObjectId(null);

			var currentCollection = self.GOUserObjectCollection();
		    var currentCount = currentCollection.length;

            if(!GenerativeObjects.Web.GetEnvironment().isMobile) {// mobile infinite lists need to keep the full list of objects
				if (!self.isMemoryOnlyCollection) {//case isMemoryOnly => don't remove new objects
					for (var i = 0; i < currentCount; i++) {
						if (currentCollection[i].Data.IsNew() == true) {
							self.controller.ObjectsDataSet.RemoveObject(currentCollection[i]);
						}
					}
				}
				self.GOUserObjectCollection.removeAll();
			}

			if (dataObjectCollection) {
				var newCollection = [];
				var newCount = dataObjectCollection.length;
				for (var i=0; i < newCount; i++) {
			        if (dataObjectCollection[i].Data.IsMarkedForDeletion())
			            continue;

                	newCollection.push(dataObjectCollection[i]);
				}
				self.GOUserObjectCollection(newCollection);
            }
        };

		this.Rebind = function(forceExternal) {
            if (forceExternal || (!self.isMemoryOnlyCollection && self.StatusData.DisplayMode() === 'view')) {
				self.LoadGOUserObjectCollection();
			}
			// If we're only working in memory, we simulate a Rebind by reloading observables
            else {
				if (self.getSourceCollection) {
					var allObjects = self.getSourceCollection();
                    self.totalCollection(allObjects.length);
					self.SetGOUserObjectCollection(allObjects);
				}
            }

            self.Events.Rebound(!self.Events.Rebound());
		};

		this.LoadGOUserObjectCollection = function (configuration) {
			if (!self.DataStore)		
				return;

			self.StatusData.IsBusy(true);

			var configuration = $.merge({
				contextId : self.contextId,
				successHandler:self.OnGOUserObjectCollectionCounted,
				errorHandler: self.ShowError
	        }, configuration || {} );

			if (self.filterPredicate !== undefined  && self.filterPredicate !== null) {
                configuration.filterPredicate = self.filterPredicate;
            }

            if (self.filterParameters !== undefined && self.filterParameters !== null) {
                configuration.filterParameters = self.filterParameters;
            }

            if (self.include) {
                configuration.include = self.include;
            }
		    GO.log("UserProfileGrid", "Calling count");
			self.DataStore.CountObjects(configuration);
        };

		this.OnGOUserObjectCollectionCounted = function (count) {
		    GO.log("UserProfileGrid", count + " elements counted");
			self.totalCollection(count);
			self.totalPageNumber( Math.ceil(count / self.pageSize ) );
			if (self.pageNumber() >= self.totalPageNumber())
				self.pageNumber(self.totalPageNumber() > 0  ? self.totalPageNumber()-1 : 0);

			self.LoadPagedGOUserObjectCollection();
		};
		this.LoadPagedGOUserObjectCollection = function (configuration) {
			if (!self.DataStore)		
				return;

			self.StatusData.IsBusy(true);

			var configuration = $.merge({
				contextId : self.contextId,
				pageSize:self.pageSize,
	            pageNumber:1+parseInt(self.pageNumber()), // model and widget is 0-based, so we convert
				successHandler:self.OnGOUserObjectCollectionLoaded,
				errorHandler: self.ShowError
	        }, configuration || {} );


			if (self.filterParameters !== undefined && self.filterPredicate !== null) {
                configuration.filterPredicate = self.filterPredicate;
            }

            if (self.filterParameters !== undefined && self.filterParameters !== null) {
                configuration.filterParameters = self.filterParameters;
            }

			if (self.sortColumnName() && self.multiSortOrderBy) {
				// Multi-sort is enabled by setting sortColumn to null, and sortOrder contains the full orderby predicate
				configuration.sortOrder = self.sortColumnName() + " " + self.sortOrder() + self.multiSortOrderBy;
				configuration.sortColumn = null;
			}
			else {
				if (self.sortOrder()) {
					configuration.sortOrder = self.sortOrder();
				}
				if (self.sortColumnName()) {
					configuration.sortColumn = self.sortColumnName();
				}
			}

			if (self.include) {
                configuration.include = self.include;
            }

		    GO.log("UserProfileGrid", "Calling load");
			self.DataStore.LoadObjectCollection(configuration);
        };

        // Define the load completed functions
		this.firstLoad = true;

        this.OnGOUserObjectCollectionLoaded = function (objectsLoaded) {
		    GO.log("UserProfileGrid", "GOUserCollection loaded");
            self.SetGOUserObjectCollection(objectsLoaded);
			self.StatusData.IsBusy(false);
            // the next line is to force notification of change: this way we emulate event handling
            self.Events.GOUserCollectionLoaded(!self.Events.GOUserCollectionLoaded());
            self.Events.CollectionLoaded(!self.Events.CollectionLoaded());

 
	        self.firstLoad = false;

			// And we recenter the popup if the grid is part of one (large grid may increase the popup height out of scope)
			if(self.$popupContainer)
				ApplicationController.centerPopup();
        };


		this.selectedId = ko.observable(null);
		this.sortingOptions = ko.observable(self.oSort);
		this.commandExecuted = ko.observable({ command: null, line: 0 });

		// <customGrid>
		this.gridSettings = {
			sGridName: '',
			sDataBindRoot: self.sDataBindRoot,
			sContainerId: '',
			oSort: self.oSort,
			iMaxHeight: 0,
			sDefaultSortOrder: 'desc', // if the datagrid has to guess, that is the defaul sorting order
			selectedId: self.selectedId,
			sortingOptions: self.sortingOptions,
			commandExecuted: self.commandExecuted,
			doubleClickCommand: self.doubleClickCommand,
			dataCollectionName: 'GOUserObjectCollection',
			dataCollectionObservable: self.GOUserObjectCollection,
			iNbPageNumberToShow: 5, // always odd
			methods: {
				updatePagination: function () {
                    // This is called everytime pageNumber's value or totalPageNumer's value has changed, recalculating the pagenumbers to display
                    var iStart = 0,
    				    iEnd = self.totalPageNumber(),
                        pageCollection = [];
    				if (self.gridSettings.iNbPageNumberToShow !== null) {
    				   var iDistribution = Math.floor(self.gridSettings.iNbPageNumberToShow / 2); // from 5 to 2, 3 to 1, 1 to 0 ...
    				   iStart = Math.max(iStart, self.pageNumber() - iDistribution); // 3 - 2
    				   iEnd = Math.min(iEnd, iStart + self.gridSettings.iNbPageNumberToShow); // 3 + 2

    				   // re-adjust the start if we reached the end
    				   iStart = Math.max(0, iEnd - self.gridSettings.iNbPageNumberToShow);
    				}



    	            // build the page numbers
    	            for (var i = iStart; i < iEnd; i++) {
    					pageCollection.push({
    						pagenumber: i,
    						domClass: self.pageNumber() == i ? true : false,
    						text: i + 1
    					});
    	            }

                    // return the correct pageNumbers to the pageItems computed
    	            return pageCollection;
                },
                paginationClickHandler: function(data, e){
                    e.preventDefault();
        		    e.stopPropagation();
        		    // should fire the event
        		    if (parseInt(e.currentTarget.getAttribute('data-pagenumber')) > -1
                    && parseInt(e.currentTarget.getAttribute('data-pagenumber')) < self.totalPageNumber()) {
        		        self.pageNumber(e.currentTarget.getAttribute('data-pagenumber'));
        		    }
                }
			}
		};
		this.pageItems = ko.computed(function(){
			return self.gridSettings.methods.updatePagination();
		});
		// function to initialize the grid widget
        this.gridConfiguration = function () {

			if (self.gridInitialised)
				return;

	        if (self.gridSettings.oSort === undefined)
	            throw new TypeError('oSort option is missing. Specify at least null');
	        // check for the sorting options
	        if (self.gridSettings.oSort() !== null) {
	            if (!self.gridSettings.oSort().columnName || !self.gridSettings.oSort().order)
	                throw new TypeError('oSort object badly configured : please provide "columnName" and "order"');
	            if (self.gridSettings.oSort().order !== 'desc' && self.gridSettings.oSort().order !== 'asc' && self.gridSettings.oSort().order !== 'DESC' && self.gridSettings.oSort().order !== 'ASC')
	                throw new TypeError('order should be either "asc" or "desc"');
	        }

	        if (self.gridSettings.sDataBindRoot !== undefined) {
	            if (self.gridSettings.sDataBindRoot === null || self.gridSettings.sDataBindRoot === "") {
	                self.gridSettings.sDataBindRoot = "";
	            } else {
	                self.gridSettings.sDataBindRoot = self.gridSettings.sDataBindRoot + ".";
	            }
	        }

        	self.subscriptions.push(self.gridSettings.selectedId.subscribe(
          	    // update the UI state, then the DOM, then animate, then back to normal
            	function( sId ) {
                    if (self.selectedObjectId() !== sId) {
	                	self.selectedObjectId( sId );
					}
	        	}
			));

        	// listen for sort request
        	self.subscriptions.push(self.gridSettings.sortingOptions.subscribe(
        	    function( oSort ) {
            	    self.sortColumnName( oSort.columnName );
            	    self.sortOrder( oSort.order );

                  if (self.totalPageNumber() < 2 && !self.multiSortOrderBy) {
						self.GOUserObjectCollection.sort(GO.getSortFunction(oSort.columnName, oSort.order));
					}
					else {
						self.LoadGOUserObjectCollection();
					}
  	    }));

			// translate contextual menu commands to
			self.subscriptions.push(self.gridSettings.commandExecuted.subscribe(
            	function( oCommand ) {
            	    self.commands[ oCommand.command ].call(self, oCommand.line );
        	}));


			self.subscriptions.push(self.pageNumber.subscribe(
                function( iPageNumber ) {
                    self.pageNumber(iPageNumber);
					if (!self.ignorePageChange) {
	                    self.LoadGOUserObjectCollection();
					}
			}));

            if (self.gridSettings.sDataBindRoot !== undefined) {
	            if (self.gridSettings.sDataBindRoot === null || self.gridSettings.sDataBindRoot === "") {
	                self.gridSettings.sDataBindRoot = "";
	            } else {
	                self.gridSettings.sDataBindRoot = self.gridSettings.sDataBindRoot + ".";
	            }
	        }
 
			self.gridInitialised = true;
		};



		this.release = function (){

			for(var i=0; i<self.subscriptions.length;i++)
			{
				self.subscriptions[i].dispose();
			}
			self.subscriptions = [];

			self.DataStore = null;

			if(self.customViewModel) {
				if(self.customViewModel.release) {
					self.customViewModel.release();
				}
				self.customViewModel = null;
			}

			if(self.$gridContainer !== null && self.$gridContainer[0])
				ko.removeNode(self.$gridContainer[0]);

			self.controller.ObjectsDataSet.cleanContext(self.contextId);

			// Clear multi-sort controller listeners
			document.removeEventListener('keydown', self.enterMultiSortMode);
			document.removeEventListener('keyup', self.exitMultiSortMode);
		};

        this.ShowError = function (errorMessage, title) {
		    ApplicationController.showAlertPopup(self, errorMessage, title, null, self.contextId);
            self.StatusData.IsBusy(false);
        };

		this.initialize = function () {
			// Call custom initialize if defined
			if (self.customViewModel && self.customViewModel.onBeforeInitialize !== undefined) {
			    self.customViewModel.onBeforeInitialize();
			}

			// git commit (07.10) comment for the following commenting out: Grid Widgets are now initialize through a knockoutbinding
			// self.gridWidgetInitializer();

			// fix sort problem in data set
            self.subscriptions.push(self.Events.GOUserCollectionLoaded.subscribe(function () {
				// if doing multi-sort, this changes the result... so disabled for multi-sort pending understanding why it was needed
				if(self.sortColumnName() !== null && !self.multiSortOrderBy) {
					self.GOUserObjectCollection.sort(GO.getSortFunction(self.sortColumnName(), self.sortOrder()));
				}
			}));

			// Subscribe to changes on other grids with the same object in order to rebind the current grid
			self.subscriptions.push(ko.postbox.subscribe("GOUser.ChangedOnGrid", function(payload) {
				// Checking the caller is not the current Grid
				if (payload.gridName !== 'UserProfileGrid' || JSON.stringify(payload.contextId) != JSON.stringify(self.contextId)) {
					self.Rebind();
				}
			}));

			// Call custom initialize if defined
			if (self.customViewModel && self.customViewModel.initialize !== undefined) {
			    self.customViewModel.initialize();
			}

			// For now, Shift key to enter/exit grid multi-sort mode
			document.addEventListener('keydown', self.enterMultiSortMode);
			document.addEventListener('keyup', self.exitMultiSortMode);

        };

		this.enterMultiSortMode = function (event) {
			if (event.key == "Shift")
				self.multiSortMode = true;
		}

		this.exitMultiSortMode = function (event) {
			if (event.key == "Shift")
				self.multiSortMode = false;
		}

		this.setGridPageNumber = function(pageNumber) {
			self.ignorePageChange = true;
			self.pageNumber(pageNumber);
			self.ignorePageChange = false;
		};

 
		this.onHeaderClicked = function (colName) {
			
			if (self.gridSettings.oSort() === null) {
				self.gridSettings.oSort(
					{
						columnName: colName,
						order: self.gridSettings.sDefaultSortOrder
					}
				);
			} else {
				var oCurrentColName = self.gridSettings.oSort().columnName,
					sCurrentSortOrder = self.gridSettings.oSort().order;

				if (!self.multiSortMode) {
					self.multiSortOrderBy = "";
					// 2 cases : change the sort order only or change the sorted column
					if (colName === oCurrentColName) {
						// invert the sort order option
						self.gridSettings.oSort({ columnName: colName, order: (sCurrentSortOrder === 'desc') ? 'asc' : 'desc' });
					} else {
						self.gridSettings.oSort({ columnName: colName, order: (sCurrentSortOrder === null) ? self.gridSettings.sDefaultSortOrder : sCurrentSortOrder });
					}
				}
				else {
					if (colName === oCurrentColName) {
						// invert the 'main' order option, and retain current multiSortOrderBy, if any
						self.gridSettings.oSort({ columnName: colName, order: (sCurrentSortOrder === 'desc') ? 'asc' : 'desc' });
					}
					else {
						if (self.multiSortOrderBy.indexOf(colName + " asc") !== -1) {
							// retain both 'main' and multi-sort, but invert the multi-sort for the clicked column
							self.multiSortOrderBy = self.multiSortOrderBy.replace(colName + " asc", colName + " desc");
						}
						else if (self.multiSortOrderBy.indexOf(colName + " desc") !== -1) {
							// retain both 'main' and multi-sort, but invert the multi-sort for the clicked column
							self.multiSortOrderBy = self.multiSortOrderBy.replace(colName + " desc", colName + " asc");
						}
						else {
							// add the newly clicked column to the multi-sort, and retain the existing 'main' sort column settings
							self.multiSortOrderBy += "," + colName + " " + self.gridSettings.sDefaultSortOrder;
						}
					}
				}
			}

			// Set Sorting
			self.sortingOptions(self.gridSettings.oSort());
		};

		this.onLineClicked = function (data, event) {
			self.selectedId(data.Data.InternalObjectId());
		};

		this.onLineDblClicked = function (data, event) {
			if (window.getSelection) { window.getSelection().removeAllRanges(); }
			else if (document.selection) { document.selection.empty(); }
			self.doubleClickCommand({
				line: data.Data.InternalObjectId()
			});
		};


		this.enabled = ko.observable(true);

 
		this.initialize();

		// Apply bindings
		if (self.$gridContainer) {
			ko.applyBindings(self, self.$gridContainer.get(0));
    		self.StatusData.IsBusy(false);
		}
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/ViewModels/GOUser/UserProfileGridViewModel.js");
} ());
