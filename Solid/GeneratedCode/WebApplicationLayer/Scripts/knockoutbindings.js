ko.bindingHandlers.stopBindings = {
    init: function () {
        return { 'controlsDescendantBindings': true };
    }
};

ko.bindingHandlers.jqButton = {
    init: function (element) {
        $(element).button(); // Turns the element into a jQuery UI button
    }
};

ko.bindingHandlers.iFrameResize = {
    update: function (element) {
        $(element).iFrameResize({
            heightCalculationMethod: 'grow',
            checkOrigin : false
        });
    }
};

ko.bindingHandlers.focusHandler = {
    init: function (element, valueAccessor) {
        $(element).focus(function () {
            var source = $(element);
            for (var i = 0; i < valueAccessor().level; i++)
                source = source.parent();

            source.addClass(valueAccessor().focusClass);
        });

        $(element).blur(function () {
            var source = $(element);
            for (var i = 0; i < valueAccessor().level; i++)
                source = source.parent();

            source.removeClass(valueAccessor().focusClass);
        });
    }
};

ko.bindingHandlers.bootstrapDropDown = {
    init: function (element) {
        $(element).dropdown(); // Turns the element into a bootstrap DropDown button
    }
};

ko.bindingHandlers.jqueryDropDown = {
    init: function (element, valueAccessor) {
        var options = {};
        if (valueAccessor().noIcon) {
            options.noIcon = true;
        }

        $(element).dropdownmenu(options);
    }
};


ko.bindingHandlers.jqClickToSelectText = {
    init: function (element, valueAccessor) {

        var nbClick = 2;
        var fct = function () {
            $(this).selectText();
        };

        if (valueAccessor()) {
            nbClick = valueAccessor().numberOfClicks;
        }

        switch (nbClick) {
            case 1:
                $(element).click(fct);
                break;
            default:
                $(element).dblclick(fct);
                break;
        }
    }
};

ko.bindingHandlers.jqTab = {
    init: function (element, valueAccessor) {
        var tabcontenuclass = '.' + $(element).attr('id') + '-contenu';
        var tabclass = 'ul.' + $(element).attr('id');
        var $elt = $(element);
        var accessor = valueAccessor();

        // Hiding all content
        $elt.find(tabcontenuclass).hide();

        // Activating first tab and displaying associated content
        $elt.find(tabclass + ' li:first').addClass('active').show();
        var firstContent = '.' + $elt.find(tabclass + ' li:first').find('a').attr('data-id');
        $(firstContent).fadeIn();

        // Adding a change method handler when exists
        var onChangeMethod = $.noop;
        if (accessor && accessor.onChangeMethod) {
            onChangeMethod = accessor.onChangeMethod;
        }

        // Adding a selectTab method handler when exists
        if (accessor && accessor.TabIndex) {
            var tabIndex = accessor.TabIndex;
            tabIndex.subscribe(function (tabid) {

                //accessor.selectTabMethod = function (tabid) {
                var selectedTabclass = tabclass + ' li:nth-child(' + tabid + ')';
                var current = $elt.find(selectedTabclass);
                if (!current.hasClass('active'))
                    current.click();
            });
        }

        // Add click handler to each tab
        $elt.find(tabclass + ' li').click(function () {
            // Handling tabs
            $elt.find(tabclass + ' li').removeClass('active');
            $(this).addClass('active');

            // Handling content
            $elt.find(tabcontenuclass).hide();
            var actif = '.' + $(this).find('a').attr('data-id');
            $elt.find(actif).fadeIn();

            var tabIdParts = actif.split('-');
            // Calling change method (might be $.noop)
            onChangeMethod(tabIdParts[tabIdParts.length - 1]);
            return false; // prevent bubbling
        });
    }
};


ko.bindingHandlers.jqScroll = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $(element).mCustomScrollbar({
            advanced: { updateOnBrowserResize: true, updateOnContentResize: true, autoExpandHorizontalScroll: false },
            scrollButtons: { enable: true },
            scrollInertia: 0,
            containerId: valueAccessor()
        }); // Turns the element into a jQuery smooth scroll container
    }
};


