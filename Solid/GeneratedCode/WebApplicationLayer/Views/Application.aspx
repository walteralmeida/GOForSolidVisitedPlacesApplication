<%@ Language="C#" AutoEventWireup="true" CodeBehind="Application.aspx.cs" Inherits="Solid.Application.Web.Views.Application" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solid Project</title>
    <link href="styles/57/reset.css" rel="stylesheet" />
    <link href="styles/57/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="styles/57/jquery.alerts.css" rel="stylesheet" />
    <link href="styles/57/myapplication.css" rel="stylesheet" />
    <link href="styles/57/widget-grid.css" rel="stylesheet" />
    <link href="styles/57/jquery.jgrowl.css" rel="stylesheet" />
    <link href="styles/57/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="styles/57/jquery.custom.GO.css" rel="stylesheet" />
    <link href="styles/57/Reports.css" rel="stylesheet" />
    <link href="styles/57/layout.css" rel="stylesheet" />
    <link href="styles/57/Reports.css" rel="stylesheet" />
    <link href="styles/57/ui-elements.css" rel="stylesheet" />
    <link href="styles/57/LoginPage.css" rel="stylesheet" />
    <link href="styles/57/BreadCrumb.css" rel="stylesheet" />
    <link href="styles/57/Grid-Widget.css" rel="stylesheet" />
    <link href="styles/57/documentation.css" rel="stylesheet" />
    <link href="styles/57/JqueryMenu.css" rel="stylesheet" />
    <link href="styles/57/MobileLayout.css" rel="stylesheet" />
    <link href="styles/57/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="57/scripts/json2.min.js"></script>
    <script src="57/scripts/knockout-3.4.js"></script>
    <script src="57/scripts/jquery-1.12.1.min.js"></script>
    <script src="57/scripts/jquery.cookie.js"></script>
    <script src="57/scripts/jquery.alerts.js"></script>
    <script src="57/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="57/scripts/jquery.custom.GO.js"></script>
    <script src="57/scripts/jquery.metadata.js"></script>
    <script src="57/scripts/mersenne-twister.js"></script>
    <script src="57/scripts/jquery.hoverIntent.js"></script>
    <script src="57/scripts/jquery.mousewheel.min.js"></script>
    <script src="57/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="57/scripts/jquery.cycle.all.js"></script>
    <script src="57/scripts/knockoutbindings.js"></script>
    <script src="57/scripts/knockout.postbox.js"></script>
    <script src="57/scripts/base64.js"></script>
    <script src="57/scripts/generativeobjects.js"></script>
    <script src="57/scripts/jquery.jgrowl.js"></script>
    <script src="57/scripts/sammy-min.js"></script>
    <script src="57/scripts/solid-auth-client.bundle.js"></script>
    <script src="57/scripts/sidr.min.js"></script>
    <script src="57/namespaces.js"></script>
    <script src="57/Application/Application.js"></script>
    <script src="57/Application/ApplicationMessages.js"></script>
    <script src="57/Application/ApplicationSettings.js"></script>
    <script src="57/Views/ViewLoader.js"></script>
    <script></script>
    <script src="57/Application/ApplicationSourceHandler.js"></script>
    <script src="57/Application/ApplicationController.js"></script>
    <script src="57/Custom/Application/SourceHandler.custom.js"></script>
    <script src="57/Custom/Application/Routes.custom.js"></script>
    <script src="57/Custom/Application/ApplicationViewModel.custom.js"></script>
    <script src="57/Custom/ViewModels.js"></script>
    <script src="57/Custom/PageControllers.js"></script>
    <script src="57/Custom/EntityFactories.js"></script>
    <script src="57/Custom/EntityValidators.js"></script>
    <script src="57/Model/DataStores/DataMapper.js"></script>
    <script src="57/Application/ApplicationViewModel.js"></script>
    <script src="57/Model/DataStores/DataStore.js"></script>
    <script src="57/Model/DataSets/ObjectsDataSet.js"></script>
    <script src="57/ViewModels/Common/NoticeBoxViewModel.js"></script>
    <script src="57/ViewModels/Common/DialogPopupViewModel.js"></script>
    <script src="57/Widgets/datagrid.js"></script>
    <script src="57/Widgets/paginator.js"></script>
    <script src="57/Custom/CustomFields.js"></script>
    <script src="57/ViewModels/Common/ImagePopupViewModel.js"></script>
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
		    ApplicationController.navigateTo("MyProfile");

	                } (window));
	            </script>
 