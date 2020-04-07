
(function (global) {

    var bIsFirstTime = true,
        $mainView,
        biScrollEnabled;

    // override some default jQuery mobile configuration
    // doc : http://jquerymobile.com/demos/1.1.0/docs/about/features.html#ns
    $(document).on("mobileinit", function () {
        GO.log('mobileinit');
        // all jquery bindings start by "data-gomobile-"
        $.mobile.ns = 'gomobile-';
        // custom loading message
        $.mobile.loadingMessage = 'Chargement&hellip;';
        // 
        $.mobile.allowCrossDomainPages = true; // set to false if in a normal web environmeent with only one domain

        $.mobile.pushStateEnabled = false; // disable the partial URL replacement as the server does not manage it
        $.mobile.hashListeningEnabled = false;
        //$.mobile.defaultPageTransition = 'flip';
        // splash screen no longer needed
        $('#splash-screen').remove();
        $('html').removeClass('go-loading');

        biScrollEnabled = !$.support.touchOverflow && $.support.touch; // in a touch environment and no overflow:scroll support ? replace by iScroll

        $.event.special.swipe.horizontalDistanceThreshold = 50; // was 30. Less sensible, in order to not have a swipe when scrolling down
    });


    // run each time a new page has been fetched. Here we use it to have the splash screen disappear and navigate to the first page
    $(document).on('pageinit', function (e) {
        //$.mobile.changePage( $('[data-gomobile-role=page]')[1] );
        // remove the splash screen by going to the first Page of the page
        if (bIsFirstTime === true) {
            GO.log('pageinit first time', arguments);
            bIsFirstTime = false;
            // run the parsing and register as a page
            //$('#global-navigation').page();
            //TODO: make this generic
            var $firstPage = $('#ContactGrid');
            $.mobile.firstPage = $firstPage;
            // parses, register as page AND throw the event
            $.mobile.changePage(
		        $firstPage, // here the url of the page, or its DOM location if already loaded
		        {transition: 'none',
		        changeHash: false
		    }
		    );
            // we focused to main page, but we want to show the menu anyway
            //$('#global-navigation').addClass('ui-page-active');
        } else {
            GO.log('pageinit', arguments);
        }

        // if the main menu was called, we keep the focus on the 
        /*if( $(e.target).attr( "data-" + $.mobile.ns + "role") === 'popover')
        GO.log('popover was called');
        */
    });
    // called before jquery mobile parses and render a page
    $(document).on('pagebeforecreate', function (e) {

        GO.log('pagebeforecreate', $(e.target).attr('id'));
        if ($(e.target).attr("data-" + $.mobile.ns + "role") === 'popover')
            GO.log('popover was called');
    });

    $(document).on('pageload', function () {
        GO.log('pageload', arguments);
    });
    $(document).on('pagebeforechange', function (e) {
        //debugger;
        GO.log('pagebeforechange', arguments);
        //e.preventDefault();
    });

    $(document).on('pagechange', function () {
        GO.log('pagechange', arguments);
    });

    $(document).on('pagebeforeshow', function (e, ui) {
        // let a chance to the next page to be as small as possible
        //$(e.target).
        //$(ui.prevPage).addClass('transitioning');

        GO.log('pagebeforeshow', e, ui.prevPage);
    });
    // before displaying a page, update it
    $(document).on('pagebeforehide', function (e, ui) {
        //$(ui.nextPage).addClass('transitioning');
        GO.log('pagebeforehide', e, ui.nextPage, ui.nextPage.attr('id'));

        /*
        // should use some kind of routing system to bind the loaded view with the model.
        // or evaluate the inline JS of the view
        if(ui.nextPage.attr('id') === 'ContactForm')
        ko.applyBindings( global.ContactPageController.ContactFormViewModel, document.getElementById("ContactForm"));
        */
    });
    $(document).on('pageshow', function (e, ui) {
        //$(ui.prevPage).removeClass('transitioning');
        GO.log('pageshow', e, ui.prevPage); // A jQuery collection object that contains the page DOM element that we just transitioned away from. Note that this collection is empty when the first page is transitioned in during application startup.
    });


    var iScrollInstances = {};

    $(document).on('pagehide', function (e, ui) {
        // $(ui.nextPage).removeClass('transitioning');
        GO.log('pagehide', e, ui.nextPage); // A jQuery collection object that contains the page DOM element that we just transitioned to.

        // enable the overthrow library : emulated overflow:auto for the non iOS 5 browsers
        ui.nextPage.find('>[data-gomobile-role=content]:not(.ui-nodatamessage)').addClass("overthrow");

        /* tried it the most famous scroll library, not very fluid on webkit android 2.3, buggy on Firefox mobile,
        and buggy when form elements were there
        */
        /*GO.log( $.support.touchOverflow );
        GO.log( biScrollEnabled );*/
        /*if( biScrollEnabled === true) {
        var instanceName = ui.nextPage.attr('id');
        if( instanceName ) {
        if( !iScrollInstances[instanceName] ) {
        GO.log('top', ui.nextPage.find('>[data-gomobile-role=content]:not(.ui-nodatamessage)').get(0) );
        iScrollInstances[instanceName] = new iScroll( ui.nextPage.find('>[data-gomobile-role=content]:not(.ui-nodatamessage)').get(0) );
        GO.log(iScrollInstances[instanceName]);
        } else {
        setTimeout(function () {
        iScrollInstances[instanceName].refresh();
        }, 0);
        }
        } else {
        console.warn('no id on this page, so no scrolling');
        }
        }*/
        //if( DemoGrid.Web.ViewModels[ui.nextPage.attr('id') + "ViewModel"] ) {
        //  var viewModel = new DemoGrid.Web.ViewModels[ui.nextPage.attr('id') + "ViewModel"](this/*, this.onPopupClosed, $popupContainer*/);
        //  ko.applyBindings( viewModel, ui.nextPage.get(0) );
        //}

    });

    //alert( window.innerHeight ); // 664 // 878


})(this);