ko.bindingHandlers.jqStopBubble = {
    init: function (element, valueAccessor) {
        var selector = valueAccessor();
        var $elt = $(element);

        if (selector && typeof selector === 'string') {
            $elt = $elt.find(selector);
        }

        $elt.on("click", function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        });
        $elt.on("dblclick", function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        });
    }
};


ko.bindingHandlers.jqDatePicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

        var $el = $(element),
            associatedDate = valueAccessor().selectedDate, // ko observable            
            currentValue = ko.utils.unwrapObservable(associatedDate),
            bound = valueAccessor().bound, // String keyword for boundary (FROM or TO) (optional)
            otherBoundId = valueAccessor().otherBoundId, // String ID for the coupled element (optional)
            withTime = valueAccessor().withTime, // Boolean for time (optional)
            additionnalChangeMethod = $.noop; // Function which will be set when 2 datefields are bound            

		function onChangeMethod() {
			if ($el.data("isShowing") && $el.data("isDirty")) {
				$el.data("isUpdating", true); // to prevent self updates
				var newValue = $el.datetimepicker("getDate");
				$el.data("setObservableDate").call($el, newValue);
				$el.data("selectionChangedMethod").call($el, newValue);
				$el.data("isUpdating", false);
				$el.data("isDirty", false);
			}
        }

        // Checking if this DatePicker is part of a coupled DatePicker (with boundaries)
        if (bound === 'FROM') {
            additionnalChangeMethod = function additionnalChangeMethod() {
                var newValue = $el.datetimepicker("getDate");
                $("#" + otherBoundId).datetimepicker("option", "minDate", newValue);
            }
        } else if (bound === 'TO') {
            additionnalChangeMethod = function additionnalChangeMethod() {
                var newValue = $el.datetimepicker("getDate");
                $("#" + otherBoundId).datetimepicker("option", "maxDate", newValue);
            }
        }

        // Function called before the picker is displayed to set a defaultDate if none exist
        // We prefer doing it here so that the input field remains empty while no picker has been displayed
		function checkDateIsSet() {
			$el.data("isShowing", true);

            var value = ko.utils.unwrapObservable($el.data("getObservableDate")());
            if (!value) {
                value = new Date();
                value.setHours(0, 0, 0, 0);
                $el.datetimepicker("setDate", value);
            }
        }

        // Init
        var jqOptions = {
            // Function Called when dateTimePicker is closed      
            onClose: function onCloseMethod(dateText, inst) {
                $el.data("isDirty", true);  // force final sync
                onChangeMethod();
				additionnalChangeMethod();
				$el.data("isShowing", false);
				$el.data("isDirty", false);
            },

            // Function called before the picker is displayed to set a defaultDate if none exist
            // We prefer doing it here so that the input field remains empty while no picker has been displayed
            beforeShow: checkDateIsSet,
            showSecond: false,
        };
        if (!withTime) {
            jqOptions.showButtonPanel = false;
            jqOptions.showTimepicker = false;
        }

        // Init
        $el.datetimepicker(jqOptions);

        // Handlers
        // handle the field changing 
        ko.utils.registerEventHandler(element, "change", function () {
			if ($el.data("isShowing"))
				$el.data("isDirty", true);
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $el.datetimepicker("destroy");
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $el = $(element),
            associatedDate = valueAccessor().selectedDate, // ko observable            
            value = ko.utils.unwrapObservable(associatedDate),
            current = $el.datetimepicker("getDate");

        // As the observable reference may change over time without changing the field
        // We need to "proxy" the reference, stored in the JQuery element
        // *******************
        // We could have defined all the init stuff in the update method but registering the "change"
        // event would have occured every time the date field dataobject would be changed (might be a lot)
        $el.data("getObservableDate", function () {
            return valueAccessor().selectedDate();
        });

        $el.data("setObservableDate", function (newvalue) {
            return valueAccessor().selectedDate(newvalue);
        });

        $el.data("selectionChangedMethod", function (newvalue) {
            return valueAccessor().onselectionchanged(newvalue);
        });
        
        if (!$el.data("isUpdating") && (!value || value - current !== 0)) {
            // Resetting current value
            $el.datetimepicker("setDate", value);
        }
    }
};

