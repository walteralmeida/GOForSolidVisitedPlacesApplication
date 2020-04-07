(function ($) {
    //Custom Autocomplete
    $.widget("custom.treeautocomplete", $.ui.autocomplete, {
        _lastFocusedItem: null,
        _inSubMenu: false,
        //lastKeyDownEvent: null,

        // Setting default
        options: {
            // Overwritting
            delay: 0,
            minLength: 0,
            autoFocus: true,
            // Adding new
            clearOnFocus: false,
            lazyLoadCallback: null,
            currentItem: null,
            fitToInput: true
        },

        //Overriding existing methods
        _renderItem: function (ul, item) {
            var that = this;

            var li = $("<li>").append($("<a>").html(item.label).attr("data-test-id", "lookup_item"));
            if (!item.selectable || item.command) {
                li.addClass("ui-treeautocomplete-disabled-node");
            }
            if (item.node) {
                li.addClass("ui-treeautocomplete-node");
                var ul2 = $("<ul>");
                if (this.options.lazyLoadCallback && !item.loaded) {
                    ul2.addClass("ui-autocomplete-loading");
                    $("<li>")
                       .append($("<a>").html("&nbsp;"))
                       .addClass("ui-autocomplete-loading")
                       .appendTo(ul2);
                } else {
                    $.each(item.fields, function (index, field) {
                        that._renderItemData(ul2, field);
                    });
                }
                li.append(ul2);
            }
            return li.appendTo(ul);
        },

        // Overriding with a slight modification
        _suggest: function (items) {
            /****************
            ** <Unchanged> **
            ****************/
            var ul = this.menu.element.empty();
            this._renderMenu(ul, items);
            this.menu.refresh();

            // size and position menu
            ul.show();
            ul.position($.extend({
                of: this.element
            }, this.options.position));
            this._resizeMenu();
            /*****************
            ** </Unchanged> **
            *****************/

            // Adding a fake event to deal with nested menus
            // This is a hack, should be dealt with by JQuery UI Menu Widget
            if (this.options.autoFocus) {
                this.menu.next($.Event("mousedown"));
            }
        },

        _openSubMenu: function (event) {
            if (this.options.lazyLoadCallback && this._lastFocusedItem.node && !this._lastFocusedItem.loaded) {
                var item = this.menu.active && this.menu.active.children(".ui-menu ").children(".ui-menu-item").first();
                if (item && item.length) {
                    this.menu._open(item.parent());
                }
            } else {
                this.menu.expand(event);
            }
        },

        // Overriding (with a call to _super() in the middle)           
        _create: function () {
            var self = this;

            this.element.addClass("ui-treeautocomplete-input");

            this._on(this.element, {
                //Adding some keyboard navigation shortcuts
                keydown: function (event) {
                    //this.lastKeyDownEvent = event;
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                        case keyCode.TAB:
                        case keyCode.RIGHT:
                            if (this.menu.active && this._lastFocusedItem && this._lastFocusedItem.node) {
                                // prevents the default behavior defined by original autocomplete
                                event.stopImmediatePropagation();
                                // prevents moving focus to next field (and thus closing the menu)
                                event.preventDefault();
                                this._openSubMenu(event);
                            }
                            break;
                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                            if (this.menu.active && this._lastFocusedItem && this._lastFocusedItem.node) {
                                if (!this._lastFocusedItem.selectable && !this._lastFocusedItem.command) {
                                    // prevents the default behavior defined by original autocomplete
                                    event.stopImmediatePropagation();
                                    // prevents moving focus to next field (and thus closing the menu)
                                    event.preventDefault();
                                    this._openSubMenu(event);
                                } else {
                                    // #6055 - Opera still allows the keypress to occur
                                    // which causes forms to submit
                                    suppressKeyPress = true;
                                    event.preventDefault();
                                    this.menu.select(event);
                                }
                            }
                            break;
                        case keyCode.LEFT:
                            // prevents the default behavior defined by original autocomplete
                            event.stopImmediatePropagation();
                            // prevents moving cursor to beginning/end of the text field in some browsers
                            event.preventDefault();
                            this.menu.collapse(event);
                            break;

                        case keyCode.PERIOD:
                        case keyCode.NUMPAD_DECIMAL:
                            //console.log(event);
                            // prevents the default behavior defined by original autocomplete
                            event.stopImmediatePropagation();
                            break;
                    }
                },

                // Detection of the DOT on keypress 
                keypress: function (event) {
                    // '.' is code 46 in ASCII
                    if (event.charCode == 46) {
                        var input = this._value();
                        input.substring(0, input.length - 1);
                        if (this.menu.active && this._lastFocusedItem && this._lastFocusedItem.node) {
                            event.preventDefault();

                            var currentActive = this.menu.active;
                            this.menu.expand(event);

                            this._delay(function () {
                                this.menu.focus(event, currentActive);
                            });
                        }
                    }
                },


                keyup: function (event) {
                    // On key up we need to check the field emptiness (to hide the cross)
                    // and reactive the main menu if necesserary 
                    if (this.checkIsEmpty()) {
                        this.menu.activeMenu = this.menu.element;
                        this._inSubMenu = false;
                    } else if (event.keyCode == $.ui.keyCode.BACKSPACE) {

                    }

                },
                //When user clicks on the input, an empty search is triggered
                mousedown: function (event) {
                    this.search("", event);
                },

                blur: function (event) {
                    if (!this.selectedItem || !this.selectedItem.selectable || this.selectedItem.command) {
                        this.clearInput(event);
                    }
                }
            });

            this._super();

            //$(this.menu.element).css("zIndex", 5000);
            $(this.menu.element).addClass("ui-treeautocomplete-menu").attr("data-test-id", "lookup_wrapper");

            //Suppressing existing select handler
            this._off(this.menu.element, "menuselect");
            //and adding new handlers
            this._on(this.menu.element, {
                menufocus: function (event, ui) {
                    this._lastFocusedItem = ui.item.data("ui-autocomplete-item");

                    // Special case for lazy loading
                    if (this.options.lazyLoadCallback && this._lastFocusedItem && this._lastFocusedItem.node && !this._lastFocusedItem.loaded) {
                        if (!ui.item.data("ui-treeautocomplete-isLoading")) {
                            var parentItem = this._lastFocusedItem,
                                that = this;
                            ui.item.data("ui-treeautocomplete-isLoading", true);
                            this.options.lazyLoadCallback(parentItem, function (newTree) {
                                parentItem.loaded = true;
                                parentItem.fields = newTree.fields;

                                // Live updating the menu with the new items
                                var ul = ui.item.find("ul").first().empty().removeClass("ui-autocomplete-loading");
                                that._renderMenu(ul, newTree.fields);
                                that.menu.refresh();
                            });
                        }
                    }
                    // If we're navigating the menu with keys, we set the value in the input
                    if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
                        this._value(this._lastFocusedItem.label);
                    }
                    // And prevent default value-setting
                    return false;
                },

                // Replacing existing handler (after calling _off on it).
                menuselect: function (event, ui) {

                    var item = ui.item.data("ui-autocomplete-item"),
                        previous = this.previous;

                    //Added for lazyloading (click on a loading submenu)
                    if (!item || !item.selectable) return;

                    // only trigger when focus was lost (click on menu)
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = previous;
                        // #6109 - IE triggers two focus events and the second
                        // is asynchronous, so we need to reset the previous
                        // term synchronously and asynchronously :-(
                        this._delay(function () {
                            this.previous = previous;
                            this.selectedItem = item;
                        });
                    }

                    //***** MODIFIED
                    var path = [],
                       LIs = this.menu.element.find('a.ui-state-active').parent();
                    for (var i = 0; i < LIs.length; i++) {
                        path.push($(LIs[i]).data("ui-autocomplete-item"));
                    }
                    item.path = path;

                    // SetItem triggers a select event
                    this.setItem(item, event);
                    //*****

                    // reset the term after the select event
                    // this allows custom select handling to work properly
                    this.term = this._value();

                    //***** MODIFIED
                    //close the menu only if this is not a node
                    if (item.selectable) {
                        this.close(event);
                    }
                    //*****
                }
            });

            // Replacing the focus event on input (to deal with the "clearOnFocus" option)
            this._off(this.element, "focus");
            this._on(this.element, {
                focus: function (event) {
                    if (this.clearOnFocus) {
                        this.clearInput(event);
                    }
                }
            });

            // If the currentItem is set, it must be a KO observable which we'll subscribe to
            // Changes outside of the menu will be transmitted through this variable
            // Cannot be set in the knockoutbindings.js, otherwise it would call the setItem method even when the widget hasn't been initialized
            if (this.options.currentItem != null) {
                this.options.currentItem.subscribe(function (value) {
                    self.setItem(value);
                });
                this._delay(function () {
                    self.setItem(this.options.currentItem());
                });
            }
        },

        _resizeMenu: function () {
            //When there is only one level of menu elements, we add a specific class
            //Thus enabling the addition of an overflow and/or max-height properties
            if (this.menu.element.find("ul").length == 0) {
                this.menu.element.addClass("nosublevels");

                // We also compute MaxHeight to make sure it fits the window
                var currentHeight = this.menu.element.height();
                var topPosition = this.menu.element.offset().top;
                var windowHeight = $(window).height();
                var scrollTop = $(window).scrollTop();

                var maxHeight = windowHeight - (topPosition - scrollTop) - 10;
                if (maxHeight > 0 && maxHeight < currentHeight)
                    this.menu.element.css("max-height", maxHeight + "px");
            } else {
                this.menu.element.removeClass("nosublevels");
            }

            if (this.options.fitToInput && this.element.is(":visible")) {
                this.menu.element.width(this.element.width());
            }
        },

        clearInput: function (event) {
            this.setItem({ label: "", value: null }, event);
        },

        //Specific to GO
        // item has to be an {label: string, value: object, selectable: boolean} object
        setItem: function (item, event) {
            if (!item) return;
            this.selectedItem = item;
            if (false !== this._trigger("select", event, { "item": item })) {
                this._value(item.value);
            }
        },

        checkIsEmpty: function () {
            return (this._value() == "");
        }
    });
})(jQuery);

