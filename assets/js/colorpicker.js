!function(i) {
    "use strict";
    const c = function() {
        const s = new WeakMap();
        function o(o, e, t) {
            s.set(this, {
                type: e ? "embed" : "popup",
                $parent: e || i("body"),
                $container: null,
                $element: null,
                selectedColor: o || null,
                colors: [],
                callback: t || null,
                offset: {
                    top: 0,
                    left: 0
                }
            }), this._init();
        }
        return o.prototype = {
            _init: function() {
                var o = s.get(this);
                this._buildColors(), this._buildDOM(), this._bind(), this._selectColor(o.selectedColor);
            },
            _buildDOM: function() {
                const o = s.get(this);
                var e = '<div><div id="ifs-colorpicker-saved-colors" class="ifs-colorpicker-colors">' + this._renderSavedColors() + '</div><div class="ifs-colorpicker-line"></div><div class="ifs-colorpicker-colors">' + this._renderMainColors() + '</div><div class="ifs-colorpicker-line"></div><div class="ifs-colorpicker-row"><div class="ifs-colorpicker-input-text-wrap"><input class="ifs-colorpicker-input-text" type="text" maxlength="7"><i class="ifs-colorpicker-clear">&times;</i></div><div class="ifs-colorpicker-input-color-wrap"><input class="ifs-colorpicker-input-color" type="color" value="#ffffff"><div class="ifs-colorpicker-preview-wrap"><div class="ifs-colorpicker-preview"></div></div></div><div class="ifs-colorpicker-button ifs-colorpicker-button-submit">OK</div></div></div>';
                o.$container = i(e).toggleClass("ifs-colorpicker-embed", "embed" == o.type).toggleClass("ifs-colorpicker-popup", "popup" == o.type), 
                o.$parent.append(o.$container);
            },
            _bind: function() {
                const o = s.get(this);
                o.$container.on("click", ".ifs-colorpicker-colors .ifs-colorpicker-color", this._clickColor.bind(this)), 
                o.$container.on("dblclick", ".ifs-colorpicker-colors .ifs-colorpicker-color", this._dblclickColor.bind(this)), 
                o.$container.on("click", ".ifs-colorpicker-clear", this._clearColor.bind(this)), 
                o.$container.on("click", ".ifs-colorpicker-button-submit", this._submit.bind(this)), 
                o.$container.find(".ifs-colorpicker-input-text").on("input", this._setColorFromInput.bind(this)), 
                o.$container.find(".ifs-colorpicker-input-color").on("input", this._setColorFromPreview.bind(this)), 
                i(window).on("resize", this._resize.bind(this)), document.addEventListener("mousedown", this._mousedown.bind(this), {
                    capture: !0
                });
            },
            _renderMainColors: function() {
                var e = s.get(this);
                let t = "";
                for (let o = 0; o < 3; o++) {
                    t += '<div class="ifs-colorpicker-row">';
                    for (const i of e.colors[o]) t += '<div class="ifs-colorpicker-color" data-color="' + i + '" style="background-color:' + i + '"></div>';
                    t += "</div>";
                }
                return t;
            },
            _renderSavedColors: function() {
                var o = s.get(this), e = Cookies.get("ifs-colorpicker-colors") ? JSON.parse(Cookies.get("ifs-colorpicker-colors")) : [ null, null, null, null, null ];
                let t = "";
                t += '<div class="ifs-colorpicker-row"><div class="ifs-colorpicker-color ifs-colorpicker-color-save" title="add to pallete"></div>';
                for (const c in o.colors[3]) {
                    var i = e[c] || o.colors[3][c];
                    t += '<div class="ifs-colorpicker-color" data-color="' + i + '" style="background-color:' + i + '"></div>';
                }
                return t += "</div>";
            },
            _buildColors: function() {
                const o = s.get(this);
                o.colors.push([ "#e49086", "#f2b78f", "#fde7ab", "#cddf7b", "#8fcaf2", "#db96d9" ]), 
                o.colors.push([ "#d35141", "#e98746", "#fbd25e", "#b3cf3c", "#46a8e9", "#c65bbb" ]), 
                o.colors.push([ "#aa2b22", "#c85f19", "#fabc0f", "#819526", "#1981c8", "#9d3aa7" ]), 
                o.colors.push([ "#000000", "#222222", "#444444", "#666666", "#888888" ]);
            },
            _show: function(o) {
                const e = s.get(this);
                e.$element = i(o.currentTarget), this._place(e.$element), this._selectColor(this.get(e.$element)), 
                e.$container.find("#ifs-colorpicker-saved-colors").empty().append(this._renderSavedColors()), 
                e.$container.addClass("ifs-active");
            },
            _close: function() {
                const o = s.get(this);
                o.$element = null, o.$container.removeClass("ifs-active");
            },
            _mousedown: function(o) {
                const e = s.get(this);
                !e.$element || e.$element.is(o.target) || e.$container.is(o.target) || e.$container.find(o.target).length || this._close();
            },
            _place: function(o) {
                const e = s.get(this);
                var t = document.documentElement, i = (window.scrollX || t.scrollLeft) - (t.clientLeft || 0), t = (window.scrollY || t.scrollTop) - (t.clientTop || 0), c = o.offset();
                const r = c.top - t, l = c.left - i;
                t = o.outerHeight(!1);
                e.$container.css({
                    top: r + e.offset.top + t,
                    left: l + e.offset.left
                });
            },
            _resize: function() {
                var o = s.get(this);
                o.$element && this._place(o.$element);
            },
            _selectColor: function(o) {
                const e = s.get(this);
                o && 0 != o.length ? (e.selectedColor = o, i(".ifs-colorpicker-input-text", e.$container).val(o), 
                i(".ifs-colorpicker-input-color", e.$container).val(o), i(".ifs-colorpicker-preview", e.$container).css({
                    background: o || ""
                })) : (e.selectedColor = null, i(".ifs-colorpicker-input-text", e.$container).val(""), 
                i(".ifs-colorpicker-input-color", e.$container).val("#ffffff"), 
                i(".ifs-colorpicker-preview", e.$container).css({
                    background: ""
                }));
            },
            _clearColor: function() {
                this._selectColor();
            },
            _saveColor: function() {
                const o = s.get(this);
                if (o.selectedColor) {
                    const e = Cookies.get("ifs-colorpicker-colors") ? JSON.parse(Cookies.get("ifs-colorpicker-colors")) : [ null, null, null, null, null, null ];
                    if (e[0] !== o.selectedColor) {
                        for (let o = e.length - 1; 0 < o; o--) e[o] = e[o - 1];
                        e[0] = o.selectedColor, Cookies.set("ifs-colorpicker-colors", JSON.stringify(e));
                    }
                    o.$container.find("#ifs-colorpicker-saved-colors").html(this._renderSavedColors());
                }
            },
            _clickColor: function(o) {
                const e = i(o.currentTarget);
                e.hasClass("ifs-colorpicker-color-save") ? this._saveColor() : this._selectColor(i(o.currentTarget).attr("data-color"));
            },
            _dblclickColor: function(o) {
                const e = i(o.currentTarget);
                e.hasClass("ifs-colorpicker-color-save") || (this._selectColor(i(o.currentTarget).attr("data-color")), 
                this._submit());
            },
            _setColorFromInput: function(o) {
                const e = s.get(this);
                e.selectedColor = i(".ifs-colorpicker-input-text", e.$container).val(), 
                "#" != e.selectedColor[0] && (e.selectedColor = "#" + e.selectedColor, 
                i(".ifs-colorpicker-input-text", e.$container).val(e.selectedColor)), 
                0 < e.selectedColor.length ? (i(".ifs-colorpicker-input-color", e.$container).val(e.selectedColor), 
                i(".ifs-colorpicker-preview", e.$container).css({
                    background: e.selectedColor || ""
                })) : (i(".ifs-colorpicker-input-color", e.$container).val("#fff"), 
                i(".ifs-colorpicker-preview", e.$container).css({
                    background: ""
                }));
            },
            _setColorFromPreview: function(o) {
                this._selectColor(o.target.value);
            },
            _submit: function() {
                const o = s.get(this);
                o.$element ? o.$element.attr({
                    "data-color": o.selectedColor
                }).css({
                    background: o.selectedColor || ""
                }).trigger("color", o.selectedColor) : o.callback && "function" == typeof o.callback && o.callback.call(null, o.selectedColor), 
                this._close();
            },
            set: function(o, e, t) {
                const i = s.get(this);
                i.offset.top = t && t.top ? t.top : 0, i.offset.left = t && t.left ? t.left : 0, 
                o.data("colorpicker") || o.on("click", this._show.bind(this)), o.data({
                    colorpicker: !0
                }).attr({
                    "data-color": e || null
                }).css({
                    background: e || ""
                });
            },
            get: function(o) {
                if (o.data("colorpicker")) {
                    const e = o.attr("data-color");
                    return e ? e.toUpperCase() : null;
                }
                return null;
            }
        }, o;
    }();
    window.IFOLDERS = window.IFOLDERS || {}, window.IFOLDERS.PLUGINS = window.IFOLDERS.PLUGINS || {}, 
    window.IFOLDERS.PLUGINS.COLORPICKER = function(o, e, t) {
        return new c(o, e, t);
    };
}(jQuery);