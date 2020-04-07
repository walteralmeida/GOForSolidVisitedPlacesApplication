GenerativeObjects.Web = GenerativeObjects.Web || {};
GenerativeObjects.Web.widget = GenerativeObjects.Web.widget || {};

GenerativeObjects.Web.widget.dataGrid = (function (global) {
    'use strict';
    // the final constructor
    return function (oOptions) {
        var self = this;
        var that = this;

        if (oOptions.sGridName == undefined)
            throw new TypeError('oOptions.sGridName definition is missing');
        if (oOptions.columns == undefined)
            throw new TypeError('oOptions.columns definition is missing');
        if (oOptions.oSort === undefined)
            throw new TypeError('oSort option is missing. Specify at least null');
        // check for the sorting options
        if (oOptions.oSort() !== null) {
            if (!oOptions.oSort().columnName || !oOptions.oSort().order)
                throw new TypeError('oOptions.oSort object badly configured : please provide "columnName" and "order"');
            if (oOptions.oSort().order !== 'desc' && oOptions.oSort().order !== 'asc' && oOptions.oSort().order !== 'DESC' && oOptions.oSort().order !== 'ASC')
                throw new TypeError('oOptions.order should be either "asc" or "desc"');
        }

        if (oOptions.sDataBindRoot !== undefined) {
            if (oOptions.sDataBindRoot === null || oOptions.sDataBindRoot === "") {
                oOptions.sDataBindRoot = "";
            } else {
                oOptions.sDataBindRoot = oOptions.sDataBindRoot + ".";
            }
        }

        // merge specified and default options
        oOptions = $.extend({
            sDataBindRoot: "",
            // the base template for each element (li) and eventually the start of the sub-element (ul)
            sTplUl: null,
            sContainerId: 'data-grid',
            sIdName: 'id',
            iMaxHeight: 180, // in pixels : after that the table is scrollable. Set to 0 to disable scrolling
            sDefaultSortOrder: 'desc', // if the datagrid has to guess, that is the defaul sorting order
            dataCollectionName: 'data', // in the viewModel, where is the observable array of data
            dataCollectionObservable: null // the reference to the KO.observable object that lists the data to be displayed in the grid
        }, oOptions);

        //if (GenerativeObjects.Web.GetEnvironment().isMobile === false) {
        var makeTemplate = function () {
            var sHTML_Headers = [],
                sHTML_Rows = [],
                sHTML = [],
                iNbVisibleColumns = 0,
                col;

            // generate the correct number of columns
            for (var i = 0, iTotal = oOptions.columns.length; i < iTotal; i++) {
                col = oOptions.columns[i];
                var widthDefine;
                if (col.width == undefined) {
                    widthDefine = '';
                }
                else {
                    widthDefine = ' style="width : ' + (~~col.width == col.width ? col.width + 'px;"' : col.width + ';"');
                }

                var colclass = col.cssClass == undefined ? '' : col.cssClass + " ";
                var currentSortColName = (col.sortColumnName ? col.sortColumnName : col.columnName);

                if (col.isVisible) {
                    if (col.isSortable) { // sortable columns
                        colclass += "sortableCol";

                        // use sortColumnName if the column targetted column for sort is not the same than the line clicked.
                        // used in case of calculated fields.
                        sHTML_Headers.push('<th class="ui-grid-header-container pointer" scope="col"' + widthDefine,
                        'data-bind="click : function (data,event) {' + oOptions.sDataBindRoot + oOptions.sGridName + '.onHeaderClicked(\'' + currentSortColName + '\') }, ',
                        'css:{\'ui-grid-sort-s\':',
                            '( (' + oOptions.sDataBindRoot + 'sortOrder() == \'desc\') && (' + oOptions.sDataBindRoot + 'sortColumnName() == \'' + currentSortColName + '\')),',
                            ' \'ui-grid-sort-n\':((' + oOptions.sDataBindRoot + 'sortOrder() == \'asc\') && (' + oOptions.sDataBindRoot + 'sortColumnName() == \'' + currentSortColName + '\')), ',
                            ' \'ui-grid-sort-n-s\':(' + oOptions.sDataBindRoot + 'sortColumnName() !=  \'' + currentSortColName + '\') ',
                            '}">',
                            col.headerText,
                            '</a></span>',

                        '</th>');
                    }
                    else { // non sortable columns

                        sHTML_Headers.push('<th class="pointer" scope="col"' + widthDefine, 'data-bind="">',
                        col.headerText,
                        '</th>');

                    }

                    if (col.insertRowAsRaw) {
                        sHTML_Rows.push('<td data-bind="jqStopBubble: \'a\'"' + widthDefine + ' class="' + colclass + '">' + col.rowText + '</td>');
                    } else {
                        sHTML_Rows.push('<td data-bind="html: ' + col.rowText + (col.isLink ? ', jqStopBubble: \'a\'' : '') + '"' + widthDefine + ' class="' + colclass + '"></td>');
                    }
                    iNbVisibleColumns++;
                }
            }


            // final template
            // var gridheaderclass = oOptions.iMaxHeight !== 0 ? "grid-header" : "hidden-grid-header";
            var gridheaderclass = "grid-header";

            sHTML.push('<div class="gridControl nb-cols-', iNbVisibleColumns, '">');
            // header table

            // if (oOptions.iMaxHeight !== 0) {
            sHTML.push('<div>\
                        <div class="grid-header-wrapper">\
                            <table style="table-layout: fixed;word-wrap: break-word;" class="' + gridheaderclass + '">\
        				        <thead >\
    					        <tr>',
                                    sHTML_Headers.join(''),
                                '</tr>\
    				        </thead>\
    				        </table>\
                        </div>');

            //Adding a 16px-wide div to align the header columns with the content (when there is a scrollbar)
            sHTML.push('    <div class="grid-header grid-header-filler"></div>');
            //Closing the wrapping div
            sHTML.push('</div>');
            // }

            // content table
            // var gridheaderclass = oOptions.iMaxHeight === 0 ? "grid-header" : "hidden-grid-header";
            var gridheaderclass = "hidden-grid-header";
            sHTML.push('<div class="grid-content" data-bind="jqScroll: &quot;' + oOptions.sContainerId + '&quot;"">\
        		    <table style="table-layout: fixed;word-wrap: break-word;">\
        				<thead>\
        					<tr class="' + gridheaderclass + '">\
        					',
            // headers are duplicated here for accessibility reasons
                        sHTML_Headers.join(''),
                        '</tr>\
        				</thead>\
        				<tbody data-bind="foreach: ' + oOptions.sDataBindRoot + oOptions.dataCollectionName + '">\
        				<tr class="pointer" data-bind="attr:{\'data-id\': $data.Data.InternalObjectId}, click : $parent.' + oOptions.sDataBindRoot + oOptions.sGridName + '.onLineClicked,\
                            event : {dblclick : $parent.' + oOptions.sDataBindRoot + oOptions.sGridName + '.onLineDblClicked}">');
            sHTML.push(sHTML_Rows.join(''));

            sHTML.push('</tr>\
        				</tbody>\
        			</table>',
            //</div>',
            '</div>');
            return sHTML.join('');
        };
        //} 

        this.sContainerId = oOptions.sContainerId;

        var $container = $('#' + oOptions.sContainerId);

        // rather use the sNode* configurations options than modify this part of the DOM
        var sTplUl = oOptions.sTplUl || makeTemplate();
        if (oOptions.iMaxHeight > 0) {
            //$container.addClass('grid-scrollable');
        }

        this.makeUI = function () {
            $container.html(sTplUl);

            // the max-height can be used for the scrolling option
            if (oOptions.iMaxHeight > 0) {
                $container.find('> .gridControl > .grid-content').css('height', oOptions.iMaxHeight);
            }
        };

        // track the clicks on the header titles for the sorting options
        this.onHeaderClicked = function (colName) {
            if (oOptions.oSort() === null) {
                oOptions.oSort(
    	            {
    	                columnName: colName,
    	                order: oOptions.sDefaultSortOrder
    	            }
    	            );

            } else {
                var oCurrentColName = oOptions.oSort().columnName,
    	            sCurrentSortOrder = oOptions.oSort().order;

                // 2 cases : change the sort order only or change the sorted column
                if (colName === oCurrentColName) {
                    //GO.log(sCurrentSortOrder);
                    // invert the sort order option
                    oOptions.oSort({ columnName: colName, order: (sCurrentSortOrder === 'desc') ? 'asc' : 'desc' });
                } else {
                    oOptions.oSort({ columnName: colName, order: (sCurrentSortOrder === null) ? oOptions.sDefaultSortOrder : sCurrentSortOrder });
                }
            }

            // Set Sorting
            that.sortingOptions(oOptions.oSort());
        };

        // track the click on the lines ...
        this.onLineClicked = function (data, event) {
            that.selectedId(data.Data.InternalObjectId());
        };

        this.onLineDblClicked = function (data, event) {
            if (window.getSelection) { window.getSelection().removeAllRanges(); }
            else if (document.selection) { document.selection.empty(); }
            that.doubleClickCommand({
                line: data.Data.InternalObjectId()
            });
        };

        this.selectedId = ko.observable(null);
        this.commandExecuted = ko.observable({ command: null, line: 0 });
        this.doubleClickCommand = ko.observable({ line: 0 });
        this.sortingOptions = ko.observable(oOptions.oSort());
        this.enabled = ko.observable(true);

        this.selectedId.subscribe(function (newValue) {
            // manage the style
            $('#' + that.sContainerId).find('tr').removeClass('currenttr');
            $('#' + that.sContainerId).find('tr[data-id=' + newValue + ']').addClass('currenttr');
        });
    };
}(window));