(function ($) {
    //Custom Autocomplete
    $.widget("custom.combobox", {

        // Setting default
        options: {
            // Transmitting to treeautocomplete
            minLength: 0,
            source: $.noop(),
            select: $.noop(),
            // Adding new
            lazyLoadCallback: null,
            currentItem: null,
            fitToInput: true
        },

        _init: function () {
            this._checkIsEmpty();
        },

        _create: function () {
            var self = this;

            var div = $("<div>")
                .addClass("lookupFieldWrapper")
                .insertAfter(this.element);

            this.comboWrapper = $("<div>")
                .addClass("ui-treeautocomplete-comboboxwrapper")
                .appendTo(div);

            this.wrapperElt = $("<div>")
                .addClass("ui-treeautocomplete-wrapper")
                .appendTo(this.comboWrapper);
            this.element.hide();

            this._createTreeAutocomplete();
            this._createCrossButton();
            this._createComboxBoxArrow();
        },

        _createTreeAutocomplete: function () {
            var self = this;
            this.input = $("<input>")
                .appendTo(this.wrapperElt)
                .attr("title", "")
                .attr("type", "search")
                .attr("data-test-id", "lookup_input")
                .treeautocomplete({
                    source: self.options.source,
                    select: function (event, ui) {
                        self.options.select(event, ui);
                        self.input.val($("<div>").html(ui.item.label).text());
                        self._checkIsEmpty();
                        return false;
                    },
                    minLength: self.options.minLength,
                    lazyLoadCallback: self.options.lazyLoadCallback,
                    currentItem: self.options.currentItem,
                    fitToInput: self.options.fitToInput
                });
        },

        _createCrossButton: function () {
            this.emptyFieldCross = $("<a>")
                .attr("tabIndex", -1)
                .attr("title", "Clear Input")
                .attr("data-test-id", "lookup_clear_input")
                .addClass("ui-treeautocomplete-cross")
                .append($("<span>").html("x"))
                .appendTo(this.wrapperElt);
            this._hideEmptyFieldCross();

            this._on(this.emptyFieldCross, {
                mousedown: function (event) {
                    this.input.treeautocomplete("clearInput");
                }
            });
        },

        _createComboxBoxArrow: function () {
            var input = this.input,
            wasOpen = false;

            this.toggler = $("<a>")
              .attr("tabIndex", -1)
              .attr("title", "Show All Items")
              .attr("data-test-id", "lookup_show_all_items")
              .appendTo(this.comboWrapper)
              .button({
                  icons: {
                      primary: "ui-icon-triangle-1-s"
                  },
                  text: false
              })
              .removeClass("ui-corner-all")
              .addClass("ui-treeautocomplete-combobox-toggle ui-corner-right")
              .mousedown(function () {
                  wasOpen = input.treeautocomplete("widget").is(":visible");
              })
              .click(function () {
                  input.focus();

                  // Close if already visible
                  if (wasOpen) {
                      return;
                  }

                  // Pass empty string as value to search for, displaying all results
                  input.treeautocomplete("search", "");
              });
        },

        _displayEmptyFieldCross: function () {
            this.emptyFieldCross.show();
        },

        _hideEmptyFieldCross: function () {
            this.emptyFieldCross.hide();
        },

        _checkIsEmpty: function () {
            var isEmpty = (this.input.val() == "");
            if (isEmpty || this.options.disabled) {
                this._hideEmptyFieldCross();
            } else {
                this._displayEmptyFieldCross();
            }
            return isEmpty;
        },

        _setOptions: function (options) {
            this.input.treeautocomplete(options);
            this._super(options);
        },

        _setOption: function (key, value) {
            if (key === "disabled") {
                this.input.prop("disabled", value);
                if (value) {
                    this._hideEmptyFieldCross();
                    this.toggler.hide();
                } else {
                    this._displayEmptyFieldCross();
                    this.toggler.show();
                }
            }
            this._super(key, value);
        }
    });
})(jQuery);

