﻿<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Change</title>
    <link href="../styles/29/reset.css" rel="stylesheet" />
    <link href="../styles/29/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="../styles/29/jquery.alerts.css" rel="stylesheet" />
    <link href="../styles/29/myapplication.css" rel="stylesheet" />
    <link href="../styles/29/widget-grid.css" rel="stylesheet" />
    <link href="../styles/29/jquery.jgrowl.css" rel="stylesheet" />
    <link href="../styles/29/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="../styles/29/jquery.custom.GO.css" rel="stylesheet" />
    <link href="../styles/29/Reports.css" rel="stylesheet" />
    <link href="../styles/29/layout.css" rel="stylesheet" />
    <link href="../styles/29/Reports.css" rel="stylesheet" />
    <link href="../styles/29/ui-elements.css" rel="stylesheet" />
    <link href="../styles/29/LoginPage.css" rel="stylesheet" />
    <link href="../styles/29/BreadCrumb.css" rel="stylesheet" />
    <link href="../styles/29/Grid-Widget.css" rel="stylesheet" />
    <link href="../styles/29/documentation.css" rel="stylesheet" />
    <link href="../styles/29/JqueryMenu.css" rel="stylesheet" />
    <link href="../styles/29/MobileLayout.css" rel="stylesheet" />
    <link href="../styles/29/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="../styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="../29/scripts/jquery-1.12.1.min.js"></script>
    <script src="../scripts/jquery.cookie.js"></script>
    <script src="../29/scripts/jquery.alerts.js"></script>
    <script src="../29/scripts/json2.min.js"></script>
    <script src="../29/scripts/knockout-3.4.js"></script>
    <script src="../29/scripts/jquery.alerts.js"></script>
    <script src="../29/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="../29/scripts/jquery.custom.GO.js"></script>
    <script src="../29/scripts/jquery.metadata.js"></script>
    <script src="../29/scripts/jquery.hoverIntent.js"></script>
    <script src="../29/scripts/jquery.mousewheel.min.js"></script>
    <script src="../29/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="../29/scripts/jquery.cycle.all.js"></script>
    <script src="../29/scripts/knockoutbindings.js"></script>
    <script src="../29/scripts/knockout.postbox.js"></script>
    <script src="../29/scripts/mersenne-twister.js"></script>
    <script src="../29/scripts/base64.js"></script>
    <script src="../29/scripts/generativeobjects.js"></script>
    <script src="../29/scripts/jquery.jgrowl.js"></script>
    <script src="../29/scripts/sammy-min.js"></script>
    <script src="../29/scripts/solid-auth-client.bundle.js"></script>
    <script src="../namespaces.js"></script>
    <script src="../29/Application/Application.js"></script>
    <script src="../29/Application/ApplicationMessages.js"></script>
    <script src="../29/Application/ApplicationSettings.js"></script>
    <script src="../29/model/components/GOSecurityProviderProxy.js"></script>
    <script src="../29/Views/ViewLoader.js"></script>
    <script src="../29/Application/ApplicationSourceHandler.js"></script>
    <script src="../29/Application/ApplicationController.js"></script>
    <script src="../29/Model/DataSets/ObjectsDataSet.js"></script>
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
                <div></div>
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
 
