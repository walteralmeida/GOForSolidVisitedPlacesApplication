﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
(function () {
    // 
    Solid.Web.Membership.LostPasswordPageViewModel = function () {
        var self = this;

        this.securityProviderProxy = new Solid.Web.Model.Components.GOSecurityProviderProxy(this.ObjectsDataSet);

        this.data = {
            email: ko.observable(null),
			lostPasswordFailed: ko.observable(false),
			errorMessage: ko.observable(""),
			loginLink: ko.observable("./Login.html"),
			registerLink: ko.observable("./Register.html"),
        };

        this.commands = {
            lostPassword: function () {
                self.lostPassword();
            },
			lostPasswordText: ko.observable(Solid.Web.Messages.resetPassword),
			lostPasswordEnabled: ko.observable(true)
        };

        this.lostPassword = function () {
             $(':input').trigger('change');
			var configuration = {};
            configuration.email = self.data.email();
            configuration.successHandler = self.onLostPasswordSucceeded;
            configuration.errorHandler = self.onLostPasswordError;
		
			self.commands.lostPasswordText(Solid.Web.Messages.resettingPassword);
			self.commands.lostPasswordEnabled("false");
            self.securityProviderProxy.LostPassword(configuration);
        };

        this.onLostPasswordSucceeded = function (token) {
			window.location = Solid.Web.Application.BaseURL 
				+ "Membership/HoldingPage.html?title=resetPassword&message=resetPasswordEmailSent&login=true"
				;
        };

        this.onLostPasswordError = function (error) {
			self.commands.lostPasswordText(Solid.Web.Messages.resetPassword);
			self.commands.lostPasswordEnabled("true");
	        self.data.email(null);    
			self.data.lostPasswordFailed(true);
			self.data.errorMessage(error);
        };

        // Apply bindings
        ko.applyBindings(self, $("#Main").get(0));
    };
}());