(function ($) {
    //Custom Menu: first level is horizontal, following levels are "classical"
    $.widget("custom.hmenu", $.ui.menu, {

        options: {
            // New option to hide the arrows for the horizontal menu. 
            // If false, arrow pointing to the right are replaced by arrow pointing downward.
            hideFirstLevelArrow: false
        },

        _create: function () {
            this.element.uniqueId();
            this._super();
            var self = this;

            // using a specific positioning function
            this.options.position = {
                using: $.proxy(self._subMenuPosition, self)
            };

            var arrows = this.element.children("li").children("a").children("span.ui-icon-carat-1-e");
            if (this.options.hideFirstLevelArrow) {
                arrows.hide();
            } else {
                arrows.removeClass("ui-icon-carat-1-e").addClass("ui-icon-carat-1-s");
            }

            //HACK to force closing the menu when an element is selected (the delay induced by collapseAll doesn't work well, probably an issue with knockout.js)
            //TODO: add checking for empty nodes which don't link to anything, and prevent closing the menu for these nodes
            this.options.select = function (event, ui) {
                if (!ui.item.hasClass("ui-menu-empty-node")) {
                    self._close(self.element);
                }
            };
        },

        // This method is used for positioning the submenus
        // Needs to be called with $.proxy in order to set the correct context for "this"
        _subMenuPosition: function (position, elements) {
            var options = {
                of: elements.target.element,
                position: "fit"
            };

            // Level 2 elements are position under the first level LI, centered
            // Existence of an ID has been checked in the _create function
            if (elements.element.element.parent().parent().attr("id") === this.element.attr("id")) {
                options.my = "left top";
                options.at = "left bottom";
            }
                // Subslevel are positioned on the right of the current selected item
            else {
                options.my = "left top";
                options.at = "right top";
            }
            elements.element.element.position(options);
        }
    });
})(jQuery);

(function ($) {
    // A dropdown button attached to a button
    $.widget("custom.dropdownmenu", {

        options: {
            icons: {
                secondary: "ui-icon-triangle-1-s"
            }
        },

        _create: function () {
            var self = this;

            if ($(this.element).is("button") && !self.options.noIcon) {
                this.element.button(self.options);
            }

            this.menu = this.element.next().menu();
            this.menu.hide();

            // Removing the default Jquery UI theme on LIs
            this.menu.find("li").removeClass("ui-menu-item");
            //this.menu.css("position", "absolute");

            //Displaying the menu on click
            this.element.click(function (event) {
                event.preventDefault();
                self.menu.show()
                    .position({
                        my: "left top",
                        at: "left-10 bottom",
                        of: $(self.element),
                        position: "fit"
                    });
                $(document).one("click", function () {
                    self.menu.hide();
                });
                return false;
            });
        }
    });
})(jQuery);

(function ($) {
    $.fn.selectText = function () {
        var doc = document
            , element = this[0]
            , range, selection
        ;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
})(jQuery);