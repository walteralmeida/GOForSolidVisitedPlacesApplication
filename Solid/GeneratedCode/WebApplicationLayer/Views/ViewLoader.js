﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
(function () {
    // DataStore class for the object 'Contract'.
    Solid.Web.Views.viewLoader = function () {
        var self = this;
		// CORDOVA:
		// var serviceUrl = "./ConstructedViews/";
		var serviceUrl = Solid.Web.Application.BaseURL + "11/ConstructedViews/";

        var loadViewRequest = null;

        this.loadView = function (configuration) {
			
            loadViewRequest = $.ajax({
                url: serviceUrl + configuration.viewName + ".html",
                cache:  true,	// we decided this should be true to prevent refetching content from server, and url rewrite mechanism with version number should be used in all urls to handle version changes
                type: 'GET',
				dataType: 'html',
                success: function (viewData) {
					viewData = viewData.split('{PARENT}').join(configuration.parentName ? configuration.parentName : ''); // ReplaceAll
					viewData = viewData.split('{DATABINDROOT}').join(''); // Unmatched {DATABINDROOT} ?
                    if (configuration.successHandler)
                        configuration.successHandler(viewData, configuration.context, configuration.zone);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 401)
                        ApplicationController.redirectToLoginPage("unauthorized", true);
                    else if (jqXHR.status == 403)
                        ApplicationController.redirectToLoginPage("expiredSecurityToken");
	  				else if (jqXHR.responseText == '') // if the response is empty
						configuration.successHandler('', configuration.context, configuration.zone);
                    else if (configuration.errorHandler && errorThrown !== "abort")
                        configuration.errorHandler("Can't load this page");
                }
            });
        };

    };
} ());