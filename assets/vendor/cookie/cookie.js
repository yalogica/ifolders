/* @license
 JavaScript Cookie v2.2.0
 https://github.com/js-cookie/js-cookie
 Released under the MIT license
*/
!function() {
    "use strict";
    var e, n, t, o;
    e = function() {
        function f() {
            for (var e = 0, n = {}; e < arguments.length; e++) {
                var t, o = arguments[e];
                for (t in o) n[t] = o[t];
            }
            return n;
        }
        function p(e) {
            return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return function e(u) {
            function c() {}
            function t(e, n, t) {
                if ("undefined" != typeof document) {
                    "number" == typeof (t = f({
                        path: "/"
                    }, c.defaults, t)).expires && (t.expires = new Date(+new Date() + 864e5 * t.expires)), 
                    t.expires = t.expires ? t.expires.toUTCString() : "";
                    try {
                        var o = JSON.stringify(n);
                        /^[\{\[]/.test(o) && (n = o);
                    } catch (e) {}
                    n = u.write ? u.write(n, e) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), 
                    e = encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                    var r, i = "";
                    for (r in t) t[r] && (i += "; " + r, !0 !== t[r] && (i += "=" + t[r].split(";")[0]));
                    return document.cookie = e + "=" + n + i;
                }
            }
            function n(e, n) {
                if ("undefined" != typeof document) {
                    for (var t = {}, o = document.cookie ? document.cookie.split("; ") : [], r = 0; r < o.length; r++) {
                        var i = o[r].split("="), c = i.slice(1).join("=");
                        n || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                        try {
                            var f = p(i[0]), c = (u.read || u)(c, f) || p(c);
                            if (n) try {
                                c = JSON.parse(c);
                            } catch (e) {}
                            if (t[f] = c, e === f) break;
                        } catch (e) {}
                    }
                    return e ? t[e] : t;
                }
            }
            return c.set = t, c.get = function(e) {
                return n(e, !1);
            }, c.getJSON = function(e) {
                return n(e, !0);
            }, c.remove = function(e, n) {
                t(e, "", f(n, {
                    expires: -1
                }));
            }, c.defaults = {}, c.withConverter = e, c;
        }(function() {});
    }, "function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), 
    n = !0), n || (t = window.Cookies, (o = window.Cookies = e()).noConflict = function() {
        return window.Cookies = t, o;
    });
}();