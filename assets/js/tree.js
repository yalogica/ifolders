!function(p) {
    "use strict";
    const c = {
        TITLE: "title",
        SELECT: "select",
        COLLAPSE: "collapse",
        LABEL: "label",
        COLOR: "color"
    }, i = {
        data: null,
        icon: {
            normal: '<svg viewBox="0 0 24 24"><path d=" M 1.786 21 L 22.214 21 C 22.648 21 23 20.648 23 20.214 L 23 5.786 C 23 5.352 22.648 5 22.214 5 L 11 5 L 10.176 3.361 C 10.079 3.167 9.824 3.009 9.607 3.009 L 1.786 3.001 C 1.352 3 1 3.352 1 3.786 L 1 20.214 C 1 20.648 1.352 21 1.786 21 Z " fill="currentColor" style="filter:invert(0.05) brightness(0.8)"/><path d=" M 1.786 21 L 22.214 21 C 22.648 21 23 20.648 23 20.214 L 23 5.786 C 23 5.352 22.648 5 22.214 5 L 11 5 L 10 7 L 1 7 L 1 20.214 C 1 20.648 1.352 21 1.786 21 Z " fill="currentColor" style="filter:invert(0.05)"/></svg>'
        },
        callback: {
            loading: null,
            move: null,
            collapse: null
        }
    }, n = {
        id: null,
        color: null,
        title: null,
        state: {
            selected: !1,
            collapsed: !1
        },
        items: []
    }, l = {
        extend: function(i) {
            i = i || {};
            for (let t = 1; t < arguments.length; t++) {
                let e = arguments[t];
                if (e) for (var n in e) e.hasOwnProperty(n) && ("object" == typeof e[n] && null != e[n] ? e[n] instanceof Array ? i[n] = e[n].slice(0) : i[n] = l.extend(i[n], e[n]) : i[n] = e[n]);
            }
            return i;
        },
        extendTreeCfg: function(e) {
            const t = l.extend({}, i, e);
            return delete t.data, t;
        },
        extendTreeItemCfg: function(e) {
            const t = l.extend({}, n, e);
            return null == t.id && (t.id = l.uuid()), t.state.selected = !1, t.items = [], 
            t;
        },
        isArray: function(e) {
            return Array.isArray(e);
        },
        isString: function(e) {
            return "string" == typeof e;
        },
        uuid: function() {
            return ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16));
        }
    }, s = function() {
        const m = new WeakMap();
        function e(e, t) {
            m.set(this, {
                $container: null,
                dragdrop: {
                    enabled: !0,
                    item: null,
                    active: {
                        flag: !1,
                        x: 0,
                        y: 0,
                        offset: 10
                    },
                    $ghost: null,
                    $target: null,
                    type: null
                },
                select: {
                    list: []
                },
                config: null,
                data: [],
                ready: !1
            }), this._init(e, t);
        }
        return e.prototype = {
            get VERSION() {
                return "1.0.0";
            },
            _init: function(e, t) {
                const i = m.get(this);
                i.$container = p(e), i.$container.length ? (i.config = l.extendTreeCfg(t), 
                i.ready = !1, this._create(t ? t.data : null)) : console.error("Tree: can't find the tree container");
            },
            _create: function(e) {
                this._buildDOM(), this._bind(), this._ready(e);
            },
            _buildDOM: function() {
                const e = m.get(this);
                e.$container.addClass("ifs-tree").attr({
                    tabindex: 0
                }), e.dragdrop.$ghost = p("<div>").addClass("ifs-tree-drag-ghost");
                var t = p("<div>").addClass("ifs-tree-nodes");
                e.$container.append(t);
            },
            _bind: function() {
                const e = m.get(this);
                e._onToggleClick = this._onToggleClick.bind(this), e._onItemClick = this._onItemClick.bind(this), 
                e._onKeyDown = this._onKeyDown.bind(this), e._onItemMouseDown = this._onItemMouseDown.bind(this), 
                e._onItemMouseEnter = this._onItemMouseEnter.bind(this), e._onItemMouseLeave = this._onItemMouseLeave.bind(this), 
                e._onItemMouseMove = this._onItemMouseMove.bind(this), e._onItemMouseUp = this._onItemMouseUp.bind(this), 
                e.$container.on("keydown", e._onKeyDown), e.$container.on("click", ".ifs-tree-toggle", e._onToggleClick), 
                e.$container.on("click", ".ifs-tree-item", e._onItemClick), e.$container.on("mousedown", ".ifs-tree-item", e._onItemMouseDown);
            },
            _loading: function(e) {
                const t = m.get(this);
                t.config.callback.loading && "function" == typeof t.config.callback.loading && t.config.callback.loading.call(this, e);
            },
            _ready: function(e) {
                const t = m.get(this);
                for (var i in t.$container.addClass("ifs-tree-ready"), this._loading(!0), 
                e) this._addItem(e[i]);
                this._loading(!1);
            },
            _getData: function() {
                return m.get(this).data;
            },
            _getFlatData: function() {
                var e = m.get(this);
                const a = [];
                return function e(t, i, n) {
                    for (var s in t) s = t[s], a.push({
                        id: s.id,
                        color: s.color,
                        title: s.title,
                        parent: i,
                        level: n,
                        collapsed: s.state.collapsed
                    }), e(s.items, s.id, n + 1);
                }(e.data, null, 0), a.length ? a : null;
            },
            _filter: function(a) {
                const e = m.get(this);
                a ? (e.$container.find(".ifs-tree-node.ifs-hidden").removeClass("ifs-hidden"), 
                e.$container.find(".ifs-tree-title").each((e, t) => {
                    const i = p(t);
                    t = i.text();
                    const n = i.parent(), s = n.parent();
                    !function(t, i) {
                        if (t) {
                            let e = t.replace(/[.+^${}()|[\]\\]/g, "\\$&");
                            e = e.includes("*") || e.includes("?") ? e : "*" + e + "*";
                            const n = new RegExp(`^${e.replace(/\*/g, ".*").replace(/\?/g, ".")}$`, "i");
                            return n.test(i);
                        }
                    }(a, t) ? (i.removeClass("ifs-bold"), s.addClass("ifs-hidden")) : (i.addClass("ifs-bold"), 
                    s.parents(".ifs-tree-node").removeClass("ifs-hidden"));
                })) : (e.$container.find(".ifs-tree-node.ifs-hidden").removeClass("ifs-hidden"), 
                e.$container.find(".ifs-tree-title.ifs-bold").removeClass("ifs-bold"));
            },
            _addItemElement: function(e, t) {
                const i = m.get(this);
                let n = null;
                if (t) {
                    const r = i.$container.find(`[data-id='${t.id}']`);
                    !r.length || (n = p(r.parent().find(".ifs-tree-nodes").get(0))).length || (n = p("<div>").addClass("ifs-tree-nodes"), 
                    r.addClass("ifs-tree-has-children"), r.parent().append(n));
                } else n = p(i.$container.find(".ifs-tree-nodes").get(0)), i.$container.addClass("ifs-tree-has-children");
                if (n) {
                    const l = p("<div>").addClass("ifs-tree-node"), d = p("<div>").addClass("ifs-tree-item").attr({
                        "data-id": e.id
                    });
                    var t = p("<div>").addClass("ifs-tree-toggle"), s = p("<div>").addClass("ifs-tree-icon").append(i.config.icon.normal), a = p("<div>").addClass("ifs-tree-title"), o = p("<div>").addClass("ifs-tree-label");
                    n.append(l.append(d.append(t, s, a, o))), this._updateItemElement(e, [ c.TITLE, c.SELECT, c.COLLAPSE, c.LABEL, c.COLOR ]), 
                    e.state.selected && i.select.list.push(e);
                }
            },
            _removeItemElement: function(e, t) {
                const i = m.get(this), n = i.$container.find(`[data-id='${e.id}']`);
                if (n.parent().remove(), e.state.selected && i.select.list.splice(i.select.list.indexOf(e), 1), 
                t && 0 === t.items.length) {
                    const s = i.$container.find(`[data-id='${t.id}']`), a = p(s.parent().find(".ifs-tree-nodes").get(0));
                    s.removeClass("ifs-tree-has-children"), a.remove();
                }
            },
            _updateItemElement: function(e, t) {
                const i = m.get(this), n = e ? i.$container.find(`[data-id='${e.id}']`) : null;
                if (n.length) for (var s in t = l.isString(t) ? [ t ] : t) switch (t[s]) {
                  case c.TITLE:
                    n.find(".ifs-tree-title").text(e.title);
                    break;

                  case c.SELECT:
                    n.toggleClass("ifs-tree-selected", e.state.selected);
                    break;

                  case c.COLLAPSE:
                    n.toggleClass("ifs-tree-collapsed", e.state.collapsed);
                    break;

                  case c.LABEL:
                    n.find(".ifs-tree-label").toggleClass("ifs-tree-active", !!e.count).text(e.count);
                    break;

                  case c.COLOR:
                    n.find(".ifs-tree-icon").css({
                        color: e.color || ""
                    });
                }
            },
            _addItem: function(e, t) {
                const o = m.get(this), r = this;
                return function e(t, i) {
                    if (t && t.id && r._getItem(t.id)) return null;
                    var n = l.extendTreeItemCfg(t);
                    const s = r._getItem(i);
                    if ((s ? s.items : o.data).push(n), r._addItemElement(n, s), 
                    t) for (const a in t.items) e(t.items[a], n.id);
                    return n;
                }(e, t);
            },
            _getItem: function(e) {
                return function t(i, n) {
                    let s = null;
                    if (i) for (let e = 0; e < i.length && (s = i[e]).id !== n && !(s = t(s.items, n)); e++);
                    return s;
                }(m.get(this).data, e);
            },
            _getParentItem: function(e) {
                return function t(i, n, s) {
                    let a = null;
                    if (i) for (let e = 0; e < i.length; e++) {
                        if ((a = i[e]).id === n) {
                            a = s;
                            break;
                        }
                        if (a = t(a.items, n, a)) break;
                    }
                    return a;
                }(m.get(this).data, e, null);
            },
            _getPrevItem: function(e, o) {
                var t = m.get(this);
                const r = [];
                return function t(i, n) {
                    let s = null;
                    if (i) for (let e = 0; e < i.length; e++) {
                        if ((s = i[e]).id === n) {
                            var a;
                            if (0 < e) for (s = i[e - 1]; (!s.state.collapsed || o) && s.items.length; ) s = s.items[s.items.length - 1]; else s = null, 
                            r.length && (a = r[r.length - 1], s = a.items[a.index]);
                            break;
                        }
                        if (r.push({
                            index: e,
                            items: i
                        }), s = t(s.items, n, s), r.pop(), s) break;
                    }
                    return s;
                }(t.data, e);
            },
            _getNextItem: function(e, o) {
                var t = m.get(this);
                const r = [];
                return function t(i, n) {
                    let s = null;
                    if (i) for (let e = 0; e < i.length; e++) {
                        if ((s = i[e]).id === n) {
                            if (s.state.collapsed && !o || !s.items.length) if (e < i.length - 1) s = i[e + 1]; else for (s = null, 
                            e = r.length; e--; ) {
                                var a = r[e];
                                if (a.index < a.items.length - 1) {
                                    s = a.items[a.index + 1];
                                    break;
                                }
                            } else s = s.items.length ? s.items[0] : null;
                            break;
                        }
                        if (r.push({
                            index: e,
                            items: i
                        }), s = t(s.items, n, s), r.pop(), s) break;
                    }
                    return s;
                }(t.data, e);
            },
            _getSelectedItems: function() {
                return m.get(this).select.list;
            },
            _moveItem: function(t, i, e) {
                const n = m.get(this);
                var s = this._getItem(t), a = this._getItem(i);
                if (null != s && null != a) {
                    this._loading(!0);
                    const r = n.$container.find(`[data-id='${s.id}']`), l = r.parent(), d = n.$container.find(`[data-id='${a.id}']`), c = d.parent();
                    var o = s ? this._getParentItem(s.id) : null, a = a ? this._getParentItem(a.id) : null;
                    const f = o ? o.items : n.data, g = a ? a.items : n.data;
                    for (let e = 0; e < f.length; e++) if (f[e].id === t) {
                        f.splice(e, 1);
                        break;
                    }
                    if (l.detach(), 0 === f.length && o) {
                        const u = n.$container.find(`[data-id='${o.id}']`), h = p(u.parent().find(".ifs-tree-nodes").get(0));
                        u.removeClass("ifs-tree-has-children"), h.remove();
                    }
                    switch (e) {
                      case "inside":
                        for (let t = 0; t < g.length; t++) if (g[t].id === i) {
                            g[t].items.push(s);
                            let e = p(d.parent().find(".ifs-tree-nodes").get(0));
                            e.length || (e = p("<div>").addClass("ifs-tree-nodes"), 
                            d.addClass("ifs-tree-has-children"), d.parent().append(e)), 
                            e.append(l);
                            break;
                        }
                        break;

                      case "before":
                        for (let e = 0; e < g.length; e++) if (g[e].id === i) {
                            g.splice(e, 0, s);
                            break;
                        }
                        c.before(l);
                        break;

                      case "after":
                        for (let e = 0; e < g.length; e++) if (g[e].id === i) {
                            g.splice(e + 1, 0, s);
                            break;
                        }
                        c.after(l);
                    }
                    this._loading(!1);
                }
            },
            _removeItem: function(e) {
                var t = m.get(this);
                const o = this;
                return function i(e, n) {
                    let s = null;
                    if (n) for (let t = 0; t < n.length; t++) {
                        if (s = n[t], n[t].id === e) {
                            let e = s.items.length;
                            for (;e--; ) i(s.items[e].id, s.items);
                            var a = o._getParentItem(s.id);
                            n.splice(t, 1), o._removeItemElement(s, a);
                            break;
                        }
                        if (s = i(e, n[t].items)) break;
                    }
                    return s;
                }(e, t.data);
            },
            _collapseItem: function(e, t) {
                const i = m.get(this), n = this._getItem(e);
                if (n) {
                    let e = !1;
                    void 0 === t ? (e = !0, n.state.collapsed = !n.state.collapsed) : n.state.collapsed !== t && (e = !0, 
                    n.state.collapsed = t), e && (this._updateItemElement(n, c.COLLAPSE), 
                    i.config.callback.collapse && "function" == typeof i.config.callback.collapse && i.config.callback.collapse.call(this, n));
                }
            },
            _selectItem: function(e, t) {
                const i = m.get(this), n = this._getItem(e);
                if (n) {
                    let e = !1;
                    void 0 === t ? (e = !0, n.state.selected = !n.state.selected) : n.state.selected !== t && (e = !0, 
                    n.state.selected = t), e && (this._updateItemElement(n, c.SELECT), 
                    n.state.selected && -1 === i.select.list.indexOf(n) ? i.select.list.push(n) : i.select.list.splice(i.select.list.indexOf(n), 1));
                }
            },
            _selectItemRange: function(e, t) {
                var i = m.get(this), n = [];
                if (e && t && e !== t) {
                    !function t(i, n, s, a) {
                        if (s) for (let e = 0; e < s.length; e++) {
                            var o = s[e];
                            if (o.id === i) {
                                if (a.push(o), 1 < a.length) return 1;
                            } else if (o.id === n) {
                                if (a.push(o), 1 < a.length) return 1;
                            } else a.length && a.push(o);
                            if (o.items.length && !o.state.collapsed && t(i, n, o.items, a)) return 1;
                        }
                    }(e, t, i.data, n);
                    for (let e = 0; e < n.length; e++) n[e].state.selected || this._selectItem(n[e].id, !0, !0);
                } else t && this._selectItem(t, !0);
            },
            _clearSelection: function() {
                const i = m.get(this);
                for (let t = 0; t < i.select.list.length; t++) {
                    let e = i.select.list[t];
                    e.state.selected = !1, this._updateItemElement(e, c.SELECT);
                }
                i.select.list = [];
            },
            _getDragDropType: function(e, t) {
                e = e.getBoundingClientRect(), t = t - window.scrollY - e.top;
                return t < e.height / 4 ? "before" : t > 3 * e.height / 4 ? "after" : "inside";
            },
            _onKeyDown: function(e) {
                const t = m.get(this);
                var i = t.select.list[t.select.list.length - 1];
                if (document.activeElement === t.$container.get(0) && i) {
                    switch (e.keyCode) {
                      case 38:
                        var n = this._getPrevItem(i.id, !1);
                        n && (this._clearSelection(), this._selectItem(n.id, !0));
                        break;

                      case 40:
                        n = this._getNextItem(i.id, !1);
                        n && (this._clearSelection(), this._selectItem(n.id, !0));
                        break;

                      case 37:
                        this._collapseItem(i.id, !0);
                        break;

                      case 39:
                        this._collapseItem(i.id, !1);
                    }
                    e.preventDefault();
                }
            },
            _onToggleClick: function(e) {
                e.preventDefault(), e.stopImmediatePropagation();
                const t = p(e.currentTarget).parent();
                e = t ? t.attr("data-id") : null;
                this._collapseItem(e);
            },
            _onItemClick: function(e) {
                const t = p(e.currentTarget);
                var i = t ? t.attr("data-id") : null;
                e.shiftKey || e.ctrlKey ? e.ctrlKey ? this._selectItem(i) : e.shiftKey && (e = (e = m.get(this)).select.list.length ? e.select.list[e.select.list.length - 1].id : null, 
                this._selectItemRange(e, i)) : this._clearSelection();
            },
            _onItemMouseDown: function(e) {
                if (1 === e.which && !e.shiftKey && !e.ctrlKey && !p(e.target).hasClass("ifs-tree-toggle")) {
                    e.stopImmediatePropagation();
                    const s = m.get(this), a = p(e.currentTarget);
                    var t = a.attr("data-id"), t = this._getItem(t), i = (s.dragdrop.item = t, 
                    p("<div>").addClass("ifs-tree-icon")), t = p("<div>").addClass("ifs-tree-title").text(t.title), n = p("<div>").addClass("ifs-tree-label").text(s.select.list.length);
                    s.dragdrop.active.flag = !1, s.dragdrop.active.x = e.pageX, 
                    s.dragdrop.active.y = e.pageY, s.dragdrop.$ghost.empty().append(i, t, n).appendTo("body"), 
                    s.$container.addClass("ifs-tree-dragging"), s.$container.on("mouseenter", ".ifs-tree-item", s._onItemMouseEnter), 
                    s.$container.on("mouseleave", ".ifs-tree-item", s._onItemMouseLeave), 
                    p(window).on("mousemove", s._onItemMouseMove), p(window).on("mouseup", s._onItemMouseUp);
                }
            },
            _onItemMouseEnter: function(e) {
                const t = m.get(this);
                t.dragdrop.$target = p(e.currentTarget), t.dragdrop.$target && t.dragdrop.$target.removeClass("ifs-tree-before ifs-tree-inside ifs-tree-after");
            },
            _onItemMouseLeave: function() {
                const e = m.get(this);
                e.dragdrop.$target && e.dragdrop.$target.removeClass("ifs-tree-before ifs-tree-inside ifs-tree-after"), 
                e.dragdrop.$target = null;
            },
            _onItemMouseMove: function(e) {
                const t = m.get(this);
                var i;
                t.dragdrop.active.flag ? (t.dragdrop.$ghost.addClass("ifs-tree-active").css({
                    top: e.clientY + 5 + "px",
                    left: e.clientX + 5 + "px"
                }), t.dragdrop.$target && (i = this._getDragDropType(t.dragdrop.$target.get(0), e.pageY), 
                t.dragdrop.type !== i && (t.dragdrop.$target.removeClass("ifs-tree-before ifs-tree-inside ifs-tree-after").addClass("ifs-tree-" + i), 
                t.dragdrop.type = i))) : (t.dragdrop.active.flag = Math.abs(t.dragdrop.active.x - e.pageX) > t.dragdrop.active.offset || Math.abs(t.dragdrop.active.y - e.pageY) > t.dragdrop.active.offset, 
                t.dragdrop.active.flag && ((i = t.dragdrop.item) && !i.state.selected && (this._clearSelection(), 
                this._selectItem(i.id)), t.dragdrop.$ghost.find(".ifs-tree-label").text(t.select.list.length)));
            },
            _onItemMouseUp: function() {
                const e = m.get(this);
                if (e.dragdrop.$ghost.empty().css({
                    top: null,
                    left: null
                }).removeClass("ifs-tree-active").detach(), e.$container.removeClass("ifs-tree-dragging"), 
                e.dragdrop.active.flag && e.dragdrop.$target) {
                    var t = [], i = e.dragdrop.$target ? e.dragdrop.$target.attr("data-id") : null, n = e.dragdrop.type;
                    if (e.dragdrop.$ghost.detach().empty(), e.dragdrop.$target && e.dragdrop.$target.removeClass("ifs-tree-before ifs-tree-inside ifs-tree-after"), 
                    e.dragdrop.$target = null, e.dragdrop.type = null, e.dragdrop.item = null, 
                    e.$container.removeClass("ifs-tree-dragging"), !function t(i, n, s) {
                        if (i) for (let e = 0; e < i.length; e++) {
                            var a = i[e];
                            if (a.state.selected) {
                                let i = !0;
                                for (let t = 0; t < n.length; t++) for (let e = 0; e < s.length; e++) if (s[e].id === n[t].id) {
                                    i = !1;
                                    break;
                                }
                                i && s.push(a);
                            }
                            a.items.length && (n.push(a), t(a.items, n, s), n.pop());
                        }
                    }(e.data, [], t), function t(i, n) {
                        for (let e = 0; e < i.length; e++) {
                            if (i[e].id === n) return;
                            if (i[e].items.length && !t(i[e].items, n)) return;
                        }
                        return 1;
                    }(t, i)) {
                        const r = [];
                        for (let e = 0; e < t.length; e++) r.push(t[e].id);
                        function s(t, i, n) {
                            if ("after" === n) {
                                let e = t.length;
                                for (;e--; ) this._moveItem(t[e], i, n);
                            } else for (let e = 0; e < t.length; e++) this._moveItem(t[e], i, n);
                        }
                        if (e.config.callback.move && "function" == typeof e.config.callback.move) {
                            var a = "inside" === n ? this._getItem(i) : this._getParentItem(i), o = a ? a.id : null;
                            const l = a ? a.items : e.data;
                            a = l.map(e => e.id);
                            e.config.callback.move.call(this, r, o, i, a, n, s);
                        } else s.call(this, r, i, n);
                    }
                }
                e.$container.off("mouseenter", ".ifs-tree-item", e._onItemMouseEnter), 
                e.$container.off("mouseleave", ".ifs-tree-item", e._onItemMouseLeave), 
                p(window).off("mousemove", e._onItemMouseMove), p(window).off("mouseup", e._onItemMouseUp);
            },
            getIcon: function() {
                return m.get(this).config.icon.normal;
            },
            getData: function() {
                return this._getData();
            },
            hasItems: function() {
                var e = m.get(this);
                return e.data && 0 < e.data.length;
            },
            getFlatData: function() {
                return this._getFlatData();
            },
            getItem: function(e) {
                return this._getItem(e);
            },
            getParentItem: function(e) {
                return this._getParentItem(e);
            },
            selectItem: function(e, t) {
                this._selectItem(e, t);
            },
            getSelectedItems: function() {
                return this._getSelectedItems();
            },
            clearSelection: function() {
                this._clearSelection();
            },
            filter: function(e) {
                this._filter(e);
            },
            addItem: function(e, t) {
                return this._addItem(e, t);
            },
            collapseItem: function(e, t) {
                return this._collapseItem(e, t);
            },
            removeItem: function(e) {
                this._removeItem(e);
            },
            updateItemTitle: function(e, t) {
                const i = this._getItem(e);
                i && (i.title = t, this._updateItemElement(i, c.TITLE));
            },
            updateItemColor: function(e, t) {
                const i = this._getItem(e);
                i && (i.color = t, this._updateItemElement(i, c.COLOR));
            },
            updateItemLabel: function(e, t) {
                const i = this._getItem(e);
                i && (i.count = parseInt(t, 10), this._updateItemElement(i, c.LABEL));
            },
            toggleDragDrop: function(e) {
                const t = m.get(this);
                e ? (t.dragdrop.enabled || t.$container.on("mousedown", ".ifs-tree-item", t._onItemMouseDown), 
                t.dragdrop.enabled = !0) : (t.dragdrop.enabled && t.$container.off("mousedown", ".ifs-tree-item", t._onItemMouseDown), 
                t.dragdrop.enabled = !1);
            }
        }, e;
    }();
    window.IFOLDERS = window.IFOLDERS || {}, window.IFOLDERS.PLUGINS = window.IFOLDERS.PLUGINS || {}, 
    window.IFOLDERS.PLUGINS.TREE = function(e, t) {
        return new s(e, t);
    };
}(jQuery);