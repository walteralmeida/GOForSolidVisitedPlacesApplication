﻿<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Change</title>
    <link href="../styles/21/reset.css" rel="stylesheet" />
    <link href="../styles/21/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="../styles/21/jquery.alerts.css" rel="stylesheet" />
    <link href="../styles/21/myapplication.css" rel="stylesheet" />
    <link href="../styles/21/widget-grid.css" rel="stylesheet" />
    <link href="../styles/21/jquery.jgrowl.css" rel="stylesheet" />
    <link href="../styles/21/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="../styles/21/jquery.custom.GO.css" rel="stylesheet" />
    <link href="../styles/21/Reports.css" rel="stylesheet" />
    <link href="../styles/21/layout.css" rel="stylesheet" />
    <link href="../styles/21/Reports.css" rel="stylesheet" />
    <link href="../styles/21/ui-elements.css" rel="stylesheet" />
    <link href="../styles/21/LoginPage.css" rel="stylesheet" />
    <link href="../styles/21/BreadCrumb.css" rel="stylesheet" />
    <link href="../styles/21/Grid-Widget.css" rel="stylesheet" />
    <link href="../styles/21/documentation.css" rel="stylesheet" />
    <link href="../styles/21/JqueryMenu.css" rel="stylesheet" />
    <link href="../styles/21/MobileLayout.css" rel="stylesheet" />
    <link href="../styles/21/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="../styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="../21/scripts/jquery-1.12.1.min.js"></script>
    <script src="../scripts/jquery.cookie.js"></script>
    <script src="../21/scripts/jquery.alerts.js"></script>
    <script src="../21/scripts/json2.min.js"></script>
    <script src="../21/scripts/knockout-3.4.js"></script>
    <script src="../21/scripts/jquery.alerts.js"></script>
    <script src="../21/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="../21/scripts/jquery.custom.GO.js"></script>
    <script src="../21/scripts/jquery.metadata.js"></script>
    <script src="../21/scripts/jquery.hoverIntent.js"></script>
    <script src="../21/scripts/jquery.mousewheel.min.js"></script>
    <script src="../21/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="../21/scripts/jquery.cycle.all.js"></script>
    <script src="../21/scripts/knockoutbindings.js"></script>
    <script src="../21/scripts/knockout.postbox.js"></script>
    <script src="../21/scripts/mersenne-twister.js"></script>
    <script src="../21/scripts/base64.js"></script>
    <script src="../21/scripts/generativeobjects.js"></script>
    <script src="../21/scripts/jquery.jgrowl.js"></script>
    <script src="../21/scripts/sammy-min.js"></script>
    <script src="../namespaces.js"></script>
    <script src="../21/Application/Application.js"></script>
    <script src="../21/Application/ApplicationMessages.js"></script>
    <script src="../21/Application/ApplicationSettings.js"></script>
    <script src="../21/model/components/GOSecurityProviderProxy.js"></script>
    <script src="../21/Views/ViewLoader.js"></script>
    <script src="../21/Application/ApplicationSourceHandler.js"></script>
    <script src="../21/Application/ApplicationController.js"></script>
    <script src="../21/Model/DataSets/ObjectsDataSet.js"></script>
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
 
