/* @license
 Url.js v3.0.0
 https://github.com/jillix/url.js
 Released under the MIT license
*/
"use strict";

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Url = e();
}(function() {
    return function o(i, r, a) {
        function c(n, e) {
            if (!r[n]) {
                if (!i[n]) {
                    var t = "function" == typeof require && require;
                    if (!e && t) return t(n, !0);
                    if (u) return u(n, !0);
                    throw (t = new Error("Cannot find module '" + n + "'")).code = "MODULE_NOT_FOUND", 
                    t;
                }
                t = r[n] = {
                    exports: {}
                }, i[n][0].call(t.exports, function(e) {
                    return c(i[n][1][e] || e);
                }, t, t.exports, o, i, r, a);
            }
            return r[n].exports;
        }
        for (var u = "function" == typeof require && require, e = 0; e < a.length; e++) c(a[e]);
        return c;
    }({
        1: [ function(e, n, t) {
            window.addEventListener("hashchange", function(e) {
                a._isHash = !0;
            }), window.addEventListener("popstate", function(e) {
                setTimeout(function() {
                    return a._isHash ? (a.triggerHashchangeCb(), void (a._isHash = !1)) : void a.triggerPopStateCb(e);
                }, 0);
            });
            var a = n.exports = {
                _onPopStateCbs: [],
                _onHashchangeCbs: [],
                _onHash: [],
                _isHash: !1,
                queryString: function(e, n) {
                    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
                    return null !== t ? (t = t[1].replace(/\+/g, " "), n ? t : decodeURIComponent(t)) : !!new RegExp("[\\?&]" + e + "(\\&([^&#]*)|$)").test(location.search) || void 0;
                },
                parseQuery: function(e) {
                    var n = {};
                    if (!(e = (e = "string" != typeof e ? window.location.search : e).replace(/^\?/g, ""))) return {};
                    for (var t, o = e.split("&"), i = 0, r = void 0; i < o.length; ++i) t = (r = o[i].indexOf("=")) < 0 ? (r = o[i].length, 
                    !0) : decodeURIComponent(o[i].slice(r + 1)), n[decodeURIComponent(o[i].slice(0, r))] = t;
                    return n;
                },
                stringify: function(t) {
                    if (!t || t.constructor !== Object) throw new Error("Query object should be an object.");
                    var o = "";
                    return Object.keys(t).forEach(function(e) {
                        var n = t[e];
                        o += e, !0 !== n && (o += "=" + encodeURIComponent(t[e])), 
                        o += "&";
                    }), o = o.replace(/\&$/g, "");
                },
                updateSearchParam: function(e, n, t, o) {
                    if ("object" !== (void 0 === e ? "undefined" : _typeof(e))) {
                        var i = this.parseQuery();
                        if (void 0 === n) delete i[e]; else {
                            if (i[e] === n) return a;
                            i[e] = n;
                        }
                        return i = (i = this.stringify(i)) && "?" + i, this._updateAll(window.location.pathname + i + location.hash, t, o), 
                        a;
                    }
                    for (var r in e) e.hasOwnProperty(r) && this.updateSearchParam(r, e[r], t, o);
                },
                getLocation: function(e) {
                    return window.location.pathname + window.location.search + (e ? "" : window.location.hash);
                },
                hash: function(e, n) {
                    return void 0 === e ? location.hash.substring(1) : (n ? location.hash = e : a._updateAll(a.getLocation(!0) + (e ? "#" + e : "")), 
                    e);
                },
                _updateAll: function(e, n, t) {
                    return window.history[n ? "pushState" : "replaceState"](null, "", e), 
                    t && a.triggerPopStateCb({}), e;
                },
                pathname: function(e, n, t) {
                    return void 0 === e ? location.pathname : this._updateAll(e + window.location.search + window.location.hash, n, t);
                },
                triggerHashchangeCb: function(n) {
                    this._onHashchangeCbs.forEach(function(e) {
                        e(n);
                    });
                },
                triggerPopStateCb: function(n) {
                    this._onPopStateCbs.forEach(function(e) {
                        e(n);
                    });
                },
                onPopState: function(e) {
                    this._onPopStateCbs.push(e);
                },
                onHashchange: function(e) {
                    this._onHashchangeCbs.push(e);
                },
                removeHash: function(e, n) {
                    this._updateAll(window.location.pathname + window.location.search, e || !1, n || !1);
                },
                removeQuery: function(e, n) {
                    this._updateAll(window.location.pathname + window.location.hash, e || !1, n || !1);
                },
                version: "3.0.0"
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});