<%@ Language="C#" AutoEventWireup="true" CodeBehind="Application.aspx.cs" Inherits="Solid.Application.Web.Views.Application" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solid Project</title>
    <link href="styles/23/reset.css" rel="stylesheet" />
    <link href="styles/23/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="styles/23/jquery.alerts.css" rel="stylesheet" />
    <link href="styles/23/myapplication.css" rel="stylesheet" />
    <link href="styles/23/widget-grid.css" rel="stylesheet" />
    <link href="styles/23/jquery.jgrowl.css" rel="stylesheet" />
    <link href="styles/23/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="styles/23/jquery.custom.GO.css" rel="stylesheet" />
    <link href="styles/23/Reports.css" rel="stylesheet" />
    <link href="styles/23/layout.css" rel="stylesheet" />
    <link href="styles/23/Reports.css" rel="stylesheet" />
    <link href="styles/23/ui-elements.css" rel="stylesheet" />
    <link href="styles/23/LoginPage.css" rel="stylesheet" />
    <link href="styles/23/BreadCrumb.css" rel="stylesheet" />
    <link href="styles/23/Grid-Widget.css" rel="stylesheet" />
    <link href="styles/23/documentation.css" rel="stylesheet" />
    <link href="styles/23/JqueryMenu.css" rel="stylesheet" />
    <link href="styles/23/MobileLayout.css" rel="stylesheet" />
    <link href="styles/23/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="23/scripts/json2.min.js"></script>
    <script src="23/scripts/knockout-3.4.js"></script>
    <script src="23/scripts/jquery-1.12.1.min.js"></script>
    <script src="23/scripts/jquery.cookie.js"></script>
    <script src="23/scripts/jquery.alerts.js"></script>
    <script src="23/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="23/scripts/jquery.custom.GO.js"></script>
    <script src="23/scripts/jquery.metadata.js"></script>
    <script src="23/scripts/mersenne-twister.js"></script>
    <script src="23/scripts/jquery.hoverIntent.js"></script>
    <script src="23/scripts/jquery.mousewheel.min.js"></script>
    <script src="23/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="23/scripts/jquery.cycle.all.js"></script>
    <script src="23/scripts/knockoutbindings.js"></script>
    <script src="23/scripts/knockout.postbox.js"></script>
    <script src="23/scripts/base64.js"></script>
    <script src="23/scripts/generativeobjects.js"></script>
    <script src="23/scripts/jquery.jgrowl.js"></script>
    <script src="23/scripts/sammy-min.js"></script>
    <script src="23/scripts/sidr.min.js"></script>
    <script src="23/namespaces.js"></script>
    <script src="23/Application/Application.js"></script>
    <script src="23/Application/ApplicationMessages.js"></script>
    <script src="23/Application/ApplicationSettings.js"></script>
    <script src="23/Views/ViewLoader.js"></script>
    <script></script>
    <script src="23/Application/ApplicationSourceHandler.js"></script>
    <script src="23/Application/ApplicationController.js"></script>
    <script src="23/Custom/Application/SourceHandler.custom.js"></script>
    <script src="23/Custom/Application/Routes.custom.js"></script>
    <script src="23/Custom/Application/ApplicationViewModel.custom.js"></script>
    <script src="23/Custom/ViewModels.js"></script>
    <script src="23/Custom/PageControllers.js"></script>
    <script src="23/Custom/EntityFactories.js"></script>
    <script src="23/Custom/EntityValidators.js"></script>
    <script src="23/Model/DataStores/DataMapper.js"></script>
    <script src="23/Application/ApplicationViewModel.js"></script>
    <script src="23/Model/DataStores/DataStore.js"></script>
    <script src="23/Model/DataSets/ObjectsDataSet.js"></script>
    <script src="23/ViewModels/Common/NoticeBoxViewModel.js"></script>
    <script src="23/ViewModels/Common/DialogPopupViewModel.js"></script>
    <script src="23/Widgets/datagrid.js"></script>
    <script src="23/Widgets/paginator.js"></script>
    <script src="23/Custom/CustomFields.js"></script>
    <script src="23/ViewModels/Common/ImagePopupViewModel.js"></script>
  </head>
  <body onunload="">
    <div id="form"></div>
  </body>
</html><script>
    (function (global) {
		ApplicationSourceHandler = new Solid.Web.Application.SourceHandler();
		ApplicationController = new Solid.Web.Application.Controller();
		Solid.Web.Application.contextId = [ApplicationController.getNextContextId()];
		if (!location.hash)
		    ApplicationController.navigateTo("CountryDetails");

	                } (window));
	            </script>
 