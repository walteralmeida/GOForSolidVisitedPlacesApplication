<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Change</title>
    <link href="../styles/16/reset.css" rel="stylesheet" />
    <link href="../styles/16/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="../styles/16/jquery.alerts.css" rel="stylesheet" />
    <link href="../styles/16/myapplication.css" rel="stylesheet" />
    <link href="../styles/16/widget-grid.css" rel="stylesheet" />
    <link href="../styles/16/jquery.jgrowl.css" rel="stylesheet" />
    <link href="../styles/16/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="../styles/16/jquery.custom.GO.css" rel="stylesheet" />
    <link href="../styles/16/Reports.css" rel="stylesheet" />
    <link href="../styles/16/layout.css" rel="stylesheet" />
    <link href="../styles/16/Reports.css" rel="stylesheet" />
    <link href="../styles/16/ui-elements.css" rel="stylesheet" />
    <link href="../styles/16/LoginPage.css" rel="stylesheet" />
    <link href="../styles/16/BreadCrumb.css" rel="stylesheet" />
    <link href="../styles/16/Grid-Widget.css" rel="stylesheet" />
    <link href="../styles/16/documentation.css" rel="stylesheet" />
    <link href="../styles/16/JqueryMenu.css" rel="stylesheet" />
    <link href="../styles/16/MobileLayout.css" rel="stylesheet" />
    <link href="../styles/16/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="../styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="../16/scripts/jquery-1.12.1.min.js"></script>
    <script src="../scripts/jquery.cookie.js"></script>
    <script src="../16/scripts/jquery.alerts.js"></script>
    <script src="../16/scripts/json2.min.js"></script>
    <script src="../16/scripts/knockout-3.4.js"></script>
    <script src="../16/scripts/jquery.alerts.js"></script>
    <script src="../16/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="../16/scripts/jquery.custom.GO.js"></script>
    <script src="../16/scripts/jquery.metadata.js"></script>
    <script src="../16/scripts/jquery.hoverIntent.js"></script>
    <script src="../16/scripts/jquery.mousewheel.min.js"></script>
    <script src="../16/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="../16/scripts/jquery.cycle.all.js"></script>
    <script src="../16/scripts/knockoutbindings.js"></script>
    <script src="../16/scripts/knockout.postbox.js"></script>
    <script src="../16/scripts/mersenne-twister.js"></script>
    <script src="../16/scripts/base64.js"></script>
    <script src="../16/scripts/generativeobjects.js"></script>
    <script src="../16/scripts/jquery.jgrowl.js"></script>
    <script src="../16/scripts/sammy-min.js"></script>
    <script src="../namespaces.js"></script>
    <script src="../16/Application/Application.js"></script>
    <script src="../16/Application/ApplicationMessages.js"></script>
    <script src="../16/Application/ApplicationSettings.js"></script>
    <script src="../16/model/components/GOSecurityProviderProxy.js"></script>
    <script src="../16/Views/ViewLoader.js"></script>
    <script src="../16/Application/ApplicationSourceHandler.js"></script>
    <script src="../16/Application/ApplicationController.js"></script>
    <script src="../16/Model/DataSets/ObjectsDataSet.js"></script>
    <script src="ChangePasswordPageViewModel.js"></script>
  </head>
  <body>
    <form class="loginPage">
      <div class="main-wrapper">
        <header>
          <div class="header-image"></div>
          <h1>Password Change</h1>
        </header>
        <!--end header-->
        <div class="main-content">
          <div class="breadcrumbs"></div>
          <div class="zone-content">
            <div class="loginLeftColumn">
              <div></div>
            </div>
            <div class="loginRightColumn">
              <h2>Password Change</h2>
              <div class="loginContent">
                <div>
                  <h3 data-bind="text: Solid.Web.Messages.changePassword"></h3>
                  <div class="accountInfo">
                    <table>
                      <tbody>
                        <tr>
                          <td colspan="2" data-bind="visible : data.changePasswordFailed" style="color:Red; padding: 5px;">
                            <span data-bind="text: data.errorMessage()" />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:5px;">
                            <label for="ChangePassword_Password" id="ChangePassword_PasswordLabel" style="font-weight:bold;" data-bind="text: Solid.Web.Messages.currentPassword" />
                          </td>
                          <td style="padding:5px;" class="">
                            <input name="ChangePassword$Password" type="password" data-bind="value: data.oldPassword" id="ChangePassword_Password" class="passwordEntry" />
                            <span id="ChangePassword_PasswordRequired" data-bind="text: Solid.Web.Messages.passwordMandatory" class="failureNotification" style="visibility:hidden;">*</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:5px;">
                            <label for="ChangePassword_Password" id="ChangePassword_PasswordLabel" style="font-weight:bold;" data-bind="text: Solid.Web.Messages.newPassword" />
                          </td>
                          <td style="padding:5px;" class="">
                            <input name="ChangePassword$Password" type="password" data-bind="value: data.newPassword" id="ChangePassword_Password" class="passwordEntry" />
                            <span id="ChangePassword_PasswordRequired" data-bind="text: Solid.Web.Messages.passwordMandatory" class="failureNotification" style="visibility:hidden;">*</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:5px;">
                            <label for="ChangePassword_Password" id="ChangePassword_PasswordLabel" style="font-weight:bold;" data-bind="text: Solid.Web.Messages.confirmPassword" />
                          </td>
                          <td style="padding:5px;" class="">
                            <input name="ChangePassword$Password" type="password" data-bind="value: data.confirmPassword" id="ChangePassword_Password" class="passwordEntry" />
                            <span id="ChangePassword_PasswordRequired" data-bind="text: Solid.Web.Messages.passwordMandatory" class="failureNotification" style="visibility:hidden;">*</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <p class="submitButton">
                      <input type="submit" name="ChangePassword$ChangePasswordButton" data-bind="click : commands.changePassword, value: commands.changePasswordText, enable: commands.changePasswordEnabled" id="ChangePassword_LoginButton" class="command-button" />
                    </p>
                    <p style="display:block; padding-top: 20px;"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end maincontent-->
        </div>
        <!--end main-->
        <footer>
          <div class="footercontent">
            <p>Built With Generative Objects!</p>
          </div>
          <!--end content-->
        </footer>
        <!--end footer-->
      </div>
      <!--end wrapper-->
      <div id="popupContainer">
        <a data-placeholder="closeAllPopupsButton" class="overlayClose" onclick="ApplicationController.closeAllPopups()"></a>
        <a class="overlayBack" onclick="ApplicationController.closeCurrentPopup()">Retour</a>
        <div id="popupContainerCloseButton"></div>
      </div>
    </form>
  </body>
</html><script>
    (function (global) {
          ApplicationSourceHandler = new Solid.Web.Application.SourceHandler();          ApplicationController = new Solid.Web.Application.Controller();          ChangePasswordPageViewModel = new Solid.Web.Membership.ChangePasswordPageViewModel();     } (window));
</script>
 
