﻿<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Change</title>
    <link href="../styles/27/reset.css" rel="stylesheet" />
    <link href="../styles/27/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="../styles/27/jquery.alerts.css" rel="stylesheet" />
    <link href="../styles/27/myapplication.css" rel="stylesheet" />
    <link href="../styles/27/widget-grid.css" rel="stylesheet" />
    <link href="../styles/27/jquery.jgrowl.css" rel="stylesheet" />
    <link href="../styles/27/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="../styles/27/jquery.custom.GO.css" rel="stylesheet" />
    <link href="../styles/27/Reports.css" rel="stylesheet" />
    <link href="../styles/27/layout.css" rel="stylesheet" />
    <link href="../styles/27/Reports.css" rel="stylesheet" />
    <link href="../styles/27/ui-elements.css" rel="stylesheet" />
    <link href="../styles/27/LoginPage.css" rel="stylesheet" />
    <link href="../styles/27/BreadCrumb.css" rel="stylesheet" />
    <link href="../styles/27/Grid-Widget.css" rel="stylesheet" />
    <link href="../styles/27/documentation.css" rel="stylesheet" />
    <link href="../styles/27/JqueryMenu.css" rel="stylesheet" />
    <link href="../styles/27/MobileLayout.css" rel="stylesheet" />
    <link href="../styles/27/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="../styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="../27/scripts/jquery-1.12.1.min.js"></script>
    <script src="../scripts/jquery.cookie.js"></script>
    <script src="../27/scripts/jquery.alerts.js"></script>
    <script src="../27/scripts/json2.min.js"></script>
    <script src="../27/scripts/knockout-3.4.js"></script>
    <script src="../27/scripts/jquery.alerts.js"></script>
    <script src="../27/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="../27/scripts/jquery.custom.GO.js"></script>
    <script src="../27/scripts/jquery.metadata.js"></script>
    <script src="../27/scripts/jquery.hoverIntent.js"></script>
    <script src="../27/scripts/jquery.mousewheel.min.js"></script>
    <script src="../27/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="../27/scripts/jquery.cycle.all.js"></script>
    <script src="../27/scripts/knockoutbindings.js"></script>
    <script src="../27/scripts/knockout.postbox.js"></script>
    <script src="../27/scripts/mersenne-twister.js"></script>
    <script src="../27/scripts/base64.js"></script>
    <script src="../27/scripts/generativeobjects.js"></script>
    <script src="../27/scripts/jquery.jgrowl.js"></script>
    <script src="../27/scripts/sammy-min.js"></script>
    <script src="../27/scripts/solid-auth-client.bundle.js"></script>
    <script src="../namespaces.js"></script>
    <script src="../27/Application/Application.js"></script>
    <script src="../27/Application/ApplicationMessages.js"></script>
    <script src="../27/Application/ApplicationSettings.js"></script>
    <script src="../27/model/components/GOSecurityProviderProxy.js"></script>
    <script src="../27/Views/ViewLoader.js"></script>
    <script src="../27/Application/ApplicationSourceHandler.js"></script>
    <script src="../27/Application/ApplicationController.js"></script>
    <script src="../27/Model/DataSets/ObjectsDataSet.js"></script>
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
 
