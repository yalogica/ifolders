((e, r) => {
    "use strict";
    const t = e.i18n.__, s = e.blocks["registerBlockType"], a = e["serverSideRender"], {
        createElement: o,
        Component: i,
        Fragment: l
    } = e.element, {
        Panel: n,
        PanelBody: p,
        SelectControl: c,
        RangeControl: d
    } = e.components, u = e.blockEditor["InspectorControls"];
    class m extends i {
        constructor() {
            super(...arguments), this.state = {
                folders: [],
                imageSizes: []
            };
        }
        processData(e, t, s = {}) {
            const a = r.Deferred();
            e = r.ajax({
                url: iFoldersGalleryBlock.api.url + "/" + e,
                type: "GET" == t ? "GET" : "POST",
                cache: !1,
                dataType: "json",
                contentType: "application/json",
                headers: {
                    "X-WP-Nonce": iFoldersGalleryBlock.api.nonce,
                    "X-HTTP-Method-Override": t
                },
                data: "GET" === t ? s : JSON.stringify(s)
            }).done(e => {
                e && e.success ? a.resolve(e.data) : a.reject();
            }).fail(() => {
                a.reject();
            }).always(() => {});
            return {
                ...a.promise(),
                abort: e.abort
            };
        }
        getData(e, t = {}) {
            return this.processData(e, "GET", t);
        }
        componentDidMount() {
            this.getData("folders", {
                type: "attachment"
            }).done(e => {
                var t = [ {
                    value: "",
                    label: "None"
                } ];
                !function e(t, s, a) {
                    for (const r of t) a.push({
                        value: r.id,
                        label: "-".repeat(s) + (s ? " " : "") + r.title
                    }), r.items && r.items.length && e(r.items, s + 1, a);
                }(e, 0, t), this.setState({
                    folders: t
                });
            });
            const t = iFoldersGalleryBlock.data.imageSizes;
            this.setState({
                imageSizes: Object.keys(t).map(e => ({
                    value: e,
                    label: t[e]
                }))
            });
        }
        render() {
            return o(l, {}, o(u, {}, o(n, {}, o(p, {
                title: t("Gallery Settings"),
                initialOpen: !0
            }, o(c, {
                label: t("Folder"),
                value: this.props.attributes.folder,
                options: this.state.folders,
                onChange: e => {
                    this.props.setAttributes({
                        folder: e
                    });
                }
            }), o(d, {
                label: t("Columns"),
                value: this.props.attributes.columns,
                min: 1,
                max: 12,
                onChange: e => {
                    this.props.setAttributes({
                        columns: e
                    });
                }
            }), o(d, {
                label: t("Max Items"),
                value: this.props.attributes.max,
                min: 0,
                onChange: e => {
                    this.props.setAttributes({
                        max: e
                    });
                }
            }), o(c, {
                label: t("Image Size"),
                value: this.props.attributes.imageSize,
                options: this.state.imageSizes,
                onChange: e => {
                    this.props.setAttributes({
                        imageSize: e
                    });
                }
            })))), o(a, {
                block: "ifolders/image-gallery",
                attributes: this.props.attributes
            }));
        }
    }
    class h extends i {
        render() {
            return null;
        }
    }
    s("ifolders/image-gallery", {
        edit: m,
        save: h
    });
})(window.wp, window.jQuery);