(function (B, A) {
    B.GenerativeObjects = B.GenerativeObjects || {};
    B.GenerativeObjects.Web = B.GenerativeObjects.Web || {};
    B.GenerativeObjects.Web.DOMHelper = B.GenerativeObjects.Web.DOMHelper || {};
    B.GenerativeObjects.Web.DOMHelper.onAreaVisible = function (J, I, D, bPersistent) {
        if (!B.$ || !B._) {
            throw new TypeError("global.GenerativeObjects.DOMHelper.onAreaVisible requires jQuery and underscore.js");
        }
        var H = $(window), G = $(A), E = [];
        var F = _.throttle(function () {
            var K = G.scrollTop() + H.height();
            //GO.log(K, E);
            E = _.reject(E, function (L) {
                //GO.log(L.$container.offset().top, L.iTopOffset);
                if (K > (L.$container.offset().top - L.iTopOffset)) {
                    setTimeout(L.fCallback, 0);
                    if (L.bPersistent === true)
                        return false; // if persistence is set to true, the item callback will be executed multiple times
                    else
                        return true; // with true, the callback disappears from the callback list
                }
                return false;
            });
        }, 100);
        H.on("scroll", F);
        B.GenerativeObjects.Web.DOMHelper.onAreaVisible = function onAreaVisible(M, L, K, bPersistent) {
            if (typeof K === "undefined") {
                K = 100;
            }
            if (!_.isFunction(L)) {
                throw new TypeError("Provide a callback function");
            }
            if (!_.isNumber(K)) {
                throw new TypeError("Provide a valid Number");
            }
            if (_.isElement(M)) {
                M = $(M);
            }
            if (!_.isElement(M.get()[0])) {
                throw new TypeError("Could not find $container in the DOM");
            }
            if (typeof bPersistent === "undefined") {
                bPersistent = false;
            }
            if (!_.isBoolean(bPersistent)) {
                throw new TypeError("bPersistent should be a boolean (false by default)");
            }

            E.push(
                { $container: M,
                    iTopOffset: K,
                    fCallback: L,
                    bPersistent: bPersistent
                });
            F();
        };
        B.GenerativeObjects.Web.DOMHelper.onAreaVisible(J, I, D);
    };
})(this, document);