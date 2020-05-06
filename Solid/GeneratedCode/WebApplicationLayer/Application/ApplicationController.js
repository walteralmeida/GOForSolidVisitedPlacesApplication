﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
(function (global) {
    Solid.Web.Application.Controller = function () {
        var self = this;

        this.sourceHandler = global.ApplicationSourceHandler;
		this.ObjectsDataSet = new Solid.Web.Model.DataSets.ObjectsDataSet();

        this.viewLoader = new Solid.Web.Views.viewLoader();

		if (Solid.Web.Routing.Custom) {
		    this.customRouting = new Solid.Web.Routing.Custom(this);
		}

		// Hook up custom application controller 
		if (Solid.Web.Application.ControllerCustom) {
			this.customApplicationController = new Solid.Web.Application.ControllerCustom(this);
		}
		
		this.getProxyForComponent = function(componentName) {
			if (self[componentName + "Proxy"] === undefined)
				self[componentName + "Proxy"] = new Solid.Web.Model.Components[componentName + "Proxy"](this.ObjectsDataSet);

			return self[componentName + "Proxy"];
		};

		// Not Used anymore
		this.numberZoneLoaded = 0;
		this.sourcesLoaded = false;

		this.getPageNameForNode = function (nodeName) {
			var pageName = null;
			
			switch(nodeName) {
				case 'VisitedPlace':
					pageName = 'VisitedPlacePage';
					break;
				case 'CountryDetails':
					pageName = 'CountryPage';
					break;
				case 'Locations':
					pageName = 'LocationItemsPage';
					break;
				case 'Users':
					pageName = 'UsersPage';
					break;
				case 'MyProfile':
					pageName = 'MyProfilePage';
					break;
				case 'Places':
					pageName = 'PlaceItemsPage';
					break;
				case 'UserProfile':
					pageName = 'UserProfilePage';
					break;
				case 'PlaceDetails':
					pageName = 'PlacePage';
					break;
				case 'LocationDetails':
					pageName = 'LocationPage';
					break;
				case 'Countries':
					pageName = 'CountryItemsPage';
					break;
			}

			return pageName;
		};

		this.getRootHashTag = function (nodeName) {
		    var root = '/';

		    if (self.customRouting && self.customRouting.getRootHashTag) {
		        root += self.customRouting.getRootHashTag(nodeName);
		    }

			return root;
		};

		this.convertNodeNameToHash = function(nodeName) {
			var root = self.getRootHashTag(nodeName);

			switch (nodeName) {
			case 'VisitedPlace':
				return root + 'VisitedPlaces/VisitedPlace';
			case 'CountryDetails':
				return root + 'Countries/CountryDetails';
			case 'Locations':
				return root + 'Locations';
			case 'Users':
				return root + 'Users';
			case 'MyProfile':
				return root + 'MyProfile';
			case 'Places':
				return root + 'Places';
			case 'UserProfile':
				return root + 'Users/UserProfile';
			case 'PlaceDetails':
				return root + 'Places/PlaceDetails';
			case 'LocationDetails':
				return root + 'Locations/LocationDetails';
			case 'Countries':
				return root + 'Countries';
			}
		
			return null;
		};

		this.navigateTo = function (nodeName) {
		    GO.log("App", "Navigating to " + nodeName);
			var hash = self.convertNodeNameToHash(nodeName);
            //Forcing reload of the current page
		    if (window.location.hash == "#!" + hash) {
			    $.sammy().refresh();
			} else {
				if(Solid.Web.Controllers.IsInEditMode && Solid.Web.Controllers.IsInEditMode()) {
					if(!confirm(Solid.Web.Messages.unsavedChangesMessage))
						return;
				}
		
			    window.location.hash = "!" + hash;
			}
		};

		this.internalNavigateTo = function (nodeName) {
		    GO.log("App", "Internal navigate to " + nodeName);
		
			var pageName = self.getPageNameForNode(nodeName);

			switch(pageName)
			{
				case "CountryPage":
				case "VisitedPlacePage":
				case "MyProfilePage":
				case "CountryItemsPage":
				case "PlacePage":
				case "UserProfilePage":
				case "LocationPage":
				case "PlaceItemsPage":
				case "LocationItemsPage":
					if (window.masterPageId !== 'e71bc82d-442d-41a6-831e-eae563c45cb6') {
						window.masterPageId = 'e71bc82d-442d-41a6-831e-eae563c45cb6';
						self.viewLoader.loadView({ viewName: 'Applicatione71bc82d-442d-41a6-831e-eae563c45cb6Layout', successHandler: self.onMasterPageReady, errorHandler: self.onLoadViewError, context: nodeName });
					}
					else {
						self.onMasterPageReady(null, nodeName, null);
					}
					break;
				case "UsersPage":
					if (window.masterPageId !== '30599230-22bb-4108-a6c2-ec314d5f1b04') {
						window.masterPageId = '30599230-22bb-4108-a6c2-ec314d5f1b04';
						self.viewLoader.loadView({ viewName: 'Application30599230-22bb-4108-a6c2-ec314d5f1b04Layout', successHandler: self.onMasterPageReady, errorHandler: self.onLoadViewError, context: nodeName });
					}
					else {
						self.onMasterPageReady(null, nodeName, null);
					}
					break;
			}
		};
		
		this.onMasterPageReady = function (viewData, nodeName, zone) {
		    var pageName = self.getPageNameForNode(nodeName);

		    //Get sources now
		    self.numberZoneLoaded = 0;
		    self.sourcesLoaded = false;
            self.sourceHandler.EnsureSourcesForElement(pageName, "Page", self.onPageRequiredSourcesAvailable);

		    if (viewData !== null) {
		        if (self.viewModel) {
		            self.viewModel.release();
		        }

		        $('#form').html(viewData);

		        self.viewModel = new Solid.Web.Application.ViewModel(self);
		    }

			self.updateBreadCrumbs(nodeName);											

			self.prepareOverlay(false);
			
			if (self.viewModel.pageController()) {
			    self.viewModel.pageController().release();
			}
			
			switch (window.masterPageId)
			{
				case 'e71bc82d-442d-41a6-831e-eae563c45cb6':		
					$('#contentZone_MainZone').html("");
					self.viewLoader.loadView({ viewName: pageName + "View.MainZone", zone: "MainZone", successHandler: self.onViewLoaded, errorHandler: self.onLoadViewError, context: pageName });
					break;
				case '30599230-22bb-4108-a6c2-ec314d5f1b04':		
					$('#contentZone_LeftColumn').html("");
					$('#contentZone_RightColumn').html("");
					self.viewLoader.loadView({ viewName: pageName + "View.LeftColumn", zone: "LeftColumn", successHandler: self.onViewLoaded, errorHandler: self.onLoadViewError, context: pageName });
					self.viewLoader.loadView({ viewName: pageName + "View.RightColumn", zone: "RightColumn", successHandler: self.onViewLoaded, errorHandler: self.onLoadViewError, context: pageName });
					break;
			}
		};

        this.onViewLoaded = function (viewData, viewName, zone) {

			if(viewData !== "" && viewData.nodeName !== "#document") {	
				$('#contentZone_' + zone ).html(viewData);
			}
			
			self.numberZoneLoaded++;
			switch (window.masterPageId)
			{
				case 'e71bc82d-442d-41a6-831e-eae563c45cb6':
					if (self.numberZoneLoaded < 1)
						return ;
					break;
				case '30599230-22bb-4108-a6c2-ec314d5f1b04':
					if (self.numberZoneLoaded < 2)
						return ;
					break;
			}	

			if (self.sourcesLoaded === true)
			    self.onPageReady(viewName);
        };


		this.onPageRequiredSourcesAvailable = function (pageName) {
		    self.sourcesLoaded = true;

			switch (window.masterPageId)
			{
				case 'e71bc82d-442d-41a6-831e-eae563c45cb6':
					if (self.numberZoneLoaded < 1)
						return ;
					break;
				case '30599230-22bb-4108-a6c2-ec314d5f1b04':
					if (self.numberZoneLoaded < 2)
						return ;
					break;
			}	

		    self.onPageReady(pageName);
		};
		
		this.onPageReady = function (pageName) {
			// Most page Loading errors occur while data-binding and loading component
			try {
				self.viewModel.pageController(Solid.Web.Controllers[pageName + "Controller"](self));
				document.title = self.viewModel.pageTitle();
				self.viewModel.updateMenu();
				self.removeOverlay(false);
				// we scroll back to top. because without this, chrome preserve the scroll position of previous page when navigating... However sideeffect is that when doing page back, scroll is reset to top where it would be better to preserve to previous version...
				window.scrollTo(0, 0);
			} catch (err) {
                $("#overlay").find(".overlayLoader-text").text(Solid.Web.Messages.genericPageError)
		        throw err;
		    }
        };

		this.onLoadViewError = function (error, status) {
		    $("#overlay").find(".overlayLoader-text").text(Solid.Web.Messages.genericPageError + " Status: " + status + ", Error: " + error);
		};
		
		this.errorHandler = function (jqXHR, errorThrown, errorHandler, additionalMessage, title) {
		
			// Give custom extension opportunity to handle the error first
			if (self.customApplicationController && self.customApplicationController.errorHandler) {
				if (self.customApplicationController.errorHandler(jqXHR, errorThrown, errorHandler, additionalMessage, title))
					return;
			}
			if (jqXHR.status === 401) {     // Unauthorized generic = navigate to log-in screen, unless is a log-in failure (which means we're already at log-in screen)
		        var why = $.parseJSON(jqXHR.responseText);
		        if (why.error && why.error.reason && why.error.reason === "authenticationFailed") {
		            errorHandler(Solid.Web.Messages.unknownUsernameOrPassword);
		        }
		        else {
		            self.redirectToLoginPage();
		        }
		    }

            // 403 Forbidden - check why and handle accordingly
		    else if (jqXHR.status === 403) {      // Forbidden
		        var why = $.parseJSON(jqXHR.responseText);

				// Is an active password policy forcing a password change?
				if (typeof why === "string" && why.indexOf("passwordHasExpired") > -1) {
					// Redirect to the changePassword page, onpassing the reason (which includes the userId)
					var changePasswordUrl = Solid.Web.Application.BaseURL + "Membership/changePassword.html?" + why + window.location.hash;
					window.location.replace(changePasswordUrl);
					return;
				}
		        else if (why.error && why.error.reason){ 
                    // If was a security token error, redirect to log-in page, onpassing the context 'reason)
		            if (    why.error.reason === "expiredSecurityToken"
                        ||  why.error.reason === "invalidSecurityToken"
                        ||  why.error.reason === "nullSecurityToken"
						) 
					{ 
					    self.redirectToLoginPage(why.error.reason);
					}
					else {
						// Not a security token issue, which means it's a GO Role being denied access to entity / component / navigation node
					    if (errorHandler) {
					        if (why.error.isUserFriendlyError) {
					            errorHandler(why.error.message, Solid.Web.Messages.authorization);
					        }
					        else {
					            errorHandler(Solid.Web.Messages.permissionDenied, Solid.Web.Messages.authorization);
					        }
						}
						else {
							console.warn(Solid.Web.Messages.permissionDenied + why.error.message);
						}	
					}
		        }
				else {
					// Should never get here (means app is sending a 403 with incorrectly formatted response)
					console.warn("ApplicationController unexpected response with status 403");
					self.redirectToLoginPage();
				}
		    }
			else if (errorThrown !== "abort") {
		        var resultError = JSON.parse(jqXHR.responseText.replace(/[\n]/g, ' ').replace(/[\r]/g, ' ').replace(/[\t]/g, ' '));

		        var title = title || Solid.Web.Messages.popupTitle;
		        var message = Solid.Web.Messages.genericPopupError;
		        message += additionalMessage ? "<br><span class='error-msg'>[" + additionalMessage + "]</span>" : "";

		        var isGeneric = true;

                // Displaying userFriendlyMessage or logging error message
		        if (resultError.error && resultError.error.isUserFriendlyError) {
		            message = resultError.error.message;
		            isGeneric = false;
		        } else {
		            console.warn(resultError.error.message, new Error().stack);
		        }

		        if (errorHandler) {
		            errorHandler(message, title);
		        } else if(!isGeneric) {
		            console.warn(message);
		        }
		    }
		};

		this.redirectToLoginPage = function (prompt, excludeHash) {
		    var queryParams = new GO.QueryParams();
			if (prompt) {
			    queryParams.add("context", prompt);
			}
			var hash = excludeHash ? "" : window.location.hash;
            var loginurl = Solid.Web.Application.BaseURL + "Membership/Login.html" + queryParams.buildWithQuestionMark() + hash;
			if (window.location.href != loginurl) {
				window.location = loginurl;
			}
		};

		this.currentContextId = 0;

		this.getNextContextId = function () {
			self.currentContextId++;
			if (self.currentContextId === 9007199254740992)
				self.currentContextId = 0;

			return self.currentContextId;
		};

		// Popup Management 
		// Number of popups in stack
		this.popupCount = 0;
		// current popup id
		this.currentPopupId = null;
		// stack of popups 
		this.currentPopupStack = {};
		// stack of popups view models
		this.currentPopupViewModelStack = {};
		// true if at least one popup on the stack => overlay already set
		this.overlaySet = false;

		// Prepare the overlay and show popup container for showing popups
		this.prepareOverlay = function (withPopup, exitonclickout) {
		    if (self.overlaySet == false) {
		        var overlay = $("<div>")
                    .attr("id", "overlay")
                    .addClass("overlay");		        
                
		        $("body").append(overlay);

		        if (withPopup) {
		            $("#popupContainer").fadeIn();
					if (exitonclickout === true) {
						$("#overlay").click(function () { self.closeAllPopups(); });
					}
				} else {
					var overlayLoader = $("<div>")
                        .addClass("overlayLoader")
                        .append($("<div>").addClass("overlayLoader-image"))
                        .append($("<div>").text(Solid.Web.Messages.pageLoadingMessage).addClass("overlayLoader-text"))
                        .appendTo(overlay);

		            overlayLoader.position({ my: "center center", at: "center center", of: overlay });
				}
		        self.overlaySet = true;
		    }
		};

		// Remove the overlay and hide popup container when no more popups to show
		this.removeOverlay = function (withPopup) {
		    if (self.overlaySet == true) {
		        document.body.removeChild(document.getElementById("overlay"));
		        if (withPopup)
		            $("#popupContainer").fadeOut();
		        self.overlaySet = false;
            }
		};

		// Non-intrusive Message boxes for positive feedback 
		this.showInfoMessageBox = function (htmlContent, title, isSticky) {
		    var noticeBox = new Solid.Web.ViewModels.NoticeBoxViewModel(htmlContent, title, isSticky);
		    noticeBox.showAsMessageBox('info');
		};

		this.showErrorMessageBox = function (htmlContent, title, isSticky) {
		    var noticeBox = new Solid.Web.ViewModels.NoticeBoxViewModel(htmlContent, title, isSticky);
		    noticeBox.showAsMessageBox('error');
		};

		this.showEditPopup = function (formName, caller, objectToEdit, isMemoryOnly, contextId, popupWidth, isOpenInEditMode) {
			// Displaying a temporary overlay while loading ressource		    
			self.prepareOverlay(false);
		    self.sourceHandler.EnsureSourcesForElement(formName,"Form", function()  {
		        self.removeOverlay(); // removing temporary overlay
				var viewModel = self.preparePopup (formName, caller, contextId, popupWidth);
				viewModel.isMemoryOnly = isMemoryOnly;
				viewModel.isOpenInEditMode = isOpenInEditMode;
				objectToEdit.contextIds.push(viewModel.contextId);
				viewModel.showAsEditPopup(caller, objectToEdit);
			});
		};

		this.showCreateNewPopup = function (formName, caller, defaultObject, isMemoryOnly, contextId, popupWidth) {
			// Displaying a temporary overlay while loading ressource		    
		    self.prepareOverlay(false);

		    self.sourceHandler.EnsureSourcesForElement(formName,"Form" , function() {
		        self.removeOverlay(); // removing temporary overlay
    			var viewModel = self.preparePopup (formName, caller, contextId, popupWidth);
				viewModel.isMemoryOnly = isMemoryOnly;
				defaultObject.contextIds.push(viewModel.contextId);
				self.ObjectsDataSet.setContextIdsDirty(defaultObject.contextIds);
				viewModel.showAsCreateNewPopup(caller, defaultObject);
			});
		};

		this.showPopup = function (formName, caller, inputParameter, contextId, popupWidth) {
			// Displaying a temporary overlay while loading ressource		    
		    self.prepareOverlay(false);

		    self.sourceHandler.EnsureSourcesForElement(formName,"Form", function() {
		        self.removeOverlay(); // removing temporary overlay
				var viewModel = self.preparePopup(formName, caller, contextId, popupWidth);
				viewModel.showAsPopup(caller, inputParameter);
			});
		};


		this.showAlertPopup = function (caller, message, title, callback, contextId) {
		    var viewModel = self.preparePopup("DialogPopup", caller, contextId);
		    viewModel.showAsDialog(caller, "alert", message, null, title, callback);
		};

		this.showConfirmPopup = function (caller, message, title, callback, contextId) {
		    var viewModel = self.preparePopup("DialogPopup", caller, contextId);
		    viewModel.showAsDialog(caller, "confirm", message, null, title, callback);
		};

		this.showPromptPopup = function (caller, message, valuePrompt, title, callback, contextId) {
		    var viewModel = self.preparePopup("DialogPopup", caller, contextId);
		    viewModel.showAsDialog(caller, "prompt", message, valuePrompt, title, callback);
		};

		// Update the back button, used to close current popup and back to previous
		this.updatePopupBackButton = function () {
		    if (self.currentPopupId === null)
		        return;

		    // if multiple popup => set proper style (will show back button)
		    if (self.currentPopupStack[self.currentPopupId - 1]) {
		        $("#popupContainer").addClass("hasMultiplePopups");
		        $("#popupContainer").removeClass("hasSinglePopup");
		    }
		    else {
		        $("#popupContainer").addClass("hasSinglePopup");
		        $("#popupContainer").removeClass("hasMultiplePopups");
		    }
		};


		// Prepare a new popup on the stack
		this.preparePopup = function (formName, caller, contextId, popupWidth, popupMaxHeight) {
		    // instantiate a new popup container
		    var popupContainerName = "popupContainer" + self.popupCount;
		    self.popupCount++;
		    self.currentPopupId = self.popupCount;

		    var popupContainerContents = '<div id="' + popupContainerName + '"><div class="busy"><div class="blocking-element ui-widget-overlay"></div></div></div>';
		    $("#popupContainer").append(popupContainerContents);
		    var $popupContainer = $("#" + popupContainerName);

			// Configuration de la largeur
		    if (!popupWidth) {
				popupWidth = "auto";
			}
		    
			$("#popupContainer").width(popupWidth);

			// Configuration de la hauteur
			if(!popupMaxHeight){
				popupMaxHeight = $(window).height() * 0.7;
			}
			$("#popupContainer").css("max-height", popupMaxHeight);
			$popupContainer.css("max-height", popupMaxHeight);
		    $popupContainer.css("overflow", "auto");
			$('html').css('overflow', 'hidden');

            var formNameParts = formName.split(".");
            var viewModelConstructor = Solid.Web.ViewModels;

            for (var i = 0; i < formNameParts.length - 1; i++) {
                viewModelConstructor = viewModelConstructor[formNameParts[i]];
            }

            viewModelConstructor = viewModelConstructor[formNameParts[formNameParts.length - 1] + "ViewModel"];

            // create the popup View Model. The bindings are applied in the viewloader callback 
            var viewModel = new viewModelConstructor(caller.controller, null, null, $popupContainer, contextId, { popupWidth: popupWidth });

		    // push popup on popup stack
            self.currentPopupStack[self.popupCount] = $popupContainer;
            self.currentPopupViewModelStack[self.popupCount] = viewModel;

			 // hide previous popup if any
			if (self.currentPopupStack[self.currentPopupId - 1])
			    self.currentPopupStack[self.currentPopupId - 1].hide();

			self.updatePopupBackButton();
			
			var exitonclickout = formName === "ImagePopup";
			self.prepareOverlay(true, exitonclickout);

            return viewModel;
		};

		// Close all popups in stack
		this.closeAllPopups = function (rebindrequired) {
		    while (self.currentPopupId !== null) {
		        self.closeCurrentPopup(rebindrequired);
		    }
			$('html').css('overflow', '');
		};

		// Close current popup in stack
		this.closeCurrentPopup = function (rebindrequired) {
		    if (self.currentPopupId != null)
		        self.currentPopupViewModelStack[self.currentPopupId].onPopupClosed(rebindrequired);

		    var previousPopupId = null;

		    // delete old popup markup
			if(self.currentPopupStack[self.currentPopupId] && self.currentPopupStack[self.currentPopupId] !== null)
			{
			    ko.cleanNode(self.currentPopupStack[self.currentPopupId].get(0));
			    self.currentPopupStack[self.currentPopupId].remove();
			}


		    // remove old popup from stack
		    delete self.currentPopupStack[self.currentPopupId];
		    delete self.currentPopupViewModelStack[self.currentPopupId];

		    if (self.currentPopupStack[self.currentPopupId - 1]) {
		        self.currentPopupStack[self.currentPopupId - 1].fadeIn();
		        previousPopupId = self.currentPopupId - 1;
		    }
		    else {
		        previousPopupId = null;
		    }
            
		    self.currentPopupId = previousPopupId;
		    self.popupCount--;

			// If last popup => remove overlay
		    if (self.currentPopupId == null) {
		        self.removeOverlay(true);
				$('html').css('overflow', '');
		    }

		    self.updatePopupBackButton();
			if(self.currentPopupViewModelStack[self.currentPopupId])
				$("#popupContainer").width(self.currentPopupViewModelStack[self.currentPopupId].popupWidth);

		    self.centerPopup(); //centering the previous popup if any
		};

		this.centerPopup = function () {
		    $("#popupContainer").position({ my: "center center", at: "center center", of: window });
		};

	
		this.updateBreadCrumbs = function (nodeName) {
            self.viewModel.navigation.breadCrumbs.removeAll();
			var breadCrumbs = [];

            var root = '!' + self.getRootHashTag(nodeName);

            if (self.customRouting && self.customRouting.getRootBreadCrumb) {
                breadCrumbs.push(self.customRouting.getRootBreadCrumb());
            }


			switch(nodeName) {
				case 'VisitedPlace':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.VisitedPlace) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.VisitedPlace();
					}
					else {
						breadCrumbs.push({ text: 'VisitedPlaces', url: Solid.Web.Application.BaseURL + '#' + root + 'VisitedPlaces', hash: root + 'VisitedPlaces', currentpage: false, isactive: false });
						breadCrumbs.push({ text: 'Visited Place', url: Solid.Web.Application.BaseURL + '#' + root + 'VisitedPlaces/VisitedPlace', hash: root + 'VisitedPlaces/VisitedPlace', currentpage: true, isactive: false });
					}
					break;
				case 'VisitedPlaces':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.VisitedPlaces) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.VisitedPlaces();
					}
					else {
						breadCrumbs.push({ text: 'VisitedPlaces', url: Solid.Web.Application.BaseURL + '#' + root + 'VisitedPlaces', hash: root + 'VisitedPlaces', currentpage: true, isactive: false });
					}
					break;
				case 'CountryDetails':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.CountryDetails) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.CountryDetails();
					}
					else {
						breadCrumbs.push({ text: 'Countries', url: Solid.Web.Application.BaseURL + '#' + root + 'Countries', hash: root + 'Countries', currentpage: false, isactive: true });
						breadCrumbs.push({ text: 'Country Details', url: Solid.Web.Application.BaseURL + '#' + root + 'Countries/CountryDetails', hash: root + 'Countries/CountryDetails', currentpage: true, isactive: false });
					}
					break;
				case 'Locations':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.Locations) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.Locations();
					}
					else {
						breadCrumbs.push({ text: 'Locations', url: Solid.Web.Application.BaseURL + '#' + root + 'Locations', hash: root + 'Locations', currentpage: true, isactive: false });
					}
					break;
				case 'Users':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.Users) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.Users();
					}
					else {
						breadCrumbs.push({ text: 'Users', url: Solid.Web.Application.BaseURL + '#' + root + 'Users', hash: root + 'Users', currentpage: true, isactive: false });
					}
					break;
				case 'MyProfile':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.MyProfile) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.MyProfile();
					}
					else {
						breadCrumbs.push({ text: 'My Profile', url: Solid.Web.Application.BaseURL + '#' + root + 'MyProfile', hash: root + 'MyProfile', currentpage: true, isactive: false });
					}
					break;
				case 'Places':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.Places) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.Places();
					}
					else {
						breadCrumbs.push({ text: 'Places', url: Solid.Web.Application.BaseURL + '#' + root + 'Places', hash: root + 'Places', currentpage: true, isactive: false });
					}
					break;
				case 'UserProfile':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.UserProfile) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.UserProfile();
					}
					else {
						breadCrumbs.push({ text: 'Users', url: Solid.Web.Application.BaseURL + '#' + root + 'Users', hash: root + 'Users', currentpage: false, isactive: true });
						breadCrumbs.push({ text: 'User Profile', url: Solid.Web.Application.BaseURL + '#' + root + 'Users/UserProfile', hash: root + 'Users/UserProfile', currentpage: true, isactive: false });
					}
					break;
				case 'PlaceDetails':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.PlaceDetails) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.PlaceDetails();
					}
					else {
						breadCrumbs.push({ text: 'Places', url: Solid.Web.Application.BaseURL + '#' + root + 'Places', hash: root + 'Places', currentpage: false, isactive: true });
						breadCrumbs.push({ text: 'Place Details', url: Solid.Web.Application.BaseURL + '#' + root + 'Places/PlaceDetails', hash: root + 'Places/PlaceDetails', currentpage: true, isactive: false });
					}
					break;
				case 'LocationDetails':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.LocationDetails) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.LocationDetails();
					}
					else {
						breadCrumbs.push({ text: 'Locations', url: Solid.Web.Application.BaseURL + '#' + root + 'Locations', hash: root + 'Locations', currentpage: false, isactive: true });
						breadCrumbs.push({ text: 'Location Details', url: Solid.Web.Application.BaseURL + '#' + root + 'Locations/LocationDetails', hash: root + 'Locations/LocationDetails', currentpage: true, isactive: false });
					}
					break;
				case 'Countries':
					if (self.customRouting && self.customRouting.overridenBreadCrumbs && self.customRouting.overridenBreadCrumbs.Countries) {
						breadCrumbs = self.customRouting.overridenBreadCrumbs.Countries();
					}
					else {
						breadCrumbs.push({ text: 'Countries', url: Solid.Web.Application.BaseURL + '#' + root + 'Countries', hash: root + 'Countries', currentpage: true, isactive: false });
					}
					break;
			}

			for (var i = 0; i < breadCrumbs.length; i++) {
				if (i === breadCrumbs.length-1)
					breadCrumbs[i].currentpage = true;

				self.viewModel.navigation.breadCrumbs.push(breadCrumbs[i]);
			}
        };

        // Client-side routes
		Sammy(function () {
		    var sammycontext = this;
		    var root = '#!/';

		    if (self.customRouting && self.customRouting.registerRootRoute) {
		        root = self.customRouting.registerRootRoute(sammycontext);
		    }

			this.get(root + ':part1', function () {
				var doContinue = true;

		        if (self.customRouting && self.customRouting.onBeforeParseForLevel) {
		            doContinue = self.customRouting.onBeforeParseForLevel(this, 1);
		        }
		       
		        if (doContinue) {
					if (self.customRouting && self.customRouting.parseAdditionnalRoutesForLevel) {
						var isNavigatingCustom = self.customRouting.parseAdditionnalRoutesForLevel(this, 1);						
                        if (isNavigatingCustom) return; // If custom routing has returned true, we stop navigating
					}
					if (this.params.part1.split(new RegExp("#", "g"))[0] == 'VisitedPlaces') {
						self.internalNavigateTo('VisitedPlaces');
					}
					else if (this.params.part1.split(new RegExp("#", "g"))[0] == 'Locations') {
						self.internalNavigateTo('Locations');
					}
					else if (this.params.part1.split(new RegExp("#", "g"))[0] == 'Users') {
						self.internalNavigateTo('Users');
					}
					else if (this.params.part1.split(new RegExp("#", "g"))[0] == 'MyProfile') {
						self.internalNavigateTo('MyProfile');
					}
					else if (this.params.part1.split(new RegExp("#", "g"))[0] == 'Places') {
						self.internalNavigateTo('Places');
					}
					else if (this.params.part1.split(new RegExp("#", "g"))[0] == 'Countries') {
						self.internalNavigateTo('Countries');
					}
					
				}
			}); 
			this.get(root + ':part1/:part2', function () {
				var doContinue = true;

		        if (self.customRouting && self.customRouting.onBeforeParseForLevel) {
		            doContinue = self.customRouting.onBeforeParseForLevel(this, 2);
		        }
		       
		        if (doContinue) {
					if (self.customRouting && self.customRouting.parseAdditionnalRoutesForLevel) {
						var isNavigatingCustom = self.customRouting.parseAdditionnalRoutesForLevel(this, 2);						
                        if (isNavigatingCustom) return; // If custom routing has returned true, we stop navigating
					}
					if (this.params.part1 == 'VisitedPlaces' && this.params.part2.split(new RegExp("#", "g"))[0] == 'VisitedPlace') {
						self.internalNavigateTo('VisitedPlace');
					}
					else if (this.params.part1 == 'Countries' && this.params.part2.split(new RegExp("#", "g"))[0] == 'CountryDetails') {
						self.internalNavigateTo('CountryDetails');
					}
					else if (this.params.part1 == 'Users' && this.params.part2.split(new RegExp("#", "g"))[0] == 'UserProfile') {
						self.internalNavigateTo('UserProfile');
					}
					else if (this.params.part1 == 'Places' && this.params.part2.split(new RegExp("#", "g"))[0] == 'PlaceDetails') {
						self.internalNavigateTo('PlaceDetails');
					}
					else if (this.params.part1 == 'Locations' && this.params.part2.split(new RegExp("#", "g"))[0] == 'LocationDetails') {
						self.internalNavigateTo('LocationDetails');
					}
					else if (this.params.part1.split(new RegExp("#", "g"))[0] == 'MyProfile') {
						self.internalNavigateTo('MyProfile');
					}
					
				}
			}); 
			this.get(root + ':part1/:part2/:part3', function () {
				var doContinue = true;

		        if (self.customRouting && self.customRouting.onBeforeParseForLevel) {
		            doContinue = self.customRouting.onBeforeParseForLevel(this, 3);
		        }
		       
		        if (doContinue) {
					if (self.customRouting && self.customRouting.parseAdditionnalRoutesForLevel) {
						var isNavigatingCustom = self.customRouting.parseAdditionnalRoutesForLevel(this, 3);						
                        if (isNavigatingCustom) return; // If custom routing has returned true, we stop navigating
					}
					if (this.params.part1 == 'VisitedPlaces' && this.params.part2.split(new RegExp("#", "g"))[0] == 'VisitedPlace') {
						self.internalNavigateTo('VisitedPlace');
					}
					else if (this.params.part1 == 'Countries' && this.params.part2.split(new RegExp("#", "g"))[0] == 'CountryDetails') {
						self.internalNavigateTo('CountryDetails');
					}
					else if (this.params.part1 == 'Users' && this.params.part2.split(new RegExp("#", "g"))[0] == 'UserProfile') {
						self.internalNavigateTo('UserProfile');
					}
					else if (this.params.part1 == 'Places' && this.params.part2.split(new RegExp("#", "g"))[0] == 'PlaceDetails') {
						self.internalNavigateTo('PlaceDetails');
					}
					else if (this.params.part1 == 'Locations' && this.params.part2.split(new RegExp("#", "g"))[0] == 'LocationDetails') {
						self.internalNavigateTo('LocationDetails');
					}
					
				}
			}); 
			
			if (self.customRouting && self.customRouting.additionnalRoutesParser) {
				// Parse additionnal routes
				for (var level in self.customRouting.additionnalRoutesParser) {
					var levelasint = parseInt(level);
					if (levelasint <= 3)
						continue;

					var levelarray = [];
					for (var i = 0; i < levelasint; i++)
						levelarray.push(i + 1);

					var path = "#!/:part" + levelarray.join("/:part");

					sammycontext.get(path, function () {
						self.customRouting.additionnalRoutesParser[level].parse(this);
					});
				}
			}

			// When leaving a page, make sur all the popup and menus are closed.
			this.before("", function () {
			    if (self.currentPopupId != null) {
			        self.closeAllPopups(false);
			    }
				if ($.sidr && GO.Web.GetEnvironment().isMobile) {
			        $.sidr('close', 'horizontal-menu');
			    }
			});
		
		});

		this.initialize = function () {
		    self.sourceHandler.EnsureSourcesForElement(null, "Global", self.onInitialized);
		};

		this.onInitialized = function () {
		    Sammy().run();
		};

		this.initialize();
    };
} (window));

