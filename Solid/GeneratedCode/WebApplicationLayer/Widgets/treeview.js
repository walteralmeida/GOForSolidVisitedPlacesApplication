GenerativeObjects.Web = GenerativeObjects.Web || {};
GenerativeObjects.Web.widget = GenerativeObjects.Web.widget || {};

/* uses the jquery-treeview
http://docs.jquery.com/Plugins/Treeview
*/
GenerativeObjects.Web.widget.treeView = (function (global) {

    // the final constructor
    return function (oOptions) {
        if (!oOptions.fGetChilds)
            throw new TypeError('Please provide oOptions.fGetChilds to the treeView widget. It should be a method that accepts an ID and a callback and that will retrieve the data');

        // merge specified and default options
        oOptions = $.extend({
            // the base template for each element (li) and eventually the start of the sub-element (ul)
            sTplUl: null,
            sContainerId: 'tree-dynamic2', // the treeview widget will install itself in this part of the DOM
            sRootName: 'root', // in the ViewModel, the name of the level 0
            sNodeIdAttributeName: 'Id', // in the model object, the property name that will be passed back when the objects are selected
            sNodeDisplayName: 'Name', // in the model object, the property name that will be used to display in the treeview
            hasChildMethodName: 'hasChild' // in the model object, the method name used to determine if we should display a + in the treeview
        }, oOptions);

        // rather use the sNode* configurations options than modify this part of the DOM
        // TODO ? : to fasten the making of the DOM, we could replace the usage of KO by a simple string manipulation
        var sTplUl = oOptions.sTplUl || '<ul data-bind="foreach: koObjectList">\
    		<li data-bind="attr:{\'data-id\': ' + oOptions.sNodeIdAttributeName + '},\
    		        css:{ \'open\': (' + oOptions.sNodeIdAttributeName + '()== $root.openedLeaf) }">\
    			<a data-bind="text: ' + oOptions.sNodeDisplayName + ', \
    			    css:{ \'selected\': (' + oOptions.sNodeIdAttributeName + '()== $root.openedLeaf) }"></a>\
    			<!-- ko if: ' + oOptions.hasChildMethodName + ' -->\
    				<ul></ul>\
    			<!-- /ko -->\
    		</li>\
    	</ul>';

        // local reference
        var getChildsForNode = oOptions.fGetChilds;
        var $container = $('#' + oOptions.sContainerId);
        //GO.log( $container );
        var options = {
            collapsed: true,
            //unique: true,
            toggle: function () {
                //GO.log(this.getAttribute('data-'+oOptions.sNodeIdAttributeName));
                var id = this.getAttribute('data-id'),
    				$subTree = $(this).find('>ul');

                getChildsForNode(id, function (aTree) {
                    buildBranch($subTree, aTree);
                    //options.collapsed = false;
                    $subTree.treeview(options);
                });
            }
        };
        // private method used to generate the correct HTML for jQuery treeview to reparse it
        var buildBranch = function ($root, aTree, aSelectedBranch) {
            // build the first level and add the main ID
            // inject the DOM base template
            $root.html(sTplUl);
            var $subTree = $root.find('>ul');
            // if a path array was given, we shorten by one element and inject the first element to KO
            if (typeof (aSelectedBranch) != 'undefined'
                && aSelectedBranch !== null) {
                var openedLeaf = aSelectedBranch.shift();
                //GO.log(openedLeaf);
            }
            // let KO rebuild the DOM

            ko.applyBindings({ koObjectList: ko.observableArray(aTree), openedLeaf: openedLeaf }, $subTree.get(0));

            // get the info for the opened leaf and build a sub treeview
            if (typeof (openedLeaf) != 'undefined') {
                getChildsForNode(openedLeaf, function (aTree) {
                    var $leafSubTree = $subTree.find('[data-id=' + openedLeaf + ']>ul');
                    buildBranch($leafSubTree, aTree, aSelectedBranch);
                    //options.collapsed = false;
                    $leafSubTree.treeview(options);
                });
            }


        };

        var that = this;
        // track the clicks on the final nodes (A elements), compute the hierarchy chain
        $container.on('click', 'li>a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var oCurrentNode = this,
    	        sId;
            var aPath = [];
            // get up the hierarchy to have all of the path id
            while ((oCurrentNode = oCurrentNode.parentNode)
    	            && oCurrentNode.id != oOptions.sContainerId) {
                if ((sId = oCurrentNode.getAttribute('data-id')))
                    aPath.push(sId);
                //oCurrentNode = oCurrentNode.parentNode;
            }
            aPath.reverse();
            // should fire the event
            that.chosenPath(aPath);
        });


        // public interface
        this.close = function () {
            // TODO : check for memory leaks
            $container.empty('');
        };
        this.open = function (aSelectedBranch) {
            // use that to prevent click events to go outside of this container.
            // useful if someone outside has set up a global click on the body
            $container.on('click', function (e) {
                e.stopPropagation();
            });
            // start everything
            getChildsForNode(oOptions.sRootName, function (aTree) {
                buildBranch($container, aTree, aSelectedBranch);
                // have jQuery tree interpret the DOM
                $container.find('>ul').treeview(options);
            });
        };
        this.chosenPath = ko.observable([]);
    };
} (window));
