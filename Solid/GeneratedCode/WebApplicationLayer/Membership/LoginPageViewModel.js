﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
(function () {
    // 
    Solid.Web.Membership.LoginPageViewModel = function () {
        var self = this;

        this.securityProviderProxy = new Solid.Web.Model.Components.GOSecurityProviderProxy(this.ObjectsDataSet);

        this.data = {
            username: ko.observable(null),
            password: ko.observable(null),
			loginFailed: ko.observable(false),
            errorMessage: ko.observable(null),
			registerLink: ko.observable("./Register.html"),
			lostPasswordLink: ko.observable("./LostPassword.html"),
        };

        this.commands = {
            login: function () {
                self.login();
            },
            loginSolid: function () {
                self.loginSolid();
            },
			loginText: ko.observable(Solid.Web.Messages.connection),
			loginEnabled: ko.observable(true)
        };

        this.login = function () {
            $(':input').trigger('change');
			var configuration = {};
            configuration.username = self.data.username();
            configuration.password = self.data.password();
            configuration.useCookies = true;
            configuration.successHandler = self.onLoginSucceeded;
            configuration.errorHandler = self.onLoginError;
		
			self.commands.loginText(Solid.Web.Messages.connecting);
			self.commands.loginEnabled("false");
            self.securityProviderProxy.Authenticate(configuration);
        };

        this.popupLogin = async function () {
            let session = await solid.auth.currentSession();
            let popupUri = './solid-popup.html';
            //let popupUri = 'https://solid.community/common/popup.html';
            if (!session)
                session = await solid.auth.popupLogin({ popupUri });

            var token = await solid.auth.issueToken(session.webId, session);

            var configuration = {};
            configuration.username = session.webId;
            configuration.password = token;
            configuration.useCookies = true;
            configuration.successHandler = self.onLoginSucceeded;
            configuration.errorHandler = self.onLoginError;

            self.commands.loginText(Solid.Web.Messages.connecting);
            self.commands.loginEnabled("false");
            self.securityProviderProxy.Authenticate(configuration);
        }

        this.loginSolid = function () {
            this.popupLogin();

            solid.auth.trackSession(session => {
                if (session) {
                    var s = session.webId;
                }
            });
        }



        this.onLoginSucceeded = function (token) {
            var queryParams = new GO.QueryParams();
            window.location = Solid.Web.Application.BaseURL + "?" + queryParams.buildWithoutQuestionMark() + window.location.hash;
        };

        this.onLoginError = function (error) {
			self.commands.loginText(Solid.Web.Messages.connection);
			self.commands.loginEnabled("true");
	        self.data.username(null);    
	        self.data.password(null);    
			self.data.loginFailed(true);
	        self.data.errorMessage(error);
        };

		this.initialize = function () {
			var prompt = GO.GetUrlQueryString("context");
            if (prompt && prompt !== "") {
				if (Solid.Web.Messages[prompt]) {
                    prompt = Solid.Web.Messages[prompt];
                } else {
                    prompt = Solid.Web.Messages.nullSecurityToken;
                }

                self.data.loginFailed(true);
                self.data.errorMessage(prompt);
            }
        }

        this.initialize();

        // Apply bindings
        ko.applyBindings(self, $("#Main").get(0));
    };
}());