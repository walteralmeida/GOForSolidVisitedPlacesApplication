<%@ Language="C#" AutoEventWireup="true" CodeBehind="Application.aspx.cs" Inherits="Solid.Application.Web.Views.Application" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solid Project</title>
    <link href="styles/44/reset.css" rel="stylesheet" />
    <link href="styles/44/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
    <link href="styles/44/jquery.alerts.css" rel="stylesheet" />
    <link href="styles/44/myapplication.css" rel="stylesheet" />
    <link href="styles/44/widget-grid.css" rel="stylesheet" />
    <link href="styles/44/jquery.jgrowl.css" rel="stylesheet" />
    <link href="styles/44/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="styles/44/jquery.custom.GO.css" rel="stylesheet" />
    <link href="styles/44/Reports.css" rel="stylesheet" />
    <link href="styles/44/layout.css" rel="stylesheet" />
    <link href="styles/44/Reports.css" rel="stylesheet" />
    <link href="styles/44/ui-elements.css" rel="stylesheet" />
    <link href="styles/44/LoginPage.css" rel="stylesheet" />
    <link href="styles/44/BreadCrumb.css" rel="stylesheet" />
    <link href="styles/44/Grid-Widget.css" rel="stylesheet" />
    <link href="styles/44/documentation.css" rel="stylesheet" />
    <link href="styles/44/JqueryMenu.css" rel="stylesheet" />
    <link href="styles/44/MobileLayout.css" rel="stylesheet" />
    <link href="styles/44/sidr.css" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="styles/images/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="44/scripts/json2.min.js"></script>
    <script src="44/scripts/knockout-3.4.js"></script>
    <script src="44/scripts/jquery-1.12.1.min.js"></script>
    <script src="44/scripts/jquery.cookie.js"></script>
    <script src="44/scripts/jquery.alerts.js"></script>
    <script src="44/scripts/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="44/scripts/jquery.custom.GO.js"></script>
    <script src="44/scripts/jquery.metadata.js"></script>
    <script src="44/scripts/mersenne-twister.js"></script>
    <script src="44/scripts/jquery.hoverIntent.js"></script>
    <script src="44/scripts/jquery.mousewheel.min.js"></script>
    <script src="44/scripts/jquery.mCustomScrollbar.js"></script>
    <script src="44/scripts/jquery.cycle.all.js"></script>
    <script src="44/scripts/knockoutbindings.js"></script>
    <script src="44/scripts/knockout.postbox.js"></script>
    <script src="44/scripts/base64.js"></script>
    <script src="44/scripts/generativeobjects.js"></script>
    <script src="44/scripts/jquery.jgrowl.js"></script>
    <script src="44/scripts/sammy-min.js"></script>
    <script src="44/scripts/solid-auth-client.bundle.js"></script>
    <script src="44/scripts/sidr.min.js"></script>
    <script src="44/namespaces.js"></script>
    <script src="44/Application/Application.js"></script>
    <script src="44/Application/ApplicationMessages.js"></script>
    <script src="44/Application/ApplicationSettings.js"></script>
    <script src="44/Views/ViewLoader.js"></script>
    <script></script>
    <script src="44/Application/ApplicationSourceHandler.js"></script>
    <script src="44/Application/ApplicationController.js"></script>
    <script src="44/Custom/Application/SourceHandler.custom.js"></script>
    <script src="44/Custom/Application/Routes.custom.js"></script>
    <script src="44/Custom/Application/ApplicationViewModel.custom.js"></script>
    <script src="44/Custom/ViewModels.js"></script>
    <script src="44/Custom/PageControllers.js"></script>
    <script src="44/Custom/EntityFactories.js"></script>
    <script src="44/Custom/EntityValidators.js"></script>
    <script src="44/Model/DataStores/DataMapper.js"></script>
    <script src="44/Application/ApplicationViewModel.js"></script>
    <script src="44/Model/DataStores/DataStore.js"></script>
    <script src="44/Model/DataSets/ObjectsDataSet.js"></script>
    <script src="44/ViewModels/Common/NoticeBoxViewModel.js"></script>
    <script src="44/ViewModels/Common/DialogPopupViewModel.js"></script>
    <script src="44/Widgets/datagrid.js"></script>
    <script src="44/Widgets/paginator.js"></script>
    <script src="44/Custom/CustomFields.js"></script>
    <script src="44/ViewModels/Common/ImagePopupViewModel.js"></script>
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
 