ko.bindingHandlers.jqModalDialog = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $(element).tabs(); // Turns the element into a jQuery Tab container
        $(element).dialog({
            autoOpen: false,
            hide: "fade",
            show: "fade",
            width: 730,
            modal: true,
            resizable: false,
            close: viewModel[$(element).attr("onclose")]
        });
    }
};

/* on form elements, will set or remove the readonly attribute */
ko.bindingHandlers.readonly = {
    init: function (element) {
        if (!element.tagName || element.tagName.toLowerCase() != 'input')
            throw new TypeError('KO readonly binding is useful only on an input element');
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value === true)
            element.setAttribute("readonly", "readonly");
        else if (value === false)
            element.removeAttribute("readonly");
        else
            throw new TypeError('OK readonly binding requires a real Boolean');
    }
};

ko.bindingHandlers.jqProgressBar = {
    init: function (element, valueAccessor) {
        $(element).progressbar({ value: valueAccessor() });
    },
    update: function (element, valueAccessor) {
        $(element).progressbar("value", valueAccessor());
    }
};


ko.bindingHandlers.jqCycle = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        navId = 'jqCycleNav' + element.id;
        navIdSharp = '#' + navId;
        $(navIdSharp).remove();
        if ($(element).children().length > 1) {
            $(element).before('<ul id="' + navId + '" class="jqCycleNav">').cycle({
                fx: 'fade',
                speed: 'fast',
                timeout: 0,
                pager: navIdSharp,

                // callback fn that creates a thumbnail to use as pager anchor 
                pagerAnchorBuilder: function (idx, slide) {
                    return '<li><a href="#"><img src="' + slide.src + '" width="50" height="50" /></a></li>';
                }
            });
        }
    }
};

ko.bindingHandlers.jqFadePopupContainer = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $("#popupContainer").show().position({ my: "center center", at: "center center", of: window }).hide().fadeIn("slow");
    }
};

// knockout binding to create a auto-complete widget
// the element on which the pluggin applies must include the following attributes
// datasource : name of the viewmodel datasource
// onselectionchanged : name of the viewmodel callback method to call when selection changes
ko.bindingHandlers.jqComboBox = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $input = $(element);

        $input.combobox({
            source: valueAccessor().datasource,
            select: function (event, ui) {
                // Displays the correct label
                $input.val(ui.item.label);
                // Tells the ViewModel to change the associated item
                valueAccessor().onselectionchanged(ui.item);
                return false; //Prevents default behavior
            },
            minLength: (valueAccessor().minLength ? valueAccessor().minLength : 0),
            lazyLoadCallback: valueAccessor().lazyLoadCallback,
            // Reference to a KO observable which contains the objet controlled by the autocomplete
            currentItem: valueAccessor().currentItem,
            fitToInput: valueAccessor().fitToInput,
            disabled: !allBindingsAccessor().enable
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $(element).combobox({
            minLength: (valueAccessor().minLength ? valueAccessor().minLength : 0),
            disabled: !allBindingsAccessor().enable
        });
    }
};

// Specific Binding for field upload
ko.bindingHandlers.fileUpload = {
    update: function (element, valueAccessor) {

        // All configuration must be in binding
        var configuration = valueAccessor();

        // We need to proxy the call to the "Start Upload" method
        // in order to pass the right parameter
        var addMethod = configuration.addMethod;
        delete configuration.addMethod;
        configuration.add = function (e, data) {
            addMethod(data);
        };

        // Binding
        $(element).fileupload(configuration);
    }
};

ko.bindingHandlers.imageCropper = {
    init: function (element, valueAccessor) {
        var $elt = $(element),
            config = ko.utils.unwrapObservable(valueAccessor());

        var $imgContainer = $elt.find('img');
        $elt.find('input[type=file]').change(function (evt) { config.changeMethod(evt.currentTarget, $imgContainer.get(0)); });

        $elt.find('button[data-role="crop-button"]').click(function (evt) {
            config.initCropperMethod($imgContainer.get(0));
        });

        if (config.maxWidth) {
            $elt.find('.imageWrapper').css('max-width', config.maxWidth);
        }

        if (config.maxHeight) {
            $elt.find('.imageWrapper').css('max-height', config.maxHeight);
        }       
    }
}

