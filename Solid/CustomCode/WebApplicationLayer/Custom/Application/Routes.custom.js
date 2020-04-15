(function () {
    /**
     * @param {Solid.Web.Application.Controller} appController
     * @constructor
     */
    Solid.Web.Routing.Custom = function (appController) {
        var self = this;
        self.appController = appController;

        this.parseAdditionnalRoutesForLevel = function (navigation, level) {

            // if mon compte without UserName => add UserName to load the profil data
            if (navigation.params.part1 == 'MyProfile' && !navigation.params.part2) {
                hash = "#!/MyProfile/" + Solid.Web.Common.Security.UserName();
                window.location.hash = hash;
            }
            else if (navigation.params.part1 == 'MyProfile' && navigation.params.part2)
                return false;
        };

    };
}());
(function () {
    //
    Solid.Web.Common = Solid.Web.Common || {};

    Solid.Web.Common.Security = {
        Roles: {
            Administrator: "Administrator",
            User: "User"
        },

        /**
         * @returns {Array<>} roles of current connected user
         */
        CurrentRoles: function () {
            var roles = "";
            if (ApplicationController && ApplicationController.viewModel) {
                roles = ApplicationController.viewModel.security.currentUserClaims().role;
            } else {
                var token = $.cookie("BearerToken");
                if (token) {
                    var currentUserClaims = GO.deconstructJWT(token);
                    roles = currentUserClaims.role;
                }
            }
            return roles.split(',');
        },

        GoUserId: function () {
            var id = null;
            if (ApplicationController && ApplicationController.viewModel) {
                id = ApplicationController.viewModel.security.currentUserClaims().UserId;
            } else {
                var token = $.cookie("BearerToken");
                if (token) {
                    var currentUserClaims = GO.deconstructJWT(token);
                    id = currentUserClaims.UserId;
                }
            }
            return id;
        },

        UserName: function () {
            var id = null;
            if (ApplicationController && ApplicationController.viewModel) {
                id = ApplicationController.viewModel.security.currentUserClaims().UserName;
            } else {
                var token = $.cookie("BearerToken");
                if (token) {
                    var currentUserClaims = GO.deconstructJWT(token);
                    id = currentUserClaims.UserName;
                }
            }
            return id;
        },


    };

    /**
     * A principal is an entity that can be authenticated by a computer system or network.
     * https://en.wikipedia.org/wiki/Principal_(computer_security)
     */
    Solid.Web.Common.Security.Principal = function () {
        var self = this;
        /**
         * @return {Array<>} roles of current connected user
         */
        this.CurrentRoles = Solid.Web.Common.Security.CurrentRoles();

        /**
         * @returns {boolean}
         */
        this.HasRoleAdministrator = function () {
            var isAdmin = self.CurrentRoles.indexOf(Solid.Web.Common.Security.Roles.Administrator) > -1;
            return isAdmin;
        };
        this.HasRoleUser = function () {
            var isUser = self.CurrentRoles.indexOf(Solid.Web.Common.Security.Roles.User) > -1;
            return isUser;
        };
    };

}());