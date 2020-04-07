GenerativeObjects.Web = GenerativeObjects.Web || {};
GenerativeObjects.Web.widget = GenerativeObjects.Web.widget || {};

GenerativeObjects.Web.widget.paginator = (function (global) {
    'use strict';
    // the final constructor
    return function (oOptions) {
        var that = this;

        if (oOptions.sDataBindRoot !== undefined) {
            if (oOptions.sDataBindRoot === null || oOptions.sDataBindRoot === "") {
                oOptions.sDataBindRoot = "";
            } else {
                oOptions.sDataBindRoot = oOptions.sDataBindRoot + ".";
            }
        }

        // merge specified and default options
        oOptions = $.extend({
            sContainerId: 'widget-paginator',
            iTotalPageNumber: 0,
            iPageNumber: 0, // shown page
            bAutoHide: false, // true = disappears when iPageNumber < 2
            sDataBindRoot: '',
            sPaginatorName: '',
            iNbPageNumberToShow: 5 // total number of page number to display. It's better if it's an even number like 5 or 3
        }, oOptions);
        if (oOptions.iNbPageNumberToShow !== null && (oOptions.iNbPageNumberToShow % 2) === 0)
            throw new TypeError('iNbPageNumberToShow should be an even number (1, 3, 5...)');

        var $container = $('#' + oOptions.sContainerId);

        this.bAutoHide = oOptions.bAutoHide;
        this.iPageNumber = ko.observable(oOptions.iPageNumber); //.extend( {throttle:200} ); // add throttling, as that is often changed
        this.iTotalPageNumber = ko.observable(oOptions.iTotalPageNumber);

        this.prefix = ko.observable(oOptions.prefix ? oOptions.prefix : 'grid');


        this.makeUI = function makeUI() {
            if (that.bAutoHide === true && that.iTotalPageNumber() < 2) {
                $('#' + oOptions.sContainerId).html('');
                return;
            }

            // manage pagination that appears in the footer
            var sHTML_pagination = [],
            iPageNumber = that.iPageNumber(),
            iTotalPageNumber = that.iTotalPageNumber();
            var prefix = that.prefix();
            // first 2 arrows
            sHTML_pagination.push('<ul class="' + prefix + '-pagination">',
                '<li data-pagenumber="0"',
                    ' class="page-numbers ',
                    (iPageNumber < 1 + 2) ? 'invisible' : '',
                    '"><span class="ui-icon ui-icon-seek-first page-arrows"></span></li>',
                '<li ',
                ' data-pagenumber="', iPageNumber - 1, '"',
                ' class="page-numbers ', (iPageNumber < 1) ? 'invisible' : '', '">',
                '<span class="ui-icon ui-icon-seek-prev page-arrows"></span></li>'
            );

            // by default, display all of the page numbers
            var iStart = 0,
            iEnd = iTotalPageNumber;
            if (oOptions.iNbPageNumberToShow !== null) {
                var iDistribution = Math.floor(oOptions.iNbPageNumberToShow / 2); // from 5 to 2, 3 to 1, 1 to 0 ...
                iStart = Math.max(iStart, iPageNumber - iDistribution); // 3 - 2
                iEnd = Math.min(iEnd, iStart + oOptions.iNbPageNumberToShow); // 3 + 2

                // re-adjust the start if we reached the end
                iStart = Math.max(0, iEnd - oOptions.iNbPageNumberToShow);
            }

            // build the page numbers
            for (var i = iStart; i < iEnd; i++) {
                sHTML_pagination.push(
                    '<li data-pagenumber="', i, '" class="page-numbers ',
                    iPageNumber == i ? 'currentPage' : '',
                    '">', (i + 1), '</li>'
                );
            }

            // last 2 arrows
            sHTML_pagination.push(
                '<li data-pagenumber="', parseInt(iPageNumber, 10) + parseInt(1, 10), '" ',
                    'class="page-numbers ',
                    (iPageNumber >= (iTotalPageNumber - 1)) ? 'invisible' : '',
                    '">',
                    '<span class="ui-icon ui-icon-seek-next page-arrows"></span></li>',
                '<li data-pagenumber="', iTotalPageNumber - 1, '" ',
                    'class="page-numbers ',
                    (iPageNumber >= (iTotalPageNumber - (1 + 2))) ? 'invisible' : '', '">',
                    '<span class="ui-icon ui-icon-seek-end page-arrows"></span></li>',
            '</ul>');
            var $container = $('#' + oOptions.sContainerId);
            $container.html(sHTML_pagination.join(''));

            // This is not the cleanest way, but there is no direct / simple way in jQuery to check for events attached to 
            // a $ element. So we just unbind & rebind the click handler...
            // This whole widget could be moved to a KO Component for cleaner code
            $container.unbind("click").on('click', '.' + that.prefix() + '-pagination > li', paginatorClickHandler);
        };

        // regenerate and rebind if any number changes
        this.iTotalPageNumber.subscribe(this.makeUI);
        this.iPageNumber.subscribe(this.makeUI);

        $('#' + oOptions.sContainerId).on('click', '.' + that.prefix() + '-pagination > li', paginatorClickHandler);

        var paginatorClickHandler = function (e) {
            e.preventDefault();
            e.stopPropagation();
            // should fire the event
            if (parseInt(this.getAttribute('data-pagenumber')) > -1
            && parseInt(this.getAttribute('data-pagenumber')) < that.iTotalPageNumber()) {
                that.iPageNumber(this.getAttribute('data-pagenumber'));
            }
        }
    };
}(window));