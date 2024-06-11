/* @license
 Angular Light 0.14.0
 https://github.com/lega911/angular-light
 Released under the MIT License
*/
!function() {
    "use strict";
    function e() {
        function D(e, t) {
            0 <= (t = e.indexOf(t)) ? e.splice(t, 1) : console.warn("trying to remove not exist item");
        }
        var n, r, u, b, M, j, w, T, c, F, I, V, i, x, H, _, K, R, z, N, W, U, S, e, t, a, o, l, P, s, f, p, G, Q, Z, $, C, A, J, X, y, E, h, Y, ee, d, m, te, k, ne, v, re, ie, oe, ae, le, g, B, ce, O, se, q = function(e, t) {
            return q.bootstrap(e, t);
        }, L = (q.version = "0.14.0", q.filters = {}, q.text = {}, q.core = {}, 
        q.utils = {}, q.option = {
            globalController: !1,
            removeAttribute: !0,
            domOptimization: !0,
            domOptimizationRemoveEmpty: !0,
            fastBinding: !0
        }, q.debug = {
            scan: 0,
            directive: !1,
            watch: !1,
            watchText: !1,
            parser: !1
        }, q.ctrl = q.controllers = {}, q.d = q.directives = {
            al: {},
            bo: {},
            $global: {}
        }, q.hooks = {
            directive: [],
            binding: []
        }, q.priority = {
            al: {
                app: 2e3,
                checked: 20,
                class: 30,
                css: 30,
                focused: 20,
                if: 700,
                ifnot: 700,
                model: 25,
                radio: 25,
                repeat: 1e3,
                select: 20,
                stop: -10,
                value: 20,
                on: 10
            },
            $component: 5,
            $attribute: -5
        }, q.f$ = {});
        function ue(t, e) {
            var n, r, i, o, a = [], l = !1, c = e.cd, s = e.callback;
            return e.filterConf.args.length ? (r = [], e.filterConf.args.forEach(function(e, t) {
                e = c.watch(e, function(e) {
                    a[t + 1] = e, o();
                });
                e.$.isStatic || r.push(e);
            }), i = !1, o = function() {
                i || (i = !0, c.watch("$onScanOnce", function() {
                    var e;
                    i = !1, l && (e = t.apply(null, a), L.isPromise(e) ? e.then(function(e) {
                        s(e), c.scan();
                    }) : s(e));
                }));
            }, r.length && (n = function() {
                r.forEach(function(e) {
                    return e.stop();
                });
            })) : o = function() {
                var e = t(a[0]);
                L.isPromise(e) ? e.then(function(e) {
                    s(e), c.scan();
                }) : s(e);
            }, {
                onChange: function(e) {
                    l = !0, a[0] = e, o();
                },
                onStop: n,
                watchMode: e.watchMode
            };
        }
        function fe(e, t, n, r, i, o) {
            r.callback.apply(null, o);
            r = t._properties.root;
            r && r.topCD && r.topCD.scan({
                zone: !0
            });
        }
        function pe(e, t, n, r) {
            r.setValue(r.attrArgument, t);
        }
        function he(e) {
            return e.replace(/(-\w)/g, function(e) {
                return e.substring(1).toUpperCase();
            });
        }
        function de(e) {
            var t, n = e.listener, r = e.childCD, i = e.name, o = e.parentName, e = e.parentCD, a = {}, i = he(i);
            if (n && !0 !== n) if (se.isFunction(n)) t = n; else {
                if (t = n.onChange, "copy" === n || "copy" === n.watchMode) return void (t ? t(o) : r.scope[i] = o);
                "array" !== n && "array" !== n.watchMode || (a.isArray = !0), "deep" !== n && "deep" !== n.watchMode || (a.deep = !0);
            }
            e.watch(o, t = t || function(e) {
                r.scope[i] = e, r.scan();
            }, a);
        }
        return L.before = function(e, t) {
            e.parentNode.insertBefore(t, e);
        }, L.after = function(e, t) {
            var n = e.parentNode, e = e.nextSibling;
            e ? n.insertBefore(t, e) : n.appendChild(t);
        }, L.remove = function(e) {
            var t = e.parentNode;
            t && t.removeChild(e);
        }, L.on = function(e, t, n) {
            e.addEventListener(t, n, !1);
        }, L.off = function(e, t, n) {
            e.removeEventListener(t, n, !1);
        }, L.isFunction = function(e) {
            return e && "[object Function]" === Object.prototype.toString.call(e);
        }, L.isObject = function(e) {
            return e && "[object Object]" === Object.prototype.toString.call(e);
        }, L.isPromise = function(e) {
            return e && window.Promise && e instanceof window.Promise;
        }, L.isElement = function(e) {
            return e instanceof HTMLElement;
        }, L.addClass = function(e, t) {
            e.classList ? e.classList.add(t) : e.className += " " + t;
        }, L.removeClass = function(e, t) {
            e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^| )" + t.split(" ").join("|") + "( |$)", "gi"), " ");
        }, L.rawAjax = function(e) {
            var t, n = new XMLHttpRequest();
            for (t in n.open(e.type || "GET", e.url, !0, e.username, e.password), 
            e.headers) n.setRequestHeader(t, e.headers[t]);
            e.success && (n.onload = function() {
                200 <= n.status && n.status < 400 ? e.success(n.responseText) : e.error && e.error();
            }), e.error && (n.onerror = e.error), n.send(e.data || null);
        }, L.ajaxCache = {}, L.ajax = function(e) {
            if (e.username || e.password || e.headers || e.data || !e.cache) return L.rawAjax(e);
            var t = e.type || "GET", n = t + ":" + e.url, r = L.ajaxCache[n];
            r || (L.ajaxCache[n] = r = {
                callback: []
            }), r.result ? e.success && e.success(r.result) : (r.callback.push(e), 
            r.loading || (r.loading = !0, L.rawAjax({
                type: t,
                url: e.url,
                success: function(e) {
                    r.loading = !1, r.result = e;
                    for (var t = 0; t < r.callback.length; t++) r.callback[t].success && r.callback[t].success(e);
                    r.callback.length = 0;
                },
                error: function() {
                    r.loading = !1;
                    for (var e = 0; e < r.callback.length; e++) r.callback[e].error && r.callback[e].error();
                    r.callback.length = 0;
                }
            })));
        }, e = '@charset "UTF-8";[al-cloak],[hidden],.al-hide{display:none !important;}', 
        t = document.querySelectorAll("head")[0], (g = document.createElement("style")).setAttribute("type", "text/css"), 
        g.styleSheet ? g.styleSheet.cssText = e : g.appendChild(document.createTextNode(e)), 
        t.appendChild(g), L.ready = (r = !(n = []), L.on(document, "DOMContentLoaded", function e() {
            r = !0, L.off(document, "DOMContentLoaded", e);
            for (var t = 0; t < n.length; t++) n[t]();
            n.length = 0;
        }), function(e) {
            r ? e() : n.push(e);
        }), window.jQuery && (window.jQuery.fn.alight = function(e) {
            var n = [];
            if (this.each(function(e, t) {
                return n.push(t);
            }), n.length) return q(n, e);
        }), q.core.getFilter = function(e, t) {
            t = t.locals[e];
            if (t && (L.isFunction(t) || t.init || t.fn)) return t;
            if (t = q.filters[e]) return t;
            throw "Filter not found: " + e;
        }, q.core.buildFilterNode = function(e, t, n, r) {
            if (L.isFunction(n)) return ue(n, {
                cd: e,
                filterConf: t,
                callback: r
            });
            if (n.init) return n.init.call(e, e.scope, t.raw, {
                setValue: r,
                conf: t,
                changeDetector: e
            });
            if (L.isFunction(n.fn)) return ue(n.fn, {
                cd: e,
                filterConf: t,
                callback: r,
                watchMode: n.watchMode
            });
            throw "Wrong filter: " + t.name;
        }, q.ChangeDetector = function(e) {
            var t = new M(), e = new u(t, e || {});
            return t.topCD = e;
        }, (M = function() {
            return this.watchers = {
                any: [],
                finishBinding: [],
                finishScan: [],
                finishScanOnce: [],
                onScanOnce: []
            }, this.status = null, this.extraLoop = !1, this.finishBinding_lock = !1, 
            this.lateScan = !1, this.topCD = null, this;
        }).prototype.destroy = function() {
            if (this.watchers.any.length = 0, this.watchers.finishBinding.length = 0, 
            this.watchers.finishScan.length = 0, this.watchers.finishScanOnce.length = 0, 
            this.watchers.onScanOnce.length = 0, this.topCD) return this.topCD.destroy();
        }, (u = function(e, t) {
            this.scope = t, this.locals = t, this.root = e, this.watchList = [], 
            this.destroy_callbacks = [], this.parent = null, this.children = [], 
            this.rwatchers = {
                any: [],
                finishScan: [],
                elEvents: []
            };
        }).prototype.new = function(e, t) {
            var n, r;
            return t = t || {}, r = this, null == e && (e = r.scope), (n = new u(r.root, e)).parent = r, 
            e === r.scope && (t.locals ? ((t = r._ChildLocals) || (r._ChildLocals = t = function() {
                return this.$$root = e, this;
            }, t.prototype = r.locals), n.locals = new t()) : n.locals = r.locals), 
            r.children.push(n), n;
        }, u.prototype.destroy = function() {
            var e, t, n, r, i, o, a, l, c, s, u, f, p, h, d, m, v, g, y, b, w, x = this, k = x.root;
            for (x.scope = null, x.parent && D(x.parent.children, x), n = 0, o = (d = x.destroy_callbacks).length; n < o; n++) (0, 
            d[n])();
            for (r = 0, a = (m = x.children.slice()).length; r < a; r++) m[r].destroy();
            for (i = x.destroy_callbacks.length = 0, l = (v = x.watchList).length; i < l; i++) (e = v[i]).onStop && e.onStop();
            for (f = x.watchList.length = 0, c = (g = x.rwatchers.any).length; f < c; f++) w = g[f], 
            D(k.watchers.any, w);
            for (p = x.rwatchers.any.length = 0, s = (y = x.rwatchers.finishScan).length; p < s; p++) w = y[p], 
            D(k.watchers.finishScan, w);
            for (h = x.rwatchers.finishScan.length = 0, u = (b = this.rwatchers.elEvents).length; h < u; h++) t = b[h], 
            L.off(t[0], t[1], t[2]);
            this.rwatchers.elEvents.length = 0, k.topCD === x && (k.topCD = null, 
            k.destroy());
        }, j = function(e) {
            return this.cb = e;
        }, i = function(e, t, n) {
            var r = e.root, i = new j(n);
            return e.rwatchers[t].push(i), r.watchers[t].push(i), {
                stop: function() {
                    return D(e.rwatchers[t], i), D(r.watchers[t], i);
                }
            };
        }, u.prototype.on = function(e, t, n) {
            return L.on(e, t, n), this.rwatchers.elEvents.push([ e, t, n ]);
        }, F = {
            $any: function(e, t) {
                return i(e, "any", t);
            },
            $finishScan: function(e, t) {
                return i(e, "finishScan", t);
            },
            $finishScanOnce: function(e, t) {
                e.root.watchers.finishScanOnce.push(t);
            },
            $onScanOnce: function(e, t) {
                e.root.watchers.onScanOnce.push(t);
            },
            $destroy: function(e, t) {
                e.destroy_callbacks.push(t);
            },
            $finishBinding: function(e, t) {
                e.root.watchers.finishBinding.push(t);
            }
        }, x = function() {}, u.prototype.watch = function(t, n, e) {
            var r, i, o, a, l, c, s = F[t];
            if (s) return s(this, n);
            if ((e = !0 === (e = e || {}) ? {
                isArray: !0
            } : e).init && console.warn("watch.init is depricated"), (r = this).root, 
            c = r.scope, L.isFunction(t) ? (o = t, a = q.utils.getId(), p = !0) : (p = !1, 
            o = null, "::" === (t = t.trim()).slice(0, 2) && (t = t.slice(2), e.oneTime = !0), 
            a = t, a = e.deep ? "d#" + a : e.isArray ? "a#" + a : "v#" + a), q.debug.watch && console.log("$watch", t), 
            s = !1, !p) if (e.watchText) o = e.watchText.fn; else {
                if ((a = q.utils.compile.expression(t)).filter) {
                    for (var u, f = r, p = a, h = n, d = e, m = null, v = d.oneTime, g = (d.isArray ? m = "array" : d.deep && (m = "deep"), 
                    h || (u = {
                        el: d.element,
                        ea: d.elementAttr
                    }, h = function(e) {
                        T(f.scope, u, e);
                    }), q.utils.parsFilter(p.filter)), y = [], b = g.result.length - 1; 0 <= b; b--) {
                        var w = q.core.getFilter(g.result[b].name, f), w = q.core.buildFilterNode(f, g.result[b], w, h);
                        w.watchMode && (m = w.watchMode), w.onStop && y.push(w.onStop), 
                        h = w.onChange;
                    }
                    return d = {
                        oneTime: v
                    }, "array" === m ? d.isArray = !0 : "deep" === m && (d.deep = !0), 
                    y.length && (d.onStop = function() {
                        y.forEach(function(e) {
                            return e();
                        }), y.length = 0;
                    }), f.watch(p.expression, h, d);
                }
                s = a.isSimple && 0 === a.simpleVariables.length, o = a.fn;
            }
            return e.deep && (e.isArray = !1), i = {
                isStatic: s,
                isArray: Boolean(e.isArray),
                extraLoop: !e.readOnly,
                deep: !0 === e.deep ? 10 : e.deep,
                value: x,
                callback: n,
                exp: o,
                src: "" + t,
                onStop: e.onStop || null,
                el: e.element || null,
                ea: e.elementAttr || null
            }, s ? r.watch("$onScanOnce", function() {
                return T(c, i, i.exp(c));
            }) : r.watchList.push(i), l = {
                $: i,
                stop: function() {
                    if (e.onStop) try {
                        e.onStop();
                    } catch (e) {
                        q.exceptionHandler(e, "Error in onStop of watcher: " + t, t);
                    }
                    if (!i.isStatic) return D(r.watchList, i);
                },
                refresh: function() {
                    var e = i.exp(r.locals);
                    return e && i.deep ? i.value = q.utils.clone(e, i.deep) : e && i.isArray ? i.value = e.slice() : i.value = e;
                }
            }, e.oneTime && (i.callback = function(e) {
                if (void 0 !== e) return l.stop(), n(e);
            }), l;
        }, u.prototype.watchGroup = function(e, t) {
            var n, r, i, o, a, l = this;
            if (!t && L.isFunction(e) && (t = e, e = null), a = !1, n = function() {
                if (!a) return a = !0, l.watch("$onScanOnce", function() {
                    return a = !1, t();
                });
            }, e) for (r = 0, o = e.length; r < o; r++) i = e[r], l.watch(i, n);
            return n;
        }, c = window.performance ? function() {
            return Math.floor(performance.now());
        } : function() {
            return new Date().getTime();
        }, I = function(e, t) {
            var n, r, i, o;
            if (null === e || null === t) return !0;
            if ((o = typeof e) != typeof t) return !0;
            if ("object" == o) {
                if (e.length !== t.length) return !0;
                for (n = r = 0, i = e.length; r < i; n = ++r) if (e[n] !== t[n]) return !0;
            }
            return !1;
        }, T = function(e, t, n) {
            t.el ? t.ea ? t.el.setAttribute(t.ea, n) : t.el.nodeValue = n : t.callback.call(e, n);
        }, w = function(e, t, n, r) {
            t = {
                src: n.src,
                scope: t.scope,
                locals: t.locals
            };
            return n.el && (t.element = n.el), q.exceptionHandler(e, (1 === r ? "$scan, error in callback: " : "$scan, error in expression: ") + n.src, t);
        }, b = function() {}, V = function(e, t) {
            e.root;
            var n, r, i, o, a, l, c, s, u, f, p, h, d, m, v = !1, g = 0, y = 0;
            if (e) {
                for (p = [], a = 0, i = e; i; ) {
                    for (u = i.locals, y += i.watchList.length, l = 0, s = (h = i.watchList.slice()).length; l < s; l++) {
                        c = (m = h[l]).value;
                        try {
                            d = m.exp(u);
                        } catch (e) {
                            o = e, d = b;
                        }
                        if (c !== d) {
                            if (f = !1, m.isArray ? (n = Array.isArray(c)) === (r = Array.isArray(d)) ? n ? I(c, d) && (f = !0, 
                            m.value = d.slice()) : (f = !0, m.value = d) : (f = !0, 
                            m.value = r ? d.slice() : d) : m.deep ? q.utils.equal(c, d, m.deep) || (f = !0, 
                            m.value = q.utils.clone(d, m.deep)) : (f = !0, m.value = d), 
                            f) if (f = !1, d === b) w(o, i, m); else {
                                g++;
                                try {
                                    m.el ? m.ea ? null != d ? m.el.setAttribute(m.ea, d) : m.el.removeAttribute(m.ea) : m.el.nodeValue = d : (c === x && (c = void 0), 
                                    "$scanNoChanges" !== m.callback.call(i.scope, d, c) && m.extraLoop && (v = !0));
                                } catch (e) {
                                    w(o = e, i, m, 1);
                                }
                            }
                            1 < q.debug.scan && console.log("changed:", m.src);
                        }
                    }
                    p.push.apply(p, i.children), i = p[a++];
                }
                t.total = y, t.changes = g, t.extraLoop = v;
            }
        }, u.prototype.digest = function() {
            var e, t, n, r, i, o = this.root, a = 10, l = 0;
            for (q.debug.scan && (i = c()), r = {
                total: 0,
                changes: 0,
                extraLoop: !1,
                src: "",
                scope: null,
                element: null
            }; a; ) {
                if (a--, o.extraLoop = !1, o.watchers.onScanOnce.length) for (n = o.watchers.onScanOnce.slice(), 
                e = o.watchers.onScanOnce.length = 0, t = n.length; e < t; e++) n[e].call(o);
                if (V(this, r), l += r.changes, !r.extraLoop && !o.extraLoop && !o.watchers.onScanOnce.length) break;
            }
            return q.debug.scan && (i = c() - i, console.log("$scan: loops: (" + (10 - a) + "), last-loop changes: " + r.changes + ", watches: " + r.total + " / " + i + "ms")), 
            r.mainLoop = a, r.totalChanges = l, r;
        }, u.prototype.scan = function(e) {
            var t, n, r, i, o, a, l, c, s, u = this.root;
            if (e = e || {}, !q.option.zone || e.zone) {
                if ((e = L.isFunction(e) ? {
                    callback: e
                } : e).callback && u.watchers.finishScanOnce.push(e.callback), e.late) return u.lateScan ? void 0 : (u.lateScan = !0, 
                void q.nextTick(function() {
                    if (u.lateScan) return u.topCD.scan();
                }));
                if ("scaning" !== u.status) {
                    if (u.lateScan = !1, u.status = "scaning", (e = u.topCD ? u.topCD.digest() : {}).totalChanges) for (n = 0, 
                    o = (c = u.watchers.any).length; n < o; n++) (0, c[n])();
                    for (u.status = null, r = 0, a = (s = u.watchers.finishScan).length; r < a; r++) (0, 
                    s[r])();
                    for (t = u.watchers.finishScanOnce.slice(), i = u.watchers.finishScanOnce.length = 0, 
                    l = t.length; i < l; i++) t[i].call(u);
                    if (0 === e.mainLoop) throw "Infinity loop detected";
                    return e;
                }
                u.extraLoop = !0;
            }
        }, (q.core.ChangeDetector = u).prototype.compile = function(e, t) {
            return q.utils.compile.expression(e, t).fn;
        }, u.prototype.setValue = function(t, n) {
            var r, i, o, a, l, c, s, u, f = this.compile(t + " = $value", {
                input: [ "$value" ],
                no_return: !0
            });
            try {
                return f(this.locals, n);
            } catch (e) {
                if (r = e, c = "can't set variable: " + t, q.debug.parser && console.warn(c), 
                0 <= ("" + r).indexOf("TypeError") && (u = t.match(/^([\w\d\.]+)\.[\w\d]+$/)) && u[1]) {
                    for (l = this.locals, i = 0, a = (s = u[1].split(".")).length; i < a; i++) void 0 === l[o = s[i]] && (l[o] = {}), 
                    l = l[o];
                    try {
                        return void f(this.locals, n);
                    } catch (e) {}
                }
                return q.exceptionHandler(r, c, {
                    name: t,
                    value: n
                });
            }
        }, u.prototype.eval = function(e) {
            return this.compile(e)(this.locals);
        }, u.prototype.getValue = function(e) {
            return this.eval(e);
        }, q.text.$base = function(t) {
            var n = t.point, e = t.cd, r = e.scope, i = (r.$ns && r.$ns.text ? r.$ns : q).text[t.name];
            if (i) return i.call(e, (i = {
                changeDetector: e,
                setter: function(e) {
                    if (t.update) return n.value = null === e ? "" : "" + e, t.update();
                },
                setterRaw: function(e) {
                    if (t.updateRaw) return n.value = null === e ? "" : "" + e, 
                    t.updateRaw();
                },
                finally: function(e) {
                    if (t.finally) return n.value = null === e ? "" : "" + e, n.type = "text", 
                    t.finally(), t.update = null, t.finally = null;
                }
            }).setter, t.exp, r, i);
            throw "No directive alight.text." + t.name;
        }, u.prototype.watchText = function(e, t, n) {
            var r, i, o, a, l, c, s, u, f, p, h, d, m, v, g, y, b, w, x, k, D, $, C, A, E, B;
            if (n = n || {}, i = this, q.debug.watchText && console.log("$watchText", e), 
            D = q.utils.compile.buildSimpleText(e, null)) i.watch(e, t, {
                watchText: D,
                element: n.element,
                elementAttr: n.elementAttr
            }); else {
                for (a = q.utils.parsText(e), x = !(r = !(E = 0)), c = s = l = function() {}, 
                d = 0, g = a.length; d < g; d++) if ("expression" === (o = a[d]).type) if (w = (u = o.list.join("|")).match(/^([^\w\d\s\$"'\(\u0410-\u044F\u0401\u0451]+)/)) o.isDir = !0, 
                w = w[1], u = "#" === w ? (h = u.indexOf(" ")) < 0 ? (w = u.substring(1), 
                "") : (w = u.slice(1, h), u.slice(h)) : u.substring(w.length), q.text.$base({
                    name: w,
                    exp: u,
                    cd: i,
                    point: o,
                    update: function() {
                        return c();
                    },
                    updateRaw: function() {
                        return s();
                    },
                    finally: function() {
                        return c(), l();
                    }
                }), x = !0, "text" !== o.type && (r = !1); else if ((w = q.utils.compile.expression(u, {
                    string: !0
                })).filter) E++, o.watched = !(r = !1), !function(t) {
                    i.watch(u, function(e) {
                        return t.value = e = null == e ? "" : e, c();
                    });
                }(o); else {
                    if (o.fn = w.fn, !w.rawExpression) throw "Error";
                    w.isSimple && 0 === w.simpleVariables.length ? (o.type = "text", 
                    o.value = o.fn()) : (o.re = w.rawExpression, E++);
                }
                if (r) if (E) D = x ? q.utils.compile.buildSimpleText(null, a) : q.utils.compile.buildSimpleText(e, a), 
                i.watch(e, t, {
                    watchText: {
                        fn: D.fn
                    },
                    element: n.element,
                    elementAttr: n.elementAttr
                }); else {
                    for (C = "", m = 0, y = a.length; m < y; m++) o = a[m], C += o.value;
                    i.watch("$onScanOnce", function() {
                        return T(i.scope, {
                            callback: t,
                            el: n.element,
                            ea: n.elementAttr
                        }, C);
                    });
                } else if (B = {
                    callback: t,
                    el: n.element,
                    ea: n.elementAttr
                }, a.scope = i.scope, p = q.utils.compile.buildText(e, a), s = function() {
                    return T(i.scope, B, p());
                }, E) {
                    for (A = null, k = "", c = function() {
                        k = p();
                    }, l = function() {
                        var e, t;
                        for (h = !0, e = 0, t = a.length; e < t; e++) if ("expression" === (o = a[e]).type) {
                            h = !1;
                            break;
                        }
                        h && (i.watch("$finishScanOnce", function() {
                            return A.stop();
                        }), n.onStatic && n.onStatic());
                    }, D = function() {
                        return k;
                    }, v = 0, b = a.length; v < b; v++) "expression" !== (o = a[v]).type || o.isDir || o.watched || (o.watched = !0, 
                    function(t, e) {
                        i.watch(e, function(e) {
                            return t.value = e = null == e ? "" : e, c();
                        });
                    }(o, o.list.join(" | ")));
                    c(), A = i.watch(D, t, {
                        element: n.element,
                        elementAttr: n.elementAttr
                    });
                } else $ = !1, f = function() {
                    return $ = !1, s();
                }, (c = function() {
                    if (!$) return $ = !0, i.watch("$onScanOnce", f);
                })();
            }
        }, H = {
            TR: 1,
            TD: 1,
            LI: 1
        }, q.utils.optmizeElement = function(e, t) {
            var n, r, i, o, a, l, c, s, u, f, p, h, d, m, v, g, y, b, w;
            if (1 === e.nodeType) {
                for (t = t || !q.option.domOptimizationRemoveEmpty, "PRE" === e.nodeName && (t = !0), 
                !(o = e.firstChild) || 3 !== o.nodeType || o.nodeValue.trim() || t || (L.remove(o), 
                o = e.firstChild), v = !1; o; ) d = o.nextSibling, !v || 3 !== o.nodeType || o.nodeValue.trim() || t ? (v = 1 === o.nodeType && H[o.nodeName], 
                q.utils.optmizeElement(o, t)) : L.remove(o), o = d;
                !(o = e.lastChild) || 3 !== o.nodeType || o.nodeValue.trim() || t || L.remove(o);
            } else if (3 === e.nodeType && (b = e.data, p = q.utils.pars_start_tag, 
            !((l = b.indexOf(p)) < 0 || b.slice(l + p.length).indexOf(p) < 0))) {
                for (m = "t", y = [ n = {
                    value: ""
                } ], c = 0, u = (i = q.utils.parsText(b)).length; c < u; c++) "text" === (r = i[c]).type ? n.value += r.value : (a = r.list.join("|"), 
                w = q.utils.pars_start_tag + a + q.utils.pars_finish_tag, a.match(/^([^\w\d\s\$"'\(\u0410-\u044F\u0401\u0451]+)/) ? ("t" === m || "d" === m ? n.value += w : y.push(n = {
                    value: w
                }), m = "d") : 1 === r.list.length ? ("t" === m || "v" === m ? n.value += w : y.push(n = {
                    value: w
                }), m = "v") : "t" === m ? n.value += w : y.push(n = {
                    value: w
                }));
                if (!(y.length < 2)) for ((o = e).data = y[0].value, s = 0, f = (g = y.slice(1)).length; s < f; s++) r = g[s], 
                h = document.createTextNode(r.value), L.after(o, h), o = h;
            }
        }, q.hooks.attribute = e = [], e.push({
            code: "dataPrefix",
            fn: function() {
                "data-" === this.attrName.slice(0, 5) && (this.attrName = this.attrName.slice(5));
            }
        }), e.push({
            code: "colonNameSpace",
            fn: function() {
                var e, t;
                this.directive || this.name || ((t = (e = (t = this.attrName.match(/^(\w+)[\-\:](.+)$/)) ? (this.ns = t[1], 
                t[2]) : (this.ns = "$global", this.attrName)).match(/^([^\.]+)\.(.*)$/)) && (e = t[1], 
                this.attrArgument = t[2]), this.name = e.replace(/(-\w)/g, function(e) {
                    return e.substring(1).toUpperCase();
                }));
            }
        }), e.push({
            code: "getGlobalDirective",
            fn: function() {
                var e;
                this.directive || ((e = q.d[this.ns]) ? (this.directive = e[this.name], 
                this.directive || ("$global" === this.ns ? this.result = "noNS" : this.result = "noDirective", 
                this.stop = !0)) : (this.result = "noNS", this.stop = !0));
            }
        }), e.push({
            code: "cloneDirective",
            fn: function() {
                var e, t, n = this.directive, r = this.ns, i = this.name, o = {};
                if (L.isFunction(n)) o.init = n; else {
                    if (!L.isObject(n)) throw "Wrong directive: " + r + "." + i;
                    for (e in n) t = n[e], o[e] = t;
                }
                if (o.priority = n.priority || q.priority[r] && q.priority[r][i] || 0, 
                o.restrict = n.restrict || "A", o.restrict.indexOf(this.attrType) < 0) throw "Directive has wrong binding (attribute/element): " + i;
                this.directive = o;
            }
        }), e.push({
            code: "preprocessor",
            fn: function() {
                var a = this.ns, l = this.name, c = this.directive;
                c.$init = function(e, t, n, r) {
                    var i = function() {
                        for (var e, t = o.procLine, n = e = 0, r = t.length; e < r; n = ++e) if (t[n].fn.call(o), 
                        o.isDeferred) {
                            o.procLine = t.slice(n + 1);
                            break;
                        }
                        return o.async = !0, null;
                    }, o = {
                        element: t,
                        value: n,
                        cd: e,
                        env: r,
                        ns: a,
                        name: l,
                        doBinding: !1,
                        directive: c,
                        isDeferred: !1,
                        procLine: q.hooks.directive,
                        makeDeferred: function() {
                            return o.isDeferred = !0, o.doBinding = !0, o.retStopBinding = !0, 
                            o.async = !1, function() {
                                if (o.isDeferred = !1, o.async) return i();
                            };
                        }
                    };
                    if (c.stopBinding && (r.stopBinding = !0), i(), o.retStopBinding) return "stopBinding";
                };
            }
        }), (t = q.hooks.directive).push({
            code: "init",
            fn: function() {
                var e;
                this.directive.init && (q.debug.directive && this.directive.scope && console.warn(this.ns + "-" + this.name + " uses scope and init together, probably you need use link instead of init"), 
                this.env.changeDetector = this.cd, (e = this.directive.init.call(this.env, this.cd.scope, this.element, this.value, this.env)) && e.start && e.start());
            }
        }), t.push({
            code: "templateUrl",
            fn: function() {
                var t, n = this;
                this.directive.templateUrl && (t = this.makeDeferred(), L.ajax({
                    cache: !0,
                    url: this.directive.templateUrl,
                    success: function(e) {
                        return n.directive.template = e, t();
                    },
                    error: t
                }));
            }
        }), t.push({
            code: "template",
            fn: function() {
                var e;
                this.directive.template && (1 === this.element.nodeType ? this.element.innerHTML = this.directive.template : 8 === this.element.nodeType && ((e = document.createElement("p")).innerHTML = this.directive.template.trim(), 
                e = e.firstChild, L.after(this.element, e), this.element = e, this.doBinding = !0));
            }
        }), t.push({
            code: "scope",
            fn: function() {
                var e, t;
                if (this.directive.scope) {
                    switch (t = this.cd, this.directive.scope) {
                      case !0:
                        e = t.new({
                            $parent: t.scope
                        });
                        break;

                      case "root":
                        e = q.ChangeDetector({
                            $parent: t.scope
                        }), t.watch("$destroy", function() {
                            return e.destroy();
                        });
                        break;

                      default:
                        throw "Wrong scope value: " + this.directive.scope;
                    }
                    this.env.parentChangeDetector = t, this.cd = e, this.doBinding = !0, 
                    this.retStopBinding = !0;
                }
            }
        }), t.push({
            code: "link",
            fn: function() {
                var e;
                this.directive.link && (this.env.changeDetector = this.cd, (e = this.directive.link.call(this.env, this.cd.scope, this.element, this.value, this.env)) && e.start && e.start());
            }
        }), t.push({
            code: "scopeBinding",
            fn: function() {
                this.doBinding && !this.env.stopBinding && q.bind(this.cd, this.element, {
                    skip_attr: this.env.skippedAttr()
                });
            }
        }), a = function(e, t, n) {
            var r;
            "A" === t.attr_type ? ((r = n || {}).priority = q.priority.$attribute, 
            r.is_attr = !0, r.name = e, r.attrName = e, r.element = t.element, t.list.push(r)) : "M" === t.attr_type && t.list.push(n);
        }, S = function(e, t) {
            var n, r, i, o;
            if (0 <= t.skip_attr.indexOf(e)) return a(e, t, {
                skip: !0
            });
            for (n = {
                attrName: e,
                attrType: t.attr_type,
                element: t.element,
                cd: t.cd,
                result: null
            }, r = 0, i = (o = q.hooks.attribute).length; r < i && (o[r].fn.call(n), 
            !n.stop); r++);
            if ("noNS" !== n.result) return "noDirective" === n.result ? "E" === t.attr_type ? void t.list.push({
                name: e,
                priority: -10,
                attrName: e,
                noDirective: !0
            }) : void a(e, t, {
                noDirective: !0
            }) : void t.list.push({
                name: e,
                directive: n.directive,
                priority: n.directive.priority,
                attrName: e,
                attrArgument: n.attrArgument
            });
            a(e, t);
        }, U = function(e, t) {
            return e.priority === t.priority ? 0 : e.priority > t.priority ? -1 : 1;
        }, K = function(e, t, n, r) {
            if (!(n.indexOf(q.utils.pars_start_tag) < 0)) return e.watchText(n, null, {
                element: t,
                elementAttr: r
            }), !0;
        }, W = function(e, t, n) {
            var r = t.data;
            if (!(r.indexOf(q.utils.pars_start_tag) < 0)) return e.watchText(r, null, {
                element: t
            }), r;
        }, R = function(t, n, e) {
            var r, i, o, a = n.nodeValue.trim();
            if ("directive:" === a.slice(0, 10)) {
                if (o = 0 <= (o = (a = a.slice(10).trim()).indexOf(" ")) ? (i = a.slice(0, o - 1 + 1 || 9e9), 
                a.slice(o + 1)) : (i = a, ""), r = {
                    list: a = [],
                    element: n,
                    attr_type: "M",
                    cd: t,
                    skip_attr: []
                }, S(i, r), (r = a[0]).noDirective) throw "Comment directive not found: " + i;
                i = r.directive, a = new _({
                    element: n,
                    attrName: r.attrName,
                    attributes: a
                }), q.debug.directive && console.log("bind", r.attrName, o, r);
                try {
                    i.$init(t, n, o, a);
                } catch (e) {
                    q.exceptionHandler(e, "Error in directive: " + r.name, {
                        value: o,
                        env: a,
                        cd: t,
                        scope: t.scope,
                        element: n
                    });
                }
                return a.skipToElement ? {
                    directive: 1,
                    skipToElement: a.skipToElement
                } : {
                    directive: 1,
                    skipToElement: null
                };
            }
        }, (_ = function(e) {
            var t, n;
            for (t in e) n = e[t], this[t] = n;
            return this;
        }).prototype.takeAttr = function(e, t) {
            var n, r, i, o;
            for (1 === arguments.length && (t = !0), r = 0, i = (o = this.attributes).length; r < i; r++) if ((n = o[r]).attrName === e) return t && (n.skip = !0), 
            this.element.getAttribute(e) || !0;
        }, _.prototype.skippedAttr = function() {
            for (var e, t = this.attributes, n = [], r = 0, i = t.length; r < i; r++) (e = t[r]).skip && n.push(e.attrName);
            return n;
        }, _.prototype.scan = function(e) {
            return this.changeDetector.scan(e);
        }, _.prototype.on = function(e, t, n) {
            return this.changeDetector.on(e, t, n);
        }, _.prototype.watch = function(e, t, n) {
            return this.changeDetector.watch(e, t, n);
        }, _.prototype.watchGroup = function(e, t) {
            return this.changeDetector.watchGroup(e, t);
        }, _.prototype.watchText = function(e, t, n) {
            return this.changeDetector.watchText(e, t, n);
        }, _.prototype.getValue = function(e) {
            return this.changeDetector.getValue(e);
        }, _.prototype.setValue = function(e, t) {
            return this.changeDetector.setValue(e, t);
        }, _.prototype.eval = function(e) {
            return this.changeDetector.eval(e);
        }, _.prototype.new = function(e, t) {
            return !0 === t ? t = {
                locals: !0
            } : !0 === e && null == t && (t = {
                locals: !(e = null)
            }), this.changeDetector.new(e, t);
        }, _.prototype.bind = function(e, t, n) {
            var r, i, o, a, l, c, s;
            for (this.stopBinding = !0, l = o = 0, c = arguments.length; l < c; l++) (r = arguments[l]) instanceof u && (i = r, 
            o += 1), L.isElement(r) && (a = r, o += 1);
            return s = (s = arguments[o]) || {
                skip: this.skippedAttr()
            }, a = a || this.element, i = i || this.changeDetector, q.bind(i, a, s);
        }, z = function(t, i, e) {
            var n, r, o, a, l, c, s, u, f, p, h, d, m, v, g, y, b, w, x, k, D, $, C, A = {
                attr: [],
                dir: [],
                children: []
            }, E = {
                directive: 0,
                hook: 0,
                skipToElement: null,
                fb: A
            }, B = (e = e || {}).skip_attr;
            if (!(D = !1) === e.skip ? e.skip_top = !0 : B = B || e.skip || [], 
            B instanceof Array || (B = [ B ]), !e.skip_top) {
                for (n = {
                    list: g = [],
                    element: i,
                    skip_attr: B,
                    attr_type: "E",
                    cd: t
                }, o = i.nodeName.toLowerCase(), S(o, n), "script" !== o && "style" !== o || (D = !0), 
                n.attr_type = "A", h = 0, d = (x = i.attributes).length; h < d; h++) r = x[h], 
                S(r.name, n);
                if (e.attachDirective) for (o in k = e.attachDirective) k[o], S(o, n);
                for (y = 0, m = (g = g.sort(U)).length; y < m; y++) if (!(s = g[y]).skip) {
                    if (s.noDirective) throw "Directive not found: " + s.name;
                    if (s.skip = !0, C = e.attachDirective && e.attachDirective[s.attrName] ? e.attachDirective[s.attrName] : i.getAttribute(s.attrName), 
                    s.is_attr) K(t, i, C, s.attrName) && A.attr.push({
                        attrName: s.attrName,
                        value: C
                    }); else {
                        f = s.directive, u = new _({
                            element: i,
                            attrName: s.attrName,
                            attrArgument: s.attrArgument || null,
                            attributes: g,
                            stopBinding: !1,
                            elementCanBeRemoved: e.elementCanBeRemoved,
                            fbElement: e.fbElement
                        }), q.debug.directive && console.log("bind", s.attrName, C, s);
                        try {
                            "stopBinding" === f.$init(t, i, C, u) && (D = !0);
                        } catch (e) {
                            q.exceptionHandler(e, "Error in directive: " + s.attrName, {
                                value: C,
                                env: u,
                                cd: t,
                                scope: t.scope,
                                element: i
                            });
                        }
                        if (u.fastBinding ? (f = L.isFunction(u.fastBinding) ? u.fastBinding : f.init, 
                        A.dir.push({
                            fb: f,
                            attrName: s.attrName,
                            value: C,
                            attrArgument: u.attrArgument,
                            fbData: u.fbData
                        })) : E.directive++, u.stopBinding) {
                            D = !0;
                            break;
                        }
                        u.skipToElement && (E.skipToElement = u.skipToElement);
                    }
                }
            }
            if (!D) for ($ = null, p = b = 0, v = (l = function() {
                for (var e = i.childNodes, t = [], n = 0, r = e.length; n < r; n++) a = e[n], 
                t.push(a);
                return t;
            }()).length; b < v; p = ++b) (a = l[p]) && ($ ? $ === a && ($ = null) : (e.fbElement && (c = {
                fbElement: e.fbElement.childNodes[p]
            }), w = N(t, a, c), E.directive += w.directive, E.hook += w.hook, $ = w.skipToElement, 
            w.fb && (w.fb.text || w.fb.attr && w.fb.attr.length || w.fb.dir && w.fb.dir.length || w.fb.children && w.fb.children.length) && A.children.push({
                index: p,
                fb: w.fb
            })));
            return E;
        }, N = function(e, t, n) {
            var r, i, o, a, l, c, s = {
                directive: 0,
                hook: 0,
                skipToElement: null,
                fb: null
            };
            if (q.hooks.binding.length) for (i = 0, o = (l = q.hooks.binding).length; i < o; i++) if (r = l[i], 
            s.hook += 1, (a = r.fn(e, t, n)) && a.owner) return s;
            return 1 === t.nodeType ? (a = z(e, t, n), s.directive += a.directive, 
            s.hook += a.hook, s.skipToElement = a.skipToElement, s.fb = a.fb) : 3 === t.nodeType ? (c = W(e, t)) && (s.fb = {
                text: c
            }) : 8 === t.nodeType && (a = R(e, t)) && (s.directive += a.directive, 
            s.skipToElement = a.skipToElement), s;
        }, q.nextTick = (o = null, l = [], P = function() {
            var t, e, n, r, i;
            for (o = null, e = l.slice(), n = l.length = 0, r = e.length; n < r; n++) {
                t = (i = e[n])[0], i = i[1];
                try {
                    t.call(i);
                } catch (e) {
                    q.exceptionHandler(e, "$nextTick, error in function", {
                        fn: t,
                        self: i
                    });
                }
            }
            return null;
        }, function(e) {
            if (l.push([ e, this ]), !o) return o = setTimeout(P, 0);
        }), q.bind = function(e, t, n) {
            var r, i, o, a, l;
            if (!e) throw "No changeDetector";
            if (!t) throw "No element";
            if (n = n || {}, q.option.domOptimization && !n.noDomOptimization && q.utils.optmizeElement(t), 
            (r = !(l = e.root).finishBinding_lock) && (l.finishBinding_lock = !0, 
            l.bindingResult = {
                directive: 0,
                hook: 0
            }), t = N(e, t, n), l.bindingResult.directive += t.directive, l.bindingResult.hook += t.hook, 
            e.digest(), r) {
                for (l.finishBinding_lock = !1, a = l.watchers.finishBinding.slice(), 
                i = l.watchers.finishBinding.length = 0, o = a.length; i < o; i++) (0, 
                a[i])();
                t.total = l.bindingResult;
            }
            return t;
        }, s = q.bind, q.bind = function(e, t, n) {
            var r = e.root, i = q.option.zone;
            if (i) {
                var i = !0 === i ? Zone : i, o = r.zone;
                if (o || (r.zone = o = i.current.fork({
                    name: i.current.name + ".x",
                    properties: {
                        root: r
                    },
                    onInvokeTask: fe
                })), i.current !== o) return r.zone.run(s, null, [ e, t, n ]);
            }
            return s(e, t, n);
        }, q.bootstrap = function(e, t) {
            if (e) {
                var n, r;
                if (e instanceof q.core.ChangeDetector ? (r = e, e = t) : t instanceof q.core.ChangeDetector ? r = t : L.isFunction(t) ? (r = q.ChangeDetector(n = {}), 
                t.call(r, n)) : t && (r = q.ChangeDetector(t)), Array.isArray(e)) {
                    for (var i = void 0, o = 0, a = e; o < a.length; o++) {
                        var l = a[o];
                        i = q.bootstrap(l, r);
                    }
                    return i;
                }
                if ("string" == typeof e) {
                    for (var i = void 0, c = 0, s = document.querySelectorAll(e); c < s.length; c++) {
                        var u = s[c];
                        i = q.bootstrap(u, r);
                    }
                    return i;
                }
                if (r = r || q.ChangeDetector(), L.isElement(e)) {
                    for (var f, p, h, d = 0, m = [ "al-app", "al:app", "data-al-app" ]; d < m.length && (p = e.getAttribute(f = m[d]), 
                    e.removeAttribute(f), !p); d++);
                    return p && (h = {
                        skip_attr: [ f ],
                        attachDirective: {}
                    }, q.d.al.ctrl ? h.attachDirective["al-ctrl"] = p : h.attachDirective[p + "!"] = ""), 
                    q.bind(r, e, h), r;
                }
                q.exceptionHandler("Error in bootstrap", "Error input arguments", {
                    input: e
                });
            } else q.bootstrap("[al-app]"), q.bootstrap("[al\\:app]"), q.bootstrap("[data-al-app]");
        }, q.utils.getId = (G = function() {
            for (var e, t, n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), r = Math.floor(new Date().valueOf() / 1e3) - 1388512800, i = ""; 0 < r; ) t = r - 62 * (e = Math.floor(r / 62)), 
            r = e, i = n[t] + i;
            return i;
        }(), Q = 1, function() {
            return G + "#" + Q++;
        }), q.utils.clone = f = function(r, i) {
            var o, e, t, n;
            if ((i = null == i ? 128 : i) < 1) return null;
            if (!r) return r;
            if ("object" != typeof r) return r;
            if (r instanceof Array) return t = function() {
                for (var e = [], t = 0, n = r.length; t < n; t++) o = r[t], e.push(f(o, i - 1));
                return e;
            }();
            if (r instanceof Date) return new Date(r.valueOf());
            if (r.nodeType && "function" == typeof r.cloneNode) return r;
            for (e in t = {}, r) n = r[e], "$" !== e[0] && (t[e] = f(n, i - 1));
            return t;
        }, q.utils.equal = p = function(e, t, n) {
            var r, i, o, a, l, c, s;
            if (!((n = null == n ? 128 : n) < 1)) {
                if (!e || !t) return e === t;
                if ((c = typeof e) != typeof t) return !1;
                if ("object" != c) return e === t;
                if (e instanceof Array) {
                    if (e.length !== t.length) return !1;
                    for (r = i = 0, a = e.length; i < a; r = ++i) if (s = e[r], 
                    !p(s, t[r], n - 1)) return !1;
                } else {
                    if (e instanceof Date) return e.valueOf() === t.valueOf();
                    if (e.nodeType && "function" == typeof e.cloneNode) return e === t;
                    for (o in l = {}, e) if (s = e[o], "$" !== o[0] && (l[o] = !0, 
                    !p(s, t[o], n - 1))) return !1;
                    for (o in t) if (s = t[o], "$" !== o[0] && !l[o] && !p(s, e[o], n - 1)) return !1;
                }
            }
            return !0;
        }, q.exceptionHandler = function(e, t, n) {
            var r = [];
            return t && r.push(t), e && e.message && r.push(e.message), n && r.push(n), 
            e && r.push(e.stack || e), console.error.apply(console, r);
        }, E = (y = function() {
            for (var e = {}, t = 0, n = arguments.length; t < n; t++) e[arguments[t]] = !0;
            return e;
        })("instanceof", "typeof", "in", "null", "true", "false", "undefined", "return"), 
        J = /[a-zA-Z\u0410-\u044F\u0401\u0451_\.\$]/, $ = function(e) {
            return e.match(J);
        }, C = function(e) {
            return 48 <= e.charCodeAt() && e.charCodeAt() <= 57;
        }, X = y("+", "-", ">", "<", "=", "&", "|", "^", "!", "~"), A = function(e) {
            return X[e] || !1;
        }, Z = y("=", "+=", "-=", "++", "--", "|=", "^=", "&=", "!=", "<<=", ">>="), 
        q.utils.parsExpression = function(e, t) {
            var h, d, s, k, m, u, v = y.apply(null, (t = t || {}).input || []), D = 1, t = (k = function(e) {
                for (var t, n, r, i, o = e.line, a = e.result || [], l = e.index || 0, c = e.level || 0, s = e.stopKey || null, u = "", f = null, p = [], h = "", d = "", m = !1, v = "", g = "", y = "", b = 0, w = null, x = function() {
                    return y && a.push({
                        type: "free",
                        value: y
                    }), y = "";
                }; l <= o.length; ) if (r = o[l - 1], t = o[l++] || "", n = o[l], 
                (m && y || !t) && x(), "string" === m) t === v && "\\" !== r ? (a.push({
                    type: "string",
                    value: g += t
                }), m = v = g = "") : g += t; else {
                    if ("key" === m) {
                        if ($(t) || C(t)) {
                            u += t;
                            continue;
                        }
                        if ("[" === t) {
                            if (u += t, !(i = k({
                                line: o,
                                index: l,
                                level: c + 1,
                                stopKey: "]"
                            })).stopKeyOk) throw "Error expression";
                            l = i.index, u += "###" + i.uniq + "###]", p.push(i);
                            continue;
                        }
                        if ("?" === t && ("." === n || "(" === n || "[" === n)) {
                            u += t;
                            continue;
                        }
                        if ("(" === t) {
                            if (u += t, !(i = k({
                                line: o,
                                index: l,
                                level: c + 1,
                                stopKey: ")"
                            })).stopKeyOk) throw "Error expression";
                            l = i.index, u += "###" + i.uniq + "###)", p.push(i);
                            continue;
                        }
                        f = {
                            type: "key",
                            value: u,
                            start: l - u.length - 1,
                            finish: l - 1,
                            children: p
                        }, a.push(f), u = m = "", p = [];
                    } else if ("sign" === m) {
                        if (A(t)) {
                            h += t;
                            continue;
                        }
                        if ("|" === h && 0 === c && 0 === b) {
                            w = o.substring(l - 1), l = o.length + 1;
                            continue;
                        }
                        (Z[h] || "=" === h[0] && "=" !== h[1]) && (f.assignment = !0), 
                        a.push({
                            type: "sign",
                            value: h
                        }), h = m = "";
                    } else if ("digit" === m) {
                        if (C(t) || "." === t) {
                            d += t;
                            continue;
                        }
                        a.push({
                            type: "digit",
                            value: d
                        }), d = "";
                    }
                    if ($(t)) m = "key", u += t; else if (A(t)) m = "sign", h += t; else if (C(t)) m = "digit", 
                    d += t; else if ('"' === t || "'" === t) m = "string", g += v = t; else {
                        if (t === s) return x(), {
                            result: a,
                            index: l,
                            stopKeyOk: !0,
                            uniq: D++
                        };
                        "(" === t && b++, ")" === t && b--, "{" === t ? (x(), i = k({
                            line: o,
                            index: l,
                            level: c + 1,
                            stopKey: "}"
                        }), a.push({
                            type: "{}",
                            child: i
                        }), l = i.index) : (":" === t && "}" === s && (f.type = "free"), 
                        y += t);
                    }
                }
                return x(), {
                    result: a,
                    index: l,
                    filter: w
                };
            })({
                line: e
            }), g = {
                isSimple: !t.filter,
                simpleVariables: []
            };
            return t.filter ? (g.expression = e.substring(0, e.length - t.filter.length - 1), 
            g.filter = t.filter) : g.expression = e, m = function(e) {
                e = e.split(/[\.\[\(\?]/);
                return {
                    count: e.length,
                    firstPart: e[0]
                };
            }, u = function(e, t) {
                return t ? "($$=" + e + ",$$==null)?undefined:" : "($$=$$" + e + ",$$==null)?undefined:";
            }, s = function(e) {
                return e.split(/[\.\[\(\?]/)[0];
            }, d = function(e) {
                var t, n, r, i, o, a, l, c;
                if ("this" === e) return "$$scope";
                if (a = s(e), r = E[a] || v[a], "this" === a && (e = "$$scope" + e.slice(4), 
                r = !0), 1 === (a = e.split("?")).length) return r ? e : "$$scope." + e;
                for (t = r ? (c = u(a[0], !0), a[0]) : (c = u("scope." + a[0]), 
                "scope." + a[0]), n = 0, i = (l = a.slice(1, a.length - 1)).length; n < i; n++) "(" === (o = l[n])[0] ? c += u(t + o, r) : (c += u(o), 
                t += o);
                return "(" === (e = a[a.length - 1])[0] ? (r || (c += "$$"), c += t + e) : c += "$$" + e, 
                "(" + c + ")";
            }, h = function(e) {
                for (var t, n, r, i, o, a, l, c, s = "", u = e.result, f = 0, p = u.length; f < p; f++) if ("key" === (n = u[f]).type) {
                    if (n.assignment ? (a = "this" === (c = m(n.value)).firstPart ? "$$scope" + n.value.substring(4) : v[c.firstPart] ? n.value : c.count < 2 ? "($$scope.$$root || $$scope)." + n.value : "$$scope." + n.value, 
                    g.isSimple = !1) : E[n.value] ? a = n.value : (a = d(n.value), 
                    g.simpleVariables.push(a)), n.children.length) for (r = 0, o = (l = n.children).length; r < o; r++) i = "###" + (t = l[r]).uniq + "###", 
                    t = h(t), a = a.split(i).join(t);
                    s += a;
                } else "{}" === n.type ? s += "{" + h(n.child) + "}" : s += n.value;
                return s;
            }, g.result = h(t), q.debug.parser && console.log(e, g), g;
        }, q.utils.parsFilter = function(e) {
            var t, n, r = [];
            for (e = e.trim(); e; ) {
                if (!(t = e.match(/^(\w+)([^\w])(.*)$/))) {
                    if (!(t = e.match(/^(\w+)$/))) return null;
                    r.push({
                        name: t[1],
                        args: [],
                        raw: ""
                    });
                    break;
                }
                e = "|" === t[2] ? (r.push({
                    name: t[1],
                    args: [],
                    raw: ""
                }), t[3]) : (n = q.utils.parsArguments(t[3], {
                    stop: "|"
                }), r.push({
                    name: t[1],
                    args: n.result,
                    raw: t[3].slice(0, n.length)
                }), t[3].slice(n.length + 1).trim());
            }
            return {
                result: r
            };
        }, q.utils.parsArguments = function(e, t) {
            var n, r, i, o, a, l, c, s;
            for (t = t || {}, r = "", o = a = 0, s = c = !(i = []), l = function() {
                r && (i.push(r), r = "");
            }; a <= e.length; ) if (n = e[a] || "", a++, c) r += n, '"' === n && (c = !1); else if (s) r += n, 
            "'" === n && (s = !1); else if ('"' === n) r += n, c = !0; else if ("'" === n) r += n, 
            s = !0; else if (o) r += n, "(" === n && o++, ")" === n && o--; else if (" " === n || "," === n) l(); else {
                if (t.stop && t.stop === n) {
                    l();
                    break;
                }
                "(" === n && (o = 1), r += n;
            }
            return l(), {
                result: i,
                length: a - 1
            };
        }, q.utils.pars_start_tag = "{{", q.utils.pars_finish_tag = "}}", ee = function(a) {
            var r = q.utils.pars_start_tag, l = q.utils.pars_finish_tag, c = [], s = 0, t = 0, u = function(e) {
                e = a.substring(t, s - (e = e || 1));
                return t = s, e;
            }, f = null, p = function(e, t, n) {
                var r, i, o;
                for (e || (f = {
                    type: "expression",
                    list: []
                }, c.push(f)), r = null; s < a.length; ) {
                    if (i = r + (r = a[s]), o = a[s += 1], r === t) return;
                    if (!n) {
                        if (i === l && 0 === e) return f.list.push(u(2)), !0;
                        "(" === r ? p(e + 1, ")") : "{" === r ? p(e + 1, "}") : '"' === r ? p(e + 1, '"', !0) : "'" === r ? p(e + 1, "'", !0) : "|" === r && 0 === e && ("|" === o ? s += 1 : f.list.push(u()));
                    }
                }
            };
            return function() {
                for (var e, t, n = null; s < a.length; ) if (t = n, n = a[s], s += 1, 
                t + n === r) {
                    if ((t = u(2)) && c.push({
                        type: "text",
                        value: t
                    }), !p(0)) throw "Wrong expression" + a;
                    n = null;
                }
                if (e = u(-1)) return c.push({
                    type: "text",
                    value: e
                });
            }(), q.debug.parser && console.log("parsText", c), c;
        }, h = {}, Y = function(e) {
            for (var t, n, r = [], i = 0, o = e.length; i < o; i++) t = e[i], n = {
                type: t.type,
                value: t.value
            }, t.list && (n.list = t.list.slice()), r.push(n);
            return r;
        }, q.utils.parsText = function(e) {
            var t = h[e];
            return t || (h[e] = t = ee(e)), Y(t);
        }, q.utils.compile = d = {}, d.cache = {}, d.Function = Function, d.expression = function(t, n) {
            var e, r, i, o, a, l;
            if (n = n || {}, a = (t = t.trim()) + "#", a = (a += n.no_return ? "+" : "-") + (n.string ? "s" : "v"), 
            n.input && (a += n.input.join(",")), o = d.cache[a]) return o;
            r = (o = q.utils.parsExpression(t, {
                input: n.input
            })).result, n.no_return || !1 ? l = "var $$;" + r : n.string && !o.filter ? (l = "var $$, __ = (" + r + "); return '' + (__ || (__ == null?'':__))", 
            o.rawExpression = "(__=" + r + ") || (__ == null?'':__)") : l = "var $$;return (" + r + ")";
            try {
                i = n.input ? ((e = n.input.slice()).unshift("$$scope"), e.push(l), 
                d.Function.apply(null, e)) : d.Function("$$scope", l);
            } catch (e) {
                throw q.exceptionHandler(e, "Wrong expression: " + t, {
                    src: t,
                    cfg: n
                }), "Wrong expression: " + r;
            }
            return o.fn = i, d.cache[a] = o;
        }, d.cacheText = {}, d.buildText = function(e, t) {
            var n, r, i, o, a, l = d.cacheText[e];
            if (!l) {
                for (a = [], i = r = 0, o = t.length; r < o; i = ++r) "expression" === (n = t[i]).type ? n.fn ? a.push("this[" + i + "].fn(this.scope)") : a.push("((x=this[" + i + "].value) || (x == null?'':x))") : n.value && (n = n.value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n"), 
                a.push('"' + n + '"'));
                a = a.join(" + "), l = d.Function("var x; return (" + a + ")"), 
                d.cacheText[e] = l;
            }
            return function() {
                return l.call(t);
            };
        }, d.cacheSimpleText = {}, d.buildSimpleText = function(e, t) {
            var n, r, i, o, a, l, c = e ? d.cacheSimpleText[e] : null;
            if (c || !t) return c || null;
            for (a = [], l = [], i = r = 0, o = t.length; r < o; i = ++r) "expression" === (n = t[i]).type ? (a.push("(" + n.re + ")"), 
            n.simpleVariables && l.push.apply(l, n.simpleVariables)) : n.value && (n = n.value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n"), 
            a.push('"' + n + '"'));
            return a = a.join(" + "), c = {
                fn: d.Function("$$scope", "var $$, __; return (" + a + ")"),
                simpleVariables: l
            }, e && (d.cacheSimpleText[e] = c), c;
        }, k = function(e) {
            var t, n, r;
            if (!e.length) return "el";
            for (r = "el", t = 0, n = e.length; t < n; t++) r += ".childNodes[" + e[t] + "]";
            return r;
        }, te = function(e) {
            for (var t, n, r = q.utils.parsText(e), i = 0, o = r.length; i < o; i++) if ("expression" === (t = r[i]).type) {
                if (1 < t.list.length) return null;
                if ("#" === (n = t.list[0])[0]) return null;
                if ("=" === n[0]) return null;
                if ("::" === n.slice(0, 2)) return null;
                if (!(n = q.utils.compile.expression(n, {
                    string: !0
                })).rawExpression) throw "Error";
                t.re = n.rawExpression;
            }
            return q.utils.compile.buildSimpleText(e, r).fn;
        }, q.core.fastBinding = function(e) {
            if (q.option.fastBinding && !e.directive && !e.hook && e.fb) return new m(e);
        }, (m = function(e) {
            var y, b, w = this, x = [];
            return w.fastWatchFn = [], y = [], (b = function(e, t) {
                var n, r, i, o, a, l, c, s, u, f, p, h, d, m, v, g;
                if (e.dir) for (m = k(y), o = 0, s = (p = e.dir).length; o < s; o++) n = p[o], 
                x.push("s.dir(" + w.fastWatchFn.length + ", " + m + ");"), w.fastWatchFn.push(n);
                if (e.attr) for (a = 0, u = (h = e.attr).length; a < u; a++) g = (i = h[a]).value, 
                l = i.attrName, m = k(y), r = te(g), v = g.replace(/"/g, '\\"').replace(/\n/g, "\\n"), 
                r ? (x.push('s.fw("' + v + '", ' + w.fastWatchFn.length + ", " + m + ', "' + l + '");'), 
                w.fastWatchFn.push(r)) : x.push("s.wt('" + v + "', " + m + ", '" + l + "');");
                if (e.text && (m = k(y), r = te(e.text), v = e.text.replace(/"/g, '\\"').replace(/\n/g, "\\n"), 
                r ? (x.push('s.fw("' + v + '", ' + w.fastWatchFn.length + ", " + m + ");"), 
                w.fastWatchFn.push(r)) : x.push('s.wt("' + v + '", ' + m + ");")), 
                e.children) for (c = 0, f = (d = e.children).length; c < f; c++) i = d[c], 
                y.length = t + 1, y[t] = i.index, b(i.fb, t + 1);
            })(e.fb, 0), x = x.join("\n"), w.resultFn = q.utils.compile.Function("s", "el", "f$", x), 
            this;
        }).prototype.bind = function(e, t) {
            this.currentCD = e, this.resultFn(this, t, L);
        }, m.prototype.dir = function(e, t) {
            var e = this.fastWatchFn[e], n = this.currentCD, r = new _({
                attrName: e.attrName,
                attrArgument: e.attrArgument,
                changeDetector: n,
                fbData: e.fbData
            }), n = e.fb.call(r, n.scope, t, e.value, r);
            n && n.start && n.start();
        }, m.prototype.fw = function(e, t, n, r) {
            var i = this.currentCD, t = this.fastWatchFn[t], o = t(i.locals), t = {
                isStatic: !1,
                isArray: !1,
                extraLoop: !1,
                deep: !1,
                value: o,
                callback: null,
                exp: t,
                src: e,
                onStop: null,
                el: n,
                ea: r || null
            };
            i.watchList.push(t), T(i.scope, t, o);
        }, m.prototype.wt = function(e, t, n) {
            this.currentCD.watchText(e, null, {
                element: t,
                elementAttr: n
            });
        }, q.hooks.attribute.unshift({
            code: "events",
            fn: function() {
                var e = this.attrName.match(/^\@([\w\.\-]+)$/);
                e && (this.ns = "al", this.name = "on", this.attrArgument = e[1]);
            }
        }), q.hooks.eventModifier = {}, (g = function(e, n) {
            return q.hooks.eventModifier[e] = {
                event: [ "keydown", "keypress", "keyup" ],
                fn: function(e, t) {
                    e[n] || (t.stop = !0);
                }
            };
        })("alt", "altKey"), g("control", "ctrlKey"), g("ctrl", "ctrlKey"), g("meta", "metaKey"), 
        g("shift", "shiftKey"), q.hooks.eventModifier.self = function(e, t) {
            if (e.target !== t.element) return t.stop = !0;
        }, q.hooks.eventModifier.once = {
            beforeExec: function(e, t) {
                return t.unbind();
            }
        }, re = function(e, t) {
            var n, r, i, o, a, l = {};
            if ("string" == typeof e ? l.event = e : "object" == typeof e && e.event && (l.event = e.event), 
            "string" == typeof l.event && (l.event = l.event.split(/\s+/)), t && l.event) {
                for (i = !1, r = 0, o = (a = l.event).length; r < o; r++) if (n = a[r], 
                0 <= t.indexOf(n)) {
                    i = !0;
                    break;
                }
                if (!i) return null;
            }
            return L.isFunction(e) ? l.fn = e : e.fn && (l.fn = e.fn), e.beforeExec && (l.beforeExec = e.beforeExec), 
            e.init && (l.init = e.init), l;
        }, q.d.al.on = function(e, t, n, r) {
            var u, i;
            r.attrArgument && (q.option.removeAttribute && (t.removeAttribute(r.attrName), 
            r.fbElement && r.fbElement.removeAttribute(r.attrName)), i = r.attrArgument.split(".")[0], 
            (u = function() {}).prototype = le(r.attrArgument, ne[i]), n && (u.prototype.fn = r.changeDetector.compile(n, {
                no_return: !0,
                input: [ "$event", "$element", "$value" ]
            })), u.prototype.expression = n, r.fastBinding = function(e, r, t, n) {
                var i, o, a, l, c, s = new u();
                for (s.scope = e, s.element = r, s.cd = n.changeDetector, i = function(e) {
                    return oe(s, e);
                }, a = 0, l = (c = s.eventList).length; a < l; a++) o = c[a], L.on(r, o, i);
                s.initFn && s.initFn(e, r, t, n), s.unbind = function() {
                    for (var e = s.eventList, t = 0, n = e.length; t < n; t++) o = e[t], 
                    L.off(r, o, i);
                }, n.changeDetector.watch("$destroy", s.unbind);
            }, r.fastBinding(e, t, n, r));
        }, ae = {
            enter: 13,
            tab: 9,
            delete: 46,
            backspace: 8,
            esc: 27,
            space: 32,
            up: 38,
            down: 40,
            left: 37,
            right: 39
        }, ne = {
            click: {
                stop: !0,
                prevent: !0
            },
            dblclick: {
                stop: !0,
                prevent: !0
            },
            submit: {
                stop: !0,
                prevent: !0
            },
            keyup: {
                filterByKey: !0
            },
            keypress: {
                filterByKey: !0
            },
            keydown: {
                filterByKey: !0
            }
        }, le = function(e, t) {
            var n, r, i, o, a, l = {
                attrArgument: e,
                throttle: null,
                throttleTime: 0,
                debounce: null,
                debounceId: null,
                initFn: null,
                eventList: null,
                stop: (t = t || {}).stop || !1,
                prevent: t.prevent || !1,
                scan: !0,
                modifiers: []
            }, c = (e = e.split("."))[0], s = null;
            for ((o = q.hooks.eventModifier[c]) && (o = re(o)).event && (l.eventList = o.event, 
            o.fn && l.modifiers.push(o), o.init && (l.initFn = o.init)), l.eventList || (l.eventList = [ c ]), 
            n = 0, i = (a = e.slice(1)).length; n < i; n++) "stop" === (r = a[n]) ? l.stop = !0 : "prevent" === r ? l.prevent = !0 : "nostop" === r ? l.stop = !1 : "noprevent" === r ? l.prevent = !1 : "noscan" === r ? l.scan = !1 : "throttle-" === r.substring(0, 9) ? l.throttle = Number(r.substring(9)) : "debounce-" === r.substring(0, 9) ? l.debounce = Number(r.substring(9)) : (o = q.hooks.eventModifier[r]) ? (o = re(o, l.eventList)) && l.modifiers.push(o) : t.filterByKey && ((s = null === s ? {} : s)[r = ae[r] ? ae[r] : r] = !0);
            return l.filterByKey = s, l;
        }, ie = function(e, t) {
            e = e.element;
            return "checkbox" === e.type ? e.checked : "radio" === e.type ? e.value || e.checked : (t.component ? t : e).value;
        }, v = function(t, n) {
            for (var e, r = t.modifiers, i = 0, o = r.length; i < o; i++) (e = r[i]).beforeExec && e.beforeExec(n, t);
            if (t.fn) try {
                t.fn(t.cd.locals, n, t.element, ie(t, n));
            } catch (e) {
                q.exceptionHandler(e, "Error in event: " + t.attrArgument + " = " + t.expression, {
                    attr: t.attrArgument,
                    exp: t.expression,
                    scope: t.scope,
                    cd: t.cd,
                    element: t.element,
                    event: n
                });
            }
            t.scan && t.cd.scan();
        }, oe = function(e, t) {
            var n, r, i, o, a, l;
            if (!e.filterByKey || e.filterByKey[t.keyCode]) {
                if (e.modifiers.length) for ((n = function() {}).prototype = e, 
                (r = new n()).stop = !1, i = 0, o = (l = e.modifiers).length; i < o; i++) if ((a = l[i]).fn && (a.fn(t, r), 
                r.stop)) return;
                e.prevent && t.preventDefault(), e.stop && t.stopPropagation(), 
                e.debounce ? (e.debounceId && clearTimeout(e.debounceId), e.debounceId = setTimeout(function() {
                    return e.debounceId = null, v(e, t);
                }, e.debounce)) : e.throttle ? e.throttleTime < Date.now() && (e.throttleTime = Date.now() + e.throttle, 
                v(e, t)) : v(e, t);
            }
        }, q.hooks.attribute.unshift({
            code: "directDirective",
            fn: function() {
                var c, e = this.attrName.match(/^(.*)\!$/);
                e && (e = e[1].replace(/(-\w)/g, function(e) {
                    return e.substring(1).toUpperCase();
                }), c = this.cd.locals[e] || q.ctrl[e] || q.option.globalController && window[e], 
                L.isFunction(c) ? this.directive = function(e, t, n, r) {
                    var i = r.changeDetector;
                    if (n) {
                        for (var o = q.utils.parsArguments(n), a = Array(o.result.length), l = 0; l < o.result.length; l++) a[l] = q.utils.compile.expression(o.result[l], {
                            input: [ "$element", "$env" ]
                        }).fn(i.locals, t, r);
                        c.apply(i, a);
                    } else c.call(i, e, t, n, r);
                } : (this.result = "noDirective", this.stop = !0));
            }
        }), q.hooks.attribute.unshift({
            code: "elementVariable",
            fn: function() {
                var e = this.attrName.match(/^#([\w\.]*)$/);
                e && (this.directive = pe, this.attrArgument = e[1]);
            }
        }), q.d.al.value = function(e, t, n, r) {
            var i, o;
            return r.fastBinding = !0, r.on(t, "input", i = function() {
                r.setValue(n, t.value), o.refresh(), r.scan();
            }), r.on(t, "change", i), o = r.watch(n, function(e) {
                return t.value = e = null == e ? "" : e, "$scanNoChanges";
            });
        }, q.d.al.checked = function(e, n, t, r) {
            var i = r.fbData = {
                opt: {},
                watch: []
            };
            function o(e) {
                var t = r.takeAttr(e);
                return q.option.removeAttribute && (n.removeAttribute(e), r.fbElement && r.fbElement.removeAttribute(e)), 
                t;
            }
            function a(e, t) {
                var n = o(t);
                return n ? (i.opt[e] = n, 1) : (n = o(":" + t) || o("al-attr." + t)) ? (i.watch.push([ n, e ]), 
                1) : void 0;
            }
            function c(n, r, i) {
                for (var e in r.fbData.opt) n[e] = r.fbData.opt[e];
                for (var t = 0, o = r.fbData.watch; t < o.length; t++) !function(e) {
                    var t = e[1];
                    r.watch(e[0], function(e) {
                        n[t] = e, i();
                    });
                }(o[t]);
            }
            a("value", "value") ? r.fastBinding = function(e, t, n, r) {
                var i, o = null;
                function a() {
                    return t.checked = o && 0 <= o.indexOf(l.value), "$scanNoChanges";
                }
                var l = {};
                c(l, r, a), i = r.watch(n, function(e) {
                    o = e, Array.isArray(o) || (o = null), a();
                }, {
                    isArray: !0
                }), r.on(t, "change", function() {
                    var e;
                    o || (o = [], r.setValue(n, o)), t.checked ? o.indexOf(l.value) < 0 && o.push(l.value) : 0 <= (e = o.indexOf(l.value)) && o.splice(e, 1), 
                    i.refresh(), r.scan();
                });
            } : (a("true", "true-value"), a("false", "false-value"), r.fastBinding = function(e, t, n, r) {
                var i, o, a = {
                    true: !0,
                    false: !1
                };
                function l() {
                    return t.checked = i === a.true, "$scanNoChanges";
                }
                c(a, r, l), o = r.watch(n, function(e) {
                    i = e, l();
                }), r.on(t, "change", function() {
                    i = t.checked ? a.true : a.false, r.setValue(n, i), o.refresh(), 
                    r.scan();
                });
            }), r.fastBinding(e, n, t, r);
        }, q.d.al.if = function(e, t, n, r) {
            var i;
            return r.elementCanBeRemoved ? (q.exceptionHandler(null, r.attrName + " can't control element because of " + r.elementCanBeRemoved, {
                scope: e,
                element: t,
                value: n,
                env: r
            }), {}) : (r.stopBinding = !0, i = {
                item: null,
                childCD: null,
                base_element: null,
                top_element: null,
                start: function() {
                    i.prepare(), i.watchModel();
                },
                prepare: function() {
                    i.base_element = t, i.top_element = document.createComment(" " + r.attrName + ": " + n + " "), 
                    L.before(t, i.top_element), L.remove(t);
                },
                updateDom: function(e) {
                    e ? i.insertBlock(e) : i.removeBlock();
                },
                removeBlock: function() {
                    i.childCD && (i.childCD.destroy(), i.childCD = null, i.removeDom(i.item), 
                    i.item = null);
                },
                insertBlock: function() {
                    i.childCD || (i.item = i.base_element.cloneNode(!0), i.insertDom(i.top_element, i.item), 
                    i.childCD = r.changeDetector.new(), q.bind(i.childCD, i.item, {
                        skip_attr: r.skippedAttr(),
                        elementCanBeRemoved: r.attrName
                    }));
                },
                watchModel: function() {
                    r.watch(n, i.updateDom);
                },
                removeDom: function(e) {
                    L.remove(e);
                },
                insertDom: function(e, t) {
                    L.after(e, t);
                }
            });
        }, q.d.al.ifnot = function(e, t, n, r) {
            var i = q.d.al.if(e, t, n, r);
            return i.updateDom = function(e) {
                e ? i.removeBlock() : i.insertBlock();
            }, i;
        }, q.directives.al.repeat = {
            restrict: "AM",
            init: function(e, $, o, W) {
                var l, U;
                return W.elementCanBeRemoved ? (q.exceptionHandler(null, W.attrName + " can't control element because of " + W.elementCanBeRemoved, {
                    scope: e,
                    element: $,
                    value: o,
                    env: W
                }), {}) : (W.stopBinding = !0, l = W.changeDetector, U = {
                    start: function() {
                        U.parsExpression(), U.prepareDom(), U.buildUpdateDom(), 
                        U.watchModel();
                    },
                    parsExpression: function() {
                        var e, t = o.trim();
                        if ("(" === t[0]) if (U.objectMode = !0, e = t.match(/\((\w+),\s*(\w+)\)\s+in\s+(.+)\s+orderBy:(.+)\s*$/)) U.objectKey = e[1], 
                        U.objectValue = e[2], U.expression = e[3] + (" | toArray:" + U.objectKey + "," + U.objectValue + " | orderBy:" + e[4]), 
                        U.nameOfKey = "$item", U.trackExpression = "$item." + U.objectKey; else {
                            if (!(e = t.match(/\((\w+),\s*(\w+)\)\s+in\s+(.+)\s*$/))) throw "Wrong repeat: " + o;
                            U.objectKey = e[1], U.objectValue = e[2], U.expression = e[3] + (" | toArray:" + U.objectKey + "," + U.objectValue), 
                            U.nameOfKey = "$item", U.trackExpression = "$item." + U.objectKey;
                        } else {
                            if ((e = t.match(/(.*) track by ([\w\.\$\(\)]+)/)) && (U.trackExpression = e[2], 
                            t = e[1]), !(e = t.match(/\s*(\w+)\s+in\s+(.+)/))) throw "Wrong repeat: " + o;
                            U.nameOfKey = e[1], U.expression = e[2];
                        }
                    },
                    watchModel: function() {
                        var e = U.objectMode ? {
                            deep: !0
                        } : {
                            isArray: !0
                        };
                        U.watch = l.watch(U.expression, U.updateDom, e);
                    },
                    prepareDom: function() {
                        var e, t, n, r, i;
                        if (8 === $.nodeType) {
                            for (U.top_element = $, U.element_list = t = [], e = $.nextSibling; e; ) {
                                if (8 === e.nodeType && "/directive:" === (i = e.nodeValue.trim().split(/\s+/))[0] && "al-repeat" === i[1]) {
                                    W.skipToElement = e;
                                    break;
                                }
                                t.push(e), e = e.nextSibling;
                            }
                            for (n = 0, r = t.length; n < r; n++) e = t[n], L.remove(e);
                        } else U.base_element = $, U.top_element = document.createComment(" " + o + " "), 
                        L.before($, U.top_element), L.remove($), q.option.removeAttribute && $.removeAttribute(W.attrName);
                    },
                    makeChild: function(e, t, n) {
                        var r = l.new(null, {
                            locals: !0
                        });
                        return U.updateLocals(r, e, t, n), r;
                    },
                    updateLocals: function(e, t, n, r) {
                        e = e.locals;
                        U.objectMode ? (e[U.objectKey] = t[U.objectKey], e[U.objectValue] = t[U.objectValue]) : e[U.nameOfKey] = t, 
                        e.$index = n, e.$first = 0 === n, e.$last = n === r.length - 1;
                    },
                    rawUpdateDom: function(e, t) {
                        for (var n, r, i, o, a = 0, l = e.length; a < l; a++) n = e[a], 
                        L.remove(n);
                        for (i = 0, o = t.length; i < o; i++) r = t[i], L.after(r.after, r.element);
                    },
                    buildUpdateDom: function() {
                        return U.updateDom = (V = [], k = null, D = H = 0, K = W.skippedAttr(), 
                        R = "$index" === U.trackExpression ? (i = {}, I = function(e) {
                            return i[H] || null;
                        }, F = function(e) {
                            null != e.$id && delete i[e.$id];
                        }, function(e, t) {
                            t.$id = H, i[H] = t;
                        }) : U.trackExpression ? (i = {}, o = l.compile(U.trackExpression, {
                            input: [ "$id", U.nameOfKey ]
                        }), n = function(e, t) {
                            return o(l.scope, e, t);
                        }, r = function(e) {
                            var t = e.$alite_id;
                            return t = t || (e.$alite_id = q.utils.getId());
                        }, I = function(e) {
                            e = n(r, e);
                            return null != e ? i[e] : null;
                        }, F = function(e) {
                            e = e.$id;
                            null != e && delete i[e];
                        }, function(e, t) {
                            e = n(r, e);
                            t.$id = e, i[e] = t;
                        }) : window.Map ? (i = new Map(), I = function(e) {
                            return i.get(e);
                        }, F = function(e) {
                            i.delete(e.item);
                        }, function(e, t) {
                            i.set(e, t);
                        }) : (i = {}, I = function(e) {
                            return "object" != typeof e ? i[e] || null : (e = e.$alite_id) ? i[e] : null;
                        }, F = function(e) {
                            var t = e.$id;
                            i[t] && (e.$id = null, delete i[t]);
                        }, function(e, t) {
                            var n;
                            "object" == typeof e ? (n = q.utils.getId(), e.$alite_id = n, 
                            t.$id = n, i[n] = t) : (t.$id = e, i[e] = t);
                        }), a = [], z = function(e) {
                            var t, n = typeof e;
                            if ("object" == n) return e && e.length ? e : [];
                            if ("number" == n) t = Math.floor(e); else if ("string" == n && (t = Math.floor(e), 
                            isNaN(t))) return [];
                            if (t < a.length) a.length = t; else for (;a.length < t; ) a.push(a.length);
                            return a;
                        }, U.element_list ? function(e) {
                            for (var i, o, a, t, l, n, r, c, s, u, f, p, h, d, m, v, g, y, b, w, x, k, D, $, C, A, E, B, T, _, N = z(e), S = U.top_element, O = [], L = [], M = 0, j = V.length; M < j; M++) (D = V[M]).active = !1;
                            for (H = u = 0, h = N.length; u < h; H = ++u) c = N[H], 
                            (D = I(c)) && (D.active = !0);
                            for (t = [], f = 0, d = V.length; f < d; f++) if (!(D = V[f]).active) {
                                for (D.prev && (D.prev.next = D.next), D.next && (D.next.prev = D.prev), 
                                F(D), D.CD.destroy(), p = 0, m = (B = D.element_list).length; p < m; p++) l = B[p], 
                                t.push(l);
                                D.next = null, D.prev = null, D.element_list = null;
                            }
                            for (E = null, A = !(i = []), n = U.element_list.length - 1, 
                            H = w = 0, v = N.length; w < v; H = ++w) if (c = N[H], 
                            D = I(s = c)) if (U.updateLocals(D.CD, c, H, N), D.prev === E) {
                                if (A) for (x = 0, g = (T = D.element_list).length; x < g; x++) l = T[x], 
                                O.push({
                                    element: l,
                                    after: S
                                }), S = l;
                                S = (E = D).element_list[n], D.active = !0, L.push(D);
                            } else {
                                for ((D.prev = E) && (E.next = D), $ = 0, y = (_ = D.element_list).length; $ < y; $++) l = _[$], 
                                O.push({
                                    element: l,
                                    after: S
                                }), S = l;
                                (E = D).active = A = !0, L.push(D);
                            } else a = U.makeChild(s, H, N), s = function() {
                                for (var e = U.element_list, t = [], n = 0, r = e.length; n < r; n++) o = e[n], 
                                l = o.cloneNode(!0), i.push({
                                    cd: a,
                                    el: l
                                }), O.push({
                                    element: l,
                                    after: S
                                }), t.push(S = l);
                                return t;
                            }(), R(c, D = {
                                CD: a,
                                element_list: s,
                                prev: E,
                                next: null,
                                active: !0,
                                item: c
                            }), E ? (k = E.next, ((E.next = D).next = k) && (k.prev = D)) : 0 === H && V[0] && (k = V[0], 
                            (D.next = k).prev = D), E = D, L.push(D);
                            for (V = L, U.rawUpdateDom(t, O), t.length = 0, C = O.length = 0, 
                            b = i.length; C < b; C++) r = i[C], q.bind(r.cd, r.el, {
                                skip_attr: K,
                                elementCanBeRemoved: W.attrName,
                                noDomOptimization: !0
                            });
                        } : function(e) {
                            var t, n, r, i, o, a, l, c, s, u, f, p, h, d, m, v, g, y, b, w = z(e), x = U.top_element;
                            for (D++, n = [], v = [], y = null, g = !(t = []), H = o = 0, 
                            f = w.length; o < f; H = ++o) l = w[H], (m = I(c = l)) ? (U.updateLocals(m.CD, l, H, w), 
                            m.prev === y ? (g && n.push({
                                element: m.element,
                                after: y.element
                            }), x = (y = m).element, m.version = D) : ((m.prev = y) && (y.next = m), 
                            n.push({
                                element: m.element,
                                after: x
                            }), g = !0, x = m.element, (y = m).version = D), v.push(m)) : (c = U.makeChild(c, H, w), 
                            $ = U.base_element.cloneNode(!0), null === k ? (i = U.base_element.cloneNode(!0), 
                            b = q.bind(c, $, {
                                skip_attr: K,
                                elementCanBeRemoved: W.attrName,
                                noDomOptimization: !0,
                                fbElement: i
                            }), (k = q.core.fastBinding(b) || !1) && (U.base_element = i)) : t.push({
                                cd: c,
                                el: $
                            }), n.push({
                                element: $,
                                after: x
                            }), R(l, m = {
                                CD: c,
                                element: x = $,
                                prev: y,
                                next: null,
                                version: D,
                                item: l
                            }), y ? (d = y.next, ((y.next = m).next = d) && (d.prev = m)) : 0 === H && V[0] && (d = V[0], 
                            (m.next = d).prev = m), y = m, v.push(m));
                            for (r = [], s = 0, p = V.length; s < p; s++) (m = V[s]).version !== D && (m.prev && (m.prev.next = m.next), 
                            m.next && (m.next.prev = m.prev), F(m), m.CD.destroy(), 
                            r.push(m.element), m.next = null, m.prev = null, m.element = null);
                            for (V = v, U.rawUpdateDom(r, n), r.length = 0, u = n.length = 0, 
                            h = t.length; u < h; u++) a = t[u], k ? k.bind(a.cd, a.el) : q.bind(a.cd, a.el, {
                                skip_attr: K,
                                elementCanBeRemoved: W.attrName,
                                noDomOptimization: !0
                            });
                        });
                        var n, r, i, F, I, o, V, H, k, D, K, R, a, z;
                    }
                });
            }
        }, q.d.al.init = function(t, n, r, i) {
            var o, e, a, l;
            q.option.removeAttribute && (n.removeAttribute(i.attrName), i.fbElement && i.fbElement.removeAttribute(i.attrName)), 
            o = i.changeDetector, l = [ "$element" ], "window" === i.attrArgument && l.push("window");
            try {
                a = o.compile(r, {
                    no_return: !0,
                    input: l
                }), i.fastBinding = e = function(e, t, n, r) {
                    return a(r.changeDetector.locals, t, window);
                }, e(0, n, 0, i);
            } catch (e) {
                q.exceptionHandler(e, "al-init, error in expression: " + r, {
                    exp: r,
                    scope: t,
                    cd: o,
                    element: n
                }), i.fastBinding = function() {};
            }
        }, q.d.al.app = {
            stopBinding: !0
        }, q.d.al.stop = {
            restrict: "AE",
            stopBinding: !0
        }, q.d.al.cloak = function(e, t, n, r) {
            t.removeAttribute(r.attrName), n && L.removeClass(t, n);
        }, q.d.al.html = {
            restrict: "AM",
            priority: 100,
            modifier: {},
            link: function(i, o, a, l) {
                var c;
                return l.elementCanBeRemoved && 8 !== o.nodeType ? (q.exceptionHandler(null, l.attrName + " can't control element because of " + l.elementCanBeRemoved, {
                    scope: i,
                    element: o,
                    value: a,
                    env: l
                }), {}) : (l.stopBinding = !0, c = {
                    baseElement: null,
                    topElement: null,
                    activeElement: null,
                    childCD: null,
                    name: a,
                    watchMode: null,
                    start: function() {
                        c.parsing(), c.prepare(), c.watchModel();
                    },
                    parsing: function() {
                        var e, t, n, r;
                        if (l.attrArgument) for (e = 0, t = (r = l.attrArgument.split(".")).length; e < t; e++) "literal" === (n = r[e]) ? c.watchMode = "literal" : "tpl" === n ? c.watchMode = "tpl" : q.d.al.html.modifier[n] && q.d.al.html.modifier[n](c, {
                            scope: i,
                            element: o,
                            inputName: a,
                            env: l
                        });
                    },
                    prepare: function() {
                        8 === o.nodeType ? (c.baseElement = null, c.topElement = o) : (c.baseElement = o, 
                        c.topElement = document.createComment(" " + l.attrName + ": " + a + " "), 
                        L.before(o, c.topElement), L.remove(o));
                    },
                    removeBlock: function() {
                        var e, t, n, r;
                        if (c.childCD && (c.childCD.destroy(), c.childCD = null), 
                        c.activeElement) {
                            if (Array.isArray(c.activeElement)) for (t = 0, n = (r = c.activeElement).length; t < n; t++) e = r[t], 
                            c.removeDom(e); else c.removeDom(c.activeElement);
                            c.activeElement = null;
                        }
                    },
                    insertBlock: function(e) {
                        var t, n, r;
                        if (c.baseElement) c.activeElement = c.baseElement.cloneNode(!1), 
                        c.activeElement.innerHTML = e, c.insertDom(c.topElement, c.activeElement), 
                        c.childCD = l.changeDetector.new(), q.bind(c.childCD, c.activeElement, {
                            skip_attr: l.skippedAttr(),
                            elementCanBeRemoved: l.attrName
                        }); else for ((r = document.createElement("body")).innerHTML = e, 
                        t = c.topElement, c.activeElement = [], c.childCD = l.changeDetector.new(); n = r.firstChild; ) c.insertDom(t, n), 
                        c.activeElement.push(t = n), q.bind(c.childCD, t, {
                            skip_attr: l.skippedAttr(),
                            elementCanBeRemoved: l.attrName
                        });
                    },
                    updateDom: function(e) {
                        c.removeBlock(), e && c.insertBlock(e);
                    },
                    removeDom: function(e) {
                        L.remove(e);
                    },
                    insertDom: function(e, t) {
                        L.after(e, t);
                    },
                    watchModel: function() {
                        "literal" === c.watchMode ? c.updateDom(c.name) : "tpl" === c.watchMode ? l.watchText(c.name, c.updateDom) : l.watch(c.name, c.updateDom);
                    }
                });
            }
        }, q.d.al.html.modifier.id = function(t) {
            return t.updateDom = function(e) {
                t.removeBlock(), (e = document.getElementById(e)) && (e = e.innerHTML) && t.insertBlock(e);
            };
        }, q.d.al.html.modifier.url = function(t) {
            return t.loadHtml = function(e) {
                L.ajax(e);
            }, t.updateDom = function(e) {
                e ? t.loadHtml({
                    cache: !0,
                    url: e,
                    success: function(e) {
                        t.removeBlock(), t.insertBlock(e);
                    },
                    error: t.removeBlock
                }) : t.removeBlock();
            };
        }, q.d.al.html.modifier.scope = function(r, i) {
            var o, a, e = r.name.split(":");
            if (2 === e.length) r.name = e[0], a = e[1]; else {
                if (e = r.name.match(/(.+)\:\s*\:\:([\d\w]+)$/)) o = !0; else if (o = !1, 
                !(e = r.name.match(/(.+)\:\s*([\.\w]+)$/))) throw "Wrong expression " + r.name;
                r.name = e[1], a = e[2];
            }
            return r.insertBlock = function(e) {
                var t, n;
                r.activeElement = r.baseElement.cloneNode(!1), r.activeElement.innerHTML = e, 
                r.insertDom(r.topElement, r.activeElement), e = i.env.changeDetector, 
                (t = r.childCD = e.new(null, {
                    locals: !0
                })).locals.outer = null, n = e.watch(a, function(e) {
                    return t.locals.outer = e;
                }, {
                    oneTime: o
                }), r.childCD.watch("$destroy", function() {
                    return n.stop();
                }), q.bind(r.childCD, r.activeElement, {
                    skip_attr: i.env.skippedAttr()
                });
            };
        }, q.d.al.html.modifier.inline = function(e, t) {
            var n = e.prepare;
            return e.prepare = function() {
                return n(), t.env.setValue(e.name, e.baseElement.innerHTML);
            };
        }, q.d.al.radio = function(e, t, n, r) {
            var i, o = r.takeAttr("al-value"), a = o ? r.eval(o) : r.takeAttr("value");
            return r.on(t, "change", function() {
                r.setValue(n, a), i.refresh(), r.scan();
            }), i = r.watch(n, function(e) {
                return t.checked = a === e, "$scanNoChanges";
            });
        }, window.Map ? ((B = function() {
            return this.idByItem = new Map(), this.itemById = {}, this.index = 1, 
            this;
        }).prototype.acquire = function(e) {
            var t = "i" + this.index++;
            return this.idByItem.set(e, t), this.itemById[t] = e, t;
        }, B.prototype.release = function(e) {
            var t = this.itemById[e];
            delete this.itemById[e], this.idByItem.delete(t);
        }, B.prototype.replace = function(e, t) {
            var n = this.itemById[e];
            this.idByItem.delete(n), this.idByItem.set(t, e), this.itemById[e] = t;
        }, B.prototype.getId = function(e) {
            return this.idByItem.get(e);
        }, B.prototype.getItem = function(e) {
            return this.itemById[e] || null;
        }) : ((B = function() {
            return this.itemById = {
                "i#null": null
            }, this;
        }).prototype.acquire = function(e) {
            var t;
            return null === e ? "i#null" : ("object" == typeof e ? (t = e.$alite_id) || (e.$alite_id = t = q.utils.getId()) : t = "" + e, 
            this.itemById[t] = e, t);
        }, B.prototype.release = function(e) {
            delete this.itemById[e];
        }, B.prototype.replace = function(e, t) {
            this.itemById[e] = t;
        }, B.prototype.getId = function(e) {
            return null === e ? "i#null" : "object" == typeof e ? e.$alite_id : "" + e;
        }, B.prototype.getItem = function(e) {
            return this.itemById[e] || null;
        }), q.d.al.select = function(e, t, n, r) {
            var i, o, a, l, c, s = r.changeDetector.new();
            return r.stopBinding = !0, s.$select = {
                mapper: o = new B()
            }, i = null, s.$select.change = function() {
                return q.nextTick(function() {
                    return l(i);
                });
            }, l = function(e) {
                e = o.getId(e);
                return e ? t.value = e : t.selectedIndex = -1;
            }, c = s.watch(n, function(e) {
                return l(i = e);
            }), r.on(t, "input", a = function(e) {
                return i = o.getItem(e.target.value), s.setValue(n, i), c.refresh(), 
                s.scan();
            }), r.on(t, "change", a), q.bind(s, t, {
                skip_attr: r.skippedAttr()
            });
        }, q.d.al.option = function(e, t, n, r) {
            var i, o, a, l, c, r = c = r.changeDetector;
            for (o = 0; o <= 4 && !(l = c.$select); ++o) c = c.parent || {};
            l ? (a = l.mapper, i = null, r.watch(n, function(e) {
                i ? a.getId(e) !== i ? (a.release(i), i = a.acquire(e), t.value = i, 
                l.change()) : a.replace(i, e) : (i = a.acquire(e), t.value = i, 
                l.change());
            }), r.watch("$destroy", function() {
                return a.release(i), l.change();
            })) : q.exceptionHandler("", "Error in al-option - al-select is not found", {
                cd: r,
                scope: r.scope,
                element: t,
                value: n
            });
        }, q.hooks.attribute.unshift({
            code: "attribute",
            fn: function() {
                var e = this.attrName.match(/^\:([\w\.\-]+)$/);
                e && ("html" === (e = e[1]).split(".")[0] ? (this.name = "html", 
                e = e.substring(5)) : this.name = "attr", this.ns = "al", this.attrArgument = e);
            }
        }), ce = {
            checked: "checked",
            readonly: "readOnly",
            value: "value",
            selected: "selected",
            muted: "muted",
            disabled: "disabled",
            hidden: "hidden"
        }, q.d.al.attr = function(e, t, i, n) {
            var o, a, r, l, c, s, u, f, p;
            if (n.attrArgument) {
                if (r = n.attrArgument.split("."), a = r[0], s = ce[a], l = 0 < r.indexOf("tpl"), 
                q.option.removeAttribute && (t.removeAttribute(n.attrName), n.fbElement && n.fbElement.removeAttribute(n.attrName)), 
                o = {
                    readOnly: !0
                }, u = null, "style" === a) {
                    if (!r[1]) throw "Style is not declared";
                    f = r[1].replace(/(-\w)/g, function(e) {
                        return e.substring(1).toUpperCase();
                    }), u = function(e, t) {
                        return e.style[f] = t = null == t ? "" : t;
                    };
                } else "class" === a && 1 < r.length ? (l = !1, c = r.slice(1), 
                u = function(e, t) {
                    var n, r, i, o, a;
                    if (t) for (r = 0, o = c.length; r < o; r++) n = c[r], L.addClass(e, n); else for (i = 0, 
                    a = c.length; i < a; i++) n = c[i], L.removeClass(e, n);
                }) : "focus" === a ? u = function(e, t) {
                    return t ? e.focus() : e.blur();
                } : s ? u = function(e, t) {
                    if (e[s] !== (t = void 0 === t ? null : t)) return e[s] = t;
                } : (o.element = t, o.elementAttr = a);
                p = l ? "watchText" : "watch", (r = u ? function(e, t, n, r) {
                    return r.changeDetector[p](i, function(e) {
                        return u(t, e);
                    }, o);
                } : function(e, t, n, r) {
                    return r.changeDetector[p](i, null, {
                        readOnly: !0,
                        element: t,
                        elementAttr: a
                    });
                })(e, t, i, n), n.fastBinding = r;
            }
        }, q.d.al.model = function(e, t, n, r) {
            var i = t.nodeName.toLowerCase();
            if ("select" === i) return q.d.al.select.call(this, e, t, n, r);
            if ("input" === i) {
                if ("checkbox" === t.type) return q.d.al.checked.call(this, e, t, n, r);
                if ("radio" === t.type) return q.d.al.radio.call(this, e, t, n, r);
            }
            return q.d.al.value.call(this, e, t, n, r);
        }, q.filters.slice = function(e, t, n) {
            return e ? n ? e.slice(t, n) : e.slice(t) : null;
        }, O = function(e) {
            return e < 10 ? "0" + e : "" + e;
        }, q.filters.date = function(e, t) {
            var n, r, i, o, a;
            if (!e) return "";
            for (o = t, r = 0, i = (a = [ [ /yyyy/g, (e = new Date(e)).getFullYear() ], [ /mm/g, O(e.getMonth() + 1) ], [ /dd/g, O(e.getDate()) ], [ /HH/g, O(e.getHours()) ], [ /MM/g, O(e.getMinutes()) ], [ /SS/g, O(e.getSeconds()) ] ]).length; r < i; r++) o = o.replace((n = a[r])[0], n[1]);
            return o;
        }, q.filters.json = {
            watchMode: "deep",
            fn: function(e) {
                return JSON.stringify(q.utils.clone(e), null, 4);
            }
        }, q.filters.filter = function(e, t, n) {
            var r, i, o, a, l, c, s, u, f, p, h;
            if (2 === arguments.length) l = null, h = t; else {
                if (3 !== arguments.length) return e;
                l = t, h = n;
            }
            if (!e || null == h || "" === h) return e;
            if (u = [], f = ("" + h).toLowerCase(), l) for (i = 0, c = e.length; i < c; i++) ((r = e[i])[l] === h || 0 <= ("" + r[l]).toLowerCase().indexOf(f)) && u.push(r); else for (o = 0, 
            s = e.length; o < s; o++) for (a in r = e[o]) ((p = r[a]) === h || 0 <= ("" + p).toLowerCase().indexOf(f)) && u.push(r);
            return u;
        }, q.filters.orderBy = function(e, n, r) {
            return !e instanceof Array ? null : (r = r ? 1 : -1, e.sort(function(e, t) {
                return e[n] < t[n] ? -r : e[n] > t[n] ? r : 0;
            }));
        }, q.filters.throttle = {
            init: function(e, t, n) {
                var r;
                return t = Number(t), r = null, {
                    onChange: function(e) {
                        return r && clearTimeout(r), r = setTimeout(function() {
                            return r = null, n.setValue(e), n.changeDetector.scan();
                        }, t);
                    }
                };
            }
        }, q.filters.toArray = {
            init: function(e, t, i) {
                var o, a = 2 === i.conf.args.length ? (o = i.conf.args[0], i.conf.args[1]) : (o = "key", 
                "value"), l = [];
                return {
                    watchMode: "deep",
                    onChange: function(e) {
                        var t, n, r;
                        for (n in l.length = 0, e) r = e[n], (t = {})[o] = n, t[a] = r, 
                        l.push(t);
                        return i.setValue(l);
                    }
                };
            }
        }, q.filters.storeTo = {
            init: function(e, t, n) {
                return {
                    onChange: function(e) {
                        return n.changeDetector.setValue(t, e), n.setValue(e);
                    }
                };
            }
        }, q.text["="] = function(e, t, n, r) {
            t = q.utils.compile.expression(t);
            if (t.filters) throw "Conflict: bindonce and filters, use one-time binding";
            r.finally(t.fn(r.changeDetector.locals));
        }, q.text["::"] = function(e, t, n, r) {
            r.changeDetector.watch(t, function(e) {
                return r.finally(e);
            }, {
                oneTime: !0
            });
        }, se = q.f$, q.component = function($, C) {
            var e, t = $.match(/^(\w+)[\-](.+)$/), t = t ? (e = t[1], t[2]) : (e = "$global", 
            $);
            t = he(t), q.d[e] || (q.d[e] = {}), q.d[e][t] = {
                restrict: "E",
                stopBinding: !0,
                priority: q.priority.$component,
                init: function(e, n, t, r) {
                    var i = {
                        $sendEvent: function(e, t) {
                            e = new CustomEvent(e);
                            e.value = t, e.component = !0, n.dispatchEvent(e);
                        }
                    }, o = r.changeDetector.new(), a = q.ChangeDetector(i), l = new _({
                        element: n,
                        attributes: r.attributes,
                        changeDetector: a,
                        parentChangeDetector: o
                    });
                    try {
                        var c = C.call(a, i, n, l) || {};
                    } catch (e) {
                        return void q.exceptionHandler(e, "Error in component <" + $ + ">: ", {
                            element: n,
                            scope: i,
                            cd: a
                        });
                    }
                    c.onStart && a.watch("$finishBinding", function() {
                        c.onStart(), a.scan();
                    });
                    var s = !1;
                    o.watch("$destroy", function() {
                        s = !0, a.destroy();
                    }), a.watch("$destroy", function() {
                        c.onDestroy && c.onDestroy(), s || o.destroy();
                    });
                    for (var u = 0, f = n.attributes; u < f.length; u++) {
                        var p = f[u];
                        if ("#" === p.name[0]) {
                            var h = p.name.slice(1);
                            if (h) {
                                c.api ? o.setValue(h, c.api) : o.setValue(h, i);
                                break;
                            }
                        }
                    }
                    function d(e, t) {
                        var n = l.takeAttr(":" + e);
                        if (!n) {
                            if (!(n = l.takeAttr(e))) return;
                            t = "copy";
                        }
                        de({
                            childCD: a,
                            listener: t,
                            name: e,
                            parentName: n,
                            parentCD: o
                        });
                    }
                    if (c.props) if (Array.isArray(c.props)) for (var m = 0, v = c.props; m < v.length; m++) d(g = v[m], !0); else for (var g in c.props) d(g, c.props[g]); else for (var y = 0, b = n.attributes; y < b.length; y++) {
                        var w = (p = b[y]).name, x = p.value;
                        x && ((w = w.match(/^\:(.*)$/)) && de({
                            childCD: a,
                            name: w[1],
                            parentName: x,
                            parentCD: o
                        }));
                    }
                    var k = !1;
                    if (o.watch("$onScanOnce", function() {
                        return k = !0;
                    }), c.template && (n.innerHTML = c.template), c.templateId) {
                        r = document.getElementById(c.templateId);
                        if (!r) throw "No template " + c.templateId;
                        n.innerHTML = r.innerHTML;
                    }
                    function D() {
                        k || o.digest(), q.bind(a, n, {
                            skip: !0
                        });
                    }
                    c.templateUrl ? se.ajax({
                        url: c.templateUrl,
                        cache: !0,
                        success: function(e) {
                            n.innerHTML = e, D();
                        },
                        error: function() {
                            console.error("Template is not loaded", c.templateUrl);
                        }
                    }) : D();
                }
            };
        }, q;
    }
    var t = e();
    t.makeInstance = e, "function" == typeof alightInitCallback ? alightInitCallback(t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t : (t.option.globalController = !0, 
    (window.alight = t).f$.ready(t.bootstrap));
}();