ko.bindingHandlers.tooltip = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $elt = $(element);
        var content = ko.utils.unwrapObservable(valueAccessor());

        $elt.click(function (evt) {
            var $tooltip = $("<div>").addClass("ui-tooltip ui-widget ui-widget-content ui-corner-all").css("top", 0).css("left", 0).html(content).appendTo("body").uniqueId();

            $tooltip.position({
                my: "left top",
                at: "right bottom",
                of: $elt,
                collision: "fit"
            });

            // The close handler which removes tooltip from DOM and event
            var closeHandler = function (evt) {
                if (evt && $(evt.target).attr("id") == $tooltip.attr("id"))
                    return false;

                $("body").off("click", closeHandler);
                $elt.off("mouseover", resetCheckTimeout);
                $elt.off("mouseout", setCheckTimeout);
                $tooltip.remove();
            };

            // Dealing with leaving / entering dom
            var checkTimeout;
            var setCheckTimeout = function (evt) {
                checkTimeout = setTimeout(closeHandler, 300);
            };

            var resetCheckTimeout = function (evt) {
                if (checkTimeout)
                    clearTimeout(checkTimeout);
            };


            setTimeout(function () {
                // Set the click event on body to close the tooltip without delay (except if clicks occurs on the tooltip, for selection purpose for instance)
                $("body").on("click", closeHandler);

                // Set the mouseout event on the element & tooltip to hide tooltip after delay
                $elt.mouseout(setCheckTimeout);
                $tooltip.mouseout(setCheckTimeout);

                // Set the mouseover event on the element & tooltip to remove the check
                $elt.mouseover(resetCheckTimeout);
                $tooltip.mouseover(resetCheckTimeout);
            }, 1);

        });
    }
};

ko.bindingHandlers.richText = {

    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

        //var txtBoxID = $(element).attr("id");

        var $textarea = $(element).uniqueId();
        var currentId = $textarea.attr("id");

        // Options may be specified through the corresponding object in the valueAccessor
        var options = valueAccessor().options || {};

        // Init
        if (!CKEDITOR.instances[currentId]) {
            CKEDITOR.replace(currentId, options);
        }

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (CKEDITOR.instances[currentId]) {
                $textarea.removeUniqueId();
                CKEDITOR.remove(CKEDITOR.instances[currentId]);
            }
        });

        // Wire up the blur event to ensure our observable is properly updated
        CKEDITOR.instances[currentId].focusManager.blur = function () {
            var source = valueAccessor().source;
            source(CKEDITOR.instances[currentId].getData());
        };

        CKEDITOR.instances[currentId].on('instanceReady', function (event) {
            var source = ko.utils.unwrapObservable(valueAccessor().source);
            CKEDITOR.instances[currentId].setData(source);
            //sometimes source is empty, and we just need to wait a few and it's ok
            if (GO.isNullOrWhitespace(source)) {
                setTimeout(function () {
                    var source = ko.utils.unwrapObservable(valueAccessor().source);
                    CKEDITOR.instances[currentId].setData(source);
                }, 300)
            }
        }, this);
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        // Setting the value from the observable
        var source = ko.utils.unwrapObservable(valueAccessor().source);
        CKEDITOR.instances[$(element).attr("id")].setData(source);
    }
};

// Binding used for grids widget to make sure they are create after HTML has been loaded into DOM
ko.bindingHandlers.gridWidgetInitializer = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var initializer = valueAccessor();
        initializer();
    }
};

// Report init binding
ko.bindingHandlers.chartJSWidgetInitializer = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var initFunction = valueAccessor();

        var canvas = $(element).find("canvas")[0];
        initFunction(canvas);
    }
};

// Ellipsis functionnality : toggle truncature when click on the cell
/**
 * @param string cssClassName
 * @type {{init: ko.bindingHandlers.toggle.init}}
 */
ko.bindingHandlers.toggleCssClass = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $elt = $(element);
        var cssClassName = valueAccessor();
        $elt.click(function (evt) {
            if ($elt.hasClass(cssClassName)) {
                //else add it
                $elt.removeClass(cssClassName);
            } else {
                //if class ellipsis => remove
                $elt.addClass(cssClassName);
            }
        });
    }
};

