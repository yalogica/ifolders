!function(a) {
    "use strict";
    const i = function() {
        const s = new WeakMap();
        function i() {
            s.set(this, {
                $container: null,
                id: 0
            }), this._init();
        }
        return i.prototype = {
            _init: function() {
                this._buildDOM();
            },
            _buildDOM: function() {
                const i = s.get(this);
                i.$container = a("<div>").addClass("ifs-notify-container"), a("body").append(i.$container);
            },
            _animationEvent: function() {
                var i, n = document.createElement("fakeelement"), t = {
                    animation: "animationend",
                    MSAnimationEnd: "msAnimationEnd",
                    OAnimation: "oAnimationEnd",
                    MozAnimation: "mozAnimationEnd",
                    WebkitAnimation: "webkitAnimationEnd"
                };
                for (i in t) if (void 0 !== n.style[i]) return t[i];
                return null;
            },
            _getNotify: function(i) {
                const n = s.get(this);
                i = n.$container.find(`.ifs-notify[data-id='${i}']`);
                return i.length ? i : null;
            },
            _showNotify: function(i, n, t) {
                setTimeout(this.close.bind(this, n), t || 4e3);
            },
            _removeNotify: function(i) {
                i.remove();
            },
            show: function(i, n, t) {
                const o = s.get(this), e = a("<div>").addClass("ifs-notify").addClass(n).attr({
                    "data-id": ++o.id
                });
                n = a("<div>").addClass("ifs-title").html(i);
                return e.append(n), o.$container.append(e), e.removeClass("ifs-fx-show ifs-fx-hide"), 
                e.addClass("ifs-fx-show"), e.one(this._animationEvent(), this._showNotify.bind(this, e, o.id, t)), 
                o.id;
            },
            close: function(i) {
                const n = this._getNotify(i);
                n && (n.removeClass("ifs-fx-show ifs-fx-hide"), n.addClass("ifs-fx-hide"), 
                n.one(this._animationEvent(), this._removeNotify.bind(this, n)));
            }
        }, i;
    }();
    window.IFOLDERS = window.IFOLDERS || {}, window.IFOLDERS.PLUGINS = window.IFOLDERS.PLUGINS || {}, 
    window.IFOLDERS.PLUGINS.NOTIFY = function() {
        return new i();
    };
}(jQuery);