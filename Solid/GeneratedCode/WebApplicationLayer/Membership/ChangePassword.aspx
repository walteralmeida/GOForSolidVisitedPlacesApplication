﻿<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Change</title>
    <link href="../styles/56/reset.css" rel="stylesheet" />
    <link href="../styles/56/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="../styles/56/jquery.alerts.css" rel="stylesheet" />
    <link href="../styles/56/myapplication.css" rel="stylesheet" />
    <link href="../styles/56/widget-grid.css" rel="stylesheet" />
    <link href="../styles/56/jquery.jgrowl.css" rel="stylesheet" />
    <link href="../styles/56/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="../styles/56/jquery.custom.GO.css" rel="stylesheet" />
    <link href="../styles/56/Reports.css" rel="stylesheet" />
    <link href="../styles/56/layout.css" rel="stylesheet" />
    <link href="../styles/56/Reports.css" rel="stylesheet" />
    <link href="../styles/56/ui-elements.css" rel="stylesheet" />
    <link href="../styles/56/LoginPage.css" rel="stylesheet" />
    <link href="../styles/56/BreadCrumb.css" rel="stylesheet" />
    <link href="../styles/56/Grid-Widget.css" rel="stylesheet" />
    <link href="../styles/56/documentation.css" rel="stylesheet" />
    <link href="../styles/56/JqueryMenu.css" rel="stylesheet" />
    <link href="../styles/56/MobileLayout.css" rel="stylesheet" />
    <link href="../styles/56/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="../styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="../56/scripts/jquery-1.12.1.min.js"></script>
    <script src="../scripts/jquery.cookie.js"></script>
    <script src="../56/scripts/jquery.alerts.js"></script>
    <script src="../56/scripts/json2.min.js"></script>
    <script src="../56/scripts/knockout-3.4.js"></script>
    <script src="../56/scripts/jquery.alerts.js"></script>
    <script src="../56/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="../56/scripts/jquery.custom.GO.js"></script>
    <script src="../56/scripts/jquery.metadata.js"></script>
    <script src="../56/scripts/jquery.hoverIntent.js"></script>
    <script src="../56/scripts/jquery.mousewheel.min.js"></script>
    <script src="../56/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="../56/scripts/jquery.cycle.all.js"></script>
    <script src="../56/scripts/knockoutbindings.js"></script>
    <script src="../56/scripts/knockout.postbox.js"></script>
    <script src="../56/scripts/mersenne-twister.js"></script>
    <script src="../56/scripts/base64.js"></script>
    <script src="../56/scripts/generativeobjects.js"></script>
    <script src="../56/scripts/jquery.jgrowl.js"></script>
    <script src="../56/scripts/sammy-min.js"></script>
    <script src="../56/scripts/solid-auth-client.bundle.js"></script>
    <script src="../namespaces.js"></script>
    <script src="../56/Application/Application.js"></script>
    <script src="../56/Application/ApplicationMessages.js"></script>
    <script src="../56/Application/ApplicationSettings.js"></script>
    <script src="../56/model/components/GOSecurityProviderProxy.js"></script>
    <script src="../56/Views/ViewLoader.js"></script>
    <script src="../56/Application/ApplicationSourceHandler.js"></script>
    <script src="../56/Application/ApplicationController.js"></script>
    <script src="../56/Model/DataSets/ObjectsDataSet.js"></script>
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
              <div>
                <h2>Welcome to the "Visited Countries and Places" demo application.</h2>
                <br />
                <p>With this application, you can track the countries and places you visited, and see all the visited countries and places shared by the other users of this application.</p>
                <br />
                <p>This application was fully modelled and generated using the <a href="https://www.generativeobjects.com" target="_blank">Generative Objects low-code platform</a> (GO Platform) and is the support for the presentation I (Walter Almeida) am doing at SOLID World May.</p>
                <br />
                <p>You connect to this application with a Solid POD account. You can get one <a href="https://inrupt.net" target="_blank">here</a>.</p>
                <br />
                <p>Please be aware that your visited countries and places are stored in your public data, therefore publicly visible.</p>
                <br />
                <p>I am using <a href="https://wiki.dbpedia.org/">dbPedia.org</a> as a datasource for countries and places.</p>
                <br />
                <p>With GO it is now possible to create such applications, connecting to Solid POD and dbPedia.org (and other semantic web datasources) with no code, through modelling and generating the applications, in hours.</p>
                <br />
                <p>This is a demonstration application to be used with no warranty whatsoever.</p>
                <br />
                <p>The source code of this application is available <a href="https://github.com/walteralmeida/GOForSolidVisitedPlacesApplication" target="_blank">here</a></p>
                <br />
                <p>If you are interested by this project, want to contribute, please <a href="mailto:walter.almeida@generativeobjects.com">reach out</a>!</p>
              </div>
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
 