/* attach that to an observableArray to have $index available in the templates
* eg:
* var myKoArray = ko.observableArray([1, 2, 3]).indexed();
* <ul data-bind="foreach: myKoArray">
*   <li data-bind="attr:{\'data-index\': $index}">' );
* </ul>
*/
ko.observableArray.fn.indexed = function () {
    //whenever the array changes, make one loop to update the index on each
    this.subscribe(function (newValue) {
        if (newValue) {
            var item;
            for (var i = 0, j = newValue.length; i < j; i++) {
                item = newValue[i];
                if (!ko.isObservable(item.$index)) {
                    item.$index = ko.observable();
                }
                item.$index(i);
            }
        }
    });

    this.valueHasMutated();
    return this;
};

ko.extenders.decimal = function (target, option) {
    //create a writable computed observable to intercept writes to our observable
    var result = ko.pureComputed({
        read: target,  //always return the original observables value
        write: function (newValue) {
            if (newValue !== null && newValue !== undefined && newValue !== "")
                target(parseFloat(parseFloat(parseFloat(newValue).toPrecision(option.precision)).toFixed(option.scale)));
            else
                target(newValue);
        }
    });

    //initialize with current value to make sure it is rounded appropriately
    result(target());


    //return the new computed observable
    return result;
};

/**
 * locale always fr-FR
 * to have the same separator in edit and view mode, we replace ',' by '.'
 * @type {{update: ko.bindingHandlers.formattedNumber.update}}
 */
ko.bindingHandlers.formattedNumber = {
    update: function(element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/toLocaleString#Syntaxe
        //options = { style: "currency", currency: "EUR" };
        var formattedValue = GO.FormatNumber_custom(value, allBindingsAccessor.get('scale'));

        ko.bindingHandlers.text.update(element, function() { return formattedValue; });
    }
};

ko.extenders.trim = function (target, option) {
    //create a writable computed observable to intercept writes to our observable
    var result = ko.pureComputed({
        read: target,  //always return the original observables value
        write: function (newValue) {
            target($.trim(newValue));
        }
    });
    //initialize with current value 
    result(target());
    //return the new computed observable
    return result;
};

/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au) and Stéphane Nahmani (sholby@sholby.net). */
jQuery(function ($) {
    $.datepicker.regional['fr'] = {
        closeText: 'Fermer',
        prevText: '&#x3c;Préc',
        nextText: 'Suiv&#x3e;',
        currentText: 'Courant',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
		'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
		'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['fr']);

    $.timepicker.regional['fr'] = {
        currentText: 'Courant',
        closeText: 'Valider',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        timeFormat: 'HH:mm:ss',
        timeSuffix: '',
        timeOnlyTitle: '',
        timeText: 'S&eacute;lection',
        hourText: 'Heure',
        minuteText: 'Minute',
        secondText: 'Seconde',
        millisecText: 'Milliseconde',
        microsecText: 'Microseconde',
        timezoneText: 'Fuseau horaire',
        isRTL: false
    };
    $.timepicker.setDefaults($.timepicker.regional['fr']);
});

// Adding specific handler for templates which uses the viewLoader
// When registering a component, we can provide a specific suffix where 
// HTML templates will be deployed (templateConfig.templateUrl)
// By default, we fall back to the ConstructedViews/CUSTOM/ folder.
//
// The getConfig implementation provides a default if form name contains "PartialView"
// It means the component implementation is generated and stored by used
// 
// Note that using the viewLoader means that all templates must be stored in the
// /ConstructedViews/ folder on the server.
ko.components.loaders.unshift({
    loadTemplate: function (componentName, templateConfig, callback) {

        var viewName = templateConfig.templateUrl || "CUSTOM/" + componentName;

        ApplicationController.viewLoader.loadView({
            viewName: viewName, successHandler: function (data) {
                ko.components.defaultLoader.loadTemplate(componentName, data, callback);
            }
        });
    },
    getConfig: function (name, callback) {
        if (name.indexOf('PartialViews') > -1) {
            callback({ template: { templateUrl: name } });
        } else {
            callback(null);
        }
    }
});
