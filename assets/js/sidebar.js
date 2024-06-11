!function(g) {
    "use strict";
    const h = {
        data: {
            media: !1,
            mediaBrowse: !1,
            modal: !1,
            hidden: !1,
            width: {
                current: 260,
                min: 260,
                max: 800
            },
            ui: {
                $container: null,
                $sidebar: null,
                $splitter: null,
                $toggle: null,
                $list: null,
                $tree: null,
                $mediaframe: null
            },
            uploader: {
                $container: null,
                instance: null,
                list: []
            },
            loader: {
                counter: 0,
                $spin: null,
                $lock: null,
                request: null
            },
            dragdrop: {
                $ghost: null,
                $target: null,
                items: null,
                isTouch: !1,
                timerId: null
            },
            splitter: {
                cursor: {
                    startWidth: 0,
                    start: 0,
                    prev: 0,
                    current: 0
                }
            },
            folder: {
                active: null,
                prev: null,
                copy: null
            },
            tree: null,
            filter: {
                timerId: null
            },
            click: {
                folder: null,
                timerId: null
            },
            contextmenu: {
                list: null
            }
        },
        fn: {
            run: () => {
                if (console.log("iFolders: version " + ifolders_sidebar_globals.data.version), 
                h.globals = ifolders_sidebar_globals, h.globals.data.type) if (h.notify = new IFOLDERS.PLUGINS.NOTIFY(), 
                h.colorpicker = new IFOLDERS.PLUGINS.COLORPICKER(), h.data.meta = g.extend({}, h.globals.data.meta), 
                h.data.ticket = h.globals.data.ticket, "attachment" == h.globals.data.type) {
                    var a = g("#view-switch-list").hasClass("current");
                    if (h.data.media = !(a || "undefined" == typeof wp || !wp.media || !wp.media.view), 
                    h.data.media) {
                        if ("function" == typeof wp.Uploader && g.extend(wp.Uploader.prototype, {
                            init: function() {
                                this.uploader && (h.data.uploader.instance = this.uploader, 
                                this.uploader.bind("FileFiltered", function(a, e) {
                                    e._folder = h.data.folder.active;
                                }), this.uploader.bind("FilesAdded", function(a, e) {
                                    for (const t of e) h.fn.uploader.addFile(t);
                                    h.fn.uploader.updateHeader(), h.fn.uploader.open();
                                }), this.uploader.bind("BeforeUpload", function(a, e) {
                                    if (e._folder) {
                                        const t = a.settings.multipart_params;
                                        a = parseInt(e._folder);
                                        0 < a ? t.folder = a : "folder" in t && delete t.folder;
                                    }
                                }), this.uploader.bind("UploadProgress", function(a, e) {}), 
                                this.uploader.bind("FileUploaded", function(a, e) {
                                    h.fn.uploader.completeFile(e);
                                }), this.uploader.bind("UploadComplete", function(a, e) {
                                    h.fn.uploader.complete();
                                }));
                            }
                        }), wp.media.view.AttachmentsBrowser) {
                            const e = wp.media.view.AttachmentsBrowser;
                            wp.media.view.AttachmentsBrowser = wp.media.view.AttachmentsBrowser.extend({
                                createToolbar: function() {
                                    h.data.attachmentsBrowser = this, h.data.mediaBrowse = !(!this.model.attributes.router || "browse" != this.model.attributes.router), 
                                    h.fn.updateMediaGridSort(), e.prototype.createToolbar.apply(this, arguments);
                                }
                            });
                        }
                        if (wp.media.view.MediaFrame.EditAttachments) {
                            const t = wp.media.view.MediaFrame.EditAttachments;
                            wp.media.view.MediaFrame.EditAttachments = wp.media.view.MediaFrame.EditAttachments.extend({
                                initialize: function() {
                                    h.data.editAttachments = this, t.prototype.initialize.apply(this, arguments);
                                },
                                updateMediaData: function() {
                                    const a = h.data.editAttachments;
                                    fetch(a.model.attributes.url, {
                                        cache: "reload",
                                        mode: "no-cors"
                                    }).then(() => {
                                        a.model.fetch().done(() => {
                                            a.rerender(a.model);
                                        });
                                    });
                                }
                            });
                        }
                    }
                    g("body").hasClass("upload-php") ? (h.fn.ajaxPrefilter(), h.fn.loadSidebar()) : h.data.media && wp.media.view.Modal && ((h.data.ticket || wp && wp.blocks) && h.fn.ajaxPrefilter(), 
                    wp.media.view.Modal.prototype.on("prepare", h.fn.onMediaModalPrepare), 
                    wp.media.view.Modal.prototype.on("open", h.fn.onMediaModalOpen), 
                    wp.media.view.Modal.prototype.on("close", h.fn.onMediaModalClose));
                } else h.fn.loadSidebar();
            },
            ajaxPrefilter: () => {
                g.ajaxPrefilter((a, e, t) => {
                    "POST" === e.type && e.data && "query-attachments" == e.data.action && h.data.mediaBrowse && (e.data = g.extend(e.data, {
                        ifolders_mode: "grid"
                    }), a.data = g.param(e.data));
                });
            },
            processData: (a, e, t = {}, d, o) => {
                const i = g.Deferred();
                d || h.fn.loading(!0, o);
                o = g.ajax({
                    url: h.globals.api.url + "/" + a,
                    type: "GET" == e ? "GET" : "POST",
                    cache: !1,
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "X-WP-Nonce": h.globals.api.nonce,
                        "X-HTTP-Method-Override": e
                    },
                    data: "GET" === e ? t : JSON.stringify(t)
                }).done(a => {
                    a && a.success ? i.resolve(a.data) : i.reject();
                }).fail(() => {
                    i.reject();
                }).always(() => {
                    d || h.fn.loading(!1);
                });
                return {
                    ...i.promise(),
                    abort: o.abort
                };
            },
            getData: (a, e = {}, t, d) => h.fn.processData(a, "GET", e, t, d),
            createData: (a, e = {}, t, d) => h.fn.processData(a, "POST", e, t, d),
            updateData: (a, e = {}, t, d) => h.fn.processData(a, "PUT", e, t, d),
            deleteData: (a, e = {}, t, d) => h.fn.processData(a, "DELETE", e, t, d),
            loadProposal: () => {
                h.data.hidden = "true" === Cookies.get("ifs-sidebar-hidden"), h.fn.prebuild(), 
                h.fn.updateWidth(), h.fn.getData("template", {
                    name: "proposal"
                }).done(a => {
                    h.fn.build(a, !0), g.when(h.fn.updateWidth()).done(() => {
                        h.fn.bind(!0), h.fn.ready();
                    });
                });
            },
            loadSidebar: () => {
                h.data.hidden = "true" === Cookies.get("ifs-sidebar-hidden"), h.fn.prebuild(), 
                h.fn.updateWidth(), g.when(h.fn.getData("contextmenu"), h.fn.getData("meta", {
                    type: h.globals.data.type
                }), h.fn.getData("template", {
                    name: "sidebar"
                })).done((a, e, t) => {
                    h.data.contextmenu.list = a, h.data.meta = e, h.fn.build(t), 
                    g.when(h.fn.updateWidth(), h.fn.updateFoldersData(), h.fn.updateFoldersAttachCount()).done(() => {
                        h.fn.updateNoticeAndSearch(), h.fn.activateFolder(h.data.meta.folder, !0, !0), 
                        h.fn.collapseFolders(h.data.meta.collapsed), h.fn.initAttachments(), 
                        h.fn.bind(), h.fn.ready();
                    });
                });
            },
            loading: (a, e) => {
                a ? (h.data.loader.counter++, h.data.loader.$spin.toggleClass("ifs-active", !0), 
                h.data.loader.$lock.toggleClass("ifs-active", !e)) : (h.data.loader.counter--, 
                h.data.loader.counter <= 0 && (h.data.loader.$spin.toggleClass("ifs-active", !1), 
                h.data.loader.$lock.toggleClass("ifs-active", !1), h.data.loader.counter = 0));
            },
            prebuild: () => {
                if (h.data.loader.$spin = g("<div>").addClass("ifs-spin"), h.data.loader.$lock = g("<div>").addClass("ifs-lock"), 
                h.data.ui.$container = g("<div>").addClass("ifs-container").toggleClass("ifs-hidden", h.data.hidden), 
                h.data.ui.$sidebar = g("<div>").addClass("ifs-sidebar").toggleClass("ifs-disable-tree-labels", h.globals.data.disable_counter).toggleClass("ifs-disable-search-bar", h.globals.data.disable_search_bar), 
                h.data.ui.$splitter = g("<div>").addClass("ifs-splitter"), h.data.ui.$toggle = g("<div>").addClass("ifs-toggle"), 
                h.data.ui.$list = g("<div>").addClass("ifs-list"), h.data.ui.$minitools = g("<div>").addClass("ifs-minitools"), 
                h.data.ui.$minitools.append(h.data.ui.$toggle, h.data.loader.$spin), 
                !h.data.modal) {
                    var a = g("#wpadminbar").height();
                    h.data.ui.$sidebar.css({
                        position: "sticky",
                        top: a + "px",
                        height: "calc(100% - 1px)",
                        width: h.data.width.current
                    });
                    const d = (() => {
                        for (const a of g("#wpbody .wrap")) if (!g(a).is(":empty")) return g(a);
                        return null;
                    })();
                    d.wrap(h.data.ui.$list), h.data.ui.$list = d.parent(), h.data.ui.$list.wrap(h.data.ui.$container).before(h.data.ui.$sidebar, h.data.ui.$splitter).append(h.data.ui.$minitools), 
                    h.data.ui.$container = h.data.ui.$sidebar.parent().addClass("ifs-screen-type");
                    var a = g("<div>").addClass("ifs-ph-toolbar"), e = g("<div>").addClass("ifs-ph-panel"), t = g("<div>").addClass("ifs-ph-panel-tree");
                    h.data.ui.$sidebar.append(a, e, t);
                }
            },
            build: (a, e) => {
                if (h.data.ui.$sidebar.empty().append(a).append(h.data.loader.$lock), 
                h.data.ui.$tree = h.data.ui.$sidebar.find("#ifs-tree"), e || (h.globals.data.default_color && document.documentElement.style.setProperty("--ifs-default-folder-color", h.globals.data.default_color), 
                h.globals.data.rights.c || h.data.ui.$sidebar.find("#ifs-btn-create").remove(), 
                "attachment" !== h.globals.data.type && h.data.ui.$sidebar.find("#ifs-btn-sort").remove(), 
                h.globals.data.rights.c || h.data.ui.$sidebar.find("#ifs-toolbar").remove()), 
                h.data.modal) {
                    const t = g('div[id^="__wp-uploader-id-"].supports-drag-drop:visible');
                    h.data.ui.$mediaframe = g(`#${t.attr("id")} .media-frame`), 
                    h.data.ui.$mediaframe.prepend(h.data.ui.$container.append(h.data.ui.$sidebar)), 
                    h.data.ui.$mediaframe.find(".media-frame-title").prepend(h.data.ui.$minitools), 
                    h.data.ui.$container.addClass("ifs-modal-type");
                }
                e || (a = {
                    callback: {
                        loading: h.fn.loading,
                        move: h.fn.moveFolders,
                        collapse: h.fn.collapseFolder
                    }
                }, h.data.tree = IFOLDERS.PLUGINS.TREE("#ifs-tree", a)), h.fn.uploader.build();
            },
            bind: a => {
                h.data.ui.$toggle.on("click", h.fn.onToggleContainer), h.data.ui.$splitter.on("mousedown", h.fn.onSplitterMouseDown), 
                a || (h.data.ui.$sidebar.find("#ifs-btn-create").on("click", h.fn.onFolderCreate), 
                h.data.ui.$sidebar.find("#ifs-btn-sort").on("click", h.fn.onFolderSort), 
                h.data.ui.$sidebar.find("#ifs-search-input").on("input", h.fn.onSearchInput), 
                h.data.ui.$sidebar.find("#ifs-search-clear").on("click", h.fn.onSearchClear), 
                h.data.ui.$sidebar.on("click", ".ifs-tree-item", h.fn.onFolderClick), 
                h.data.ui.$sidebar.on("dblclick", ".ifs-tree-item", h.fn.onFolderDblClick), 
                h.data.ui.$sidebar.on("contextmenu", ".ifs-tree-item", h.fn.onContextMenu), 
                g(document).ajaxComplete(h.fn.onAjaxComplete), "attachment" == h.globals.data.type && h.globals.data.media_hover_details && g(document).on("mouseover", ".attachment", h.fn.onShowMediaDetails));
            },
            ready: () => {
                h.data.ui.$sidebar.addClass("ifs-active"), h.data.ui.$splitter.addClass("ifs-active"), 
                h.data.ui.$toggle.addClass("ifs-active"), h.data.ui.$container.addClass("ifs-active"), 
                h.data.ui.$mediaframe && h.data.ui.$mediaframe.toggleClass("ifs-active", !h.data.hidden), 
                h.data.ui.$sidebar.find("#ifs-toolbar").addClass("ifs-active"), 
                h.data.ui.$sidebar.find("#ifs-panel").addClass("ifs-active");
            },
            updateMeta: a => {
                const e = h.data.tree.getFlatData();
                var t = e ? e.filter(a => a.collapsed).map(a => a.id) : null, t = {
                    folder: h.data.folder.active,
                    collapsed: t,
                    sort: h.data.meta.sort
                };
                return h.fn.updateData("meta", {
                    type: h.globals.data.type,
                    meta: t
                }, a, !0);
            },
            updateWidth: a => {
                a = (a = a || Cookies.get("ifs-sidebar-width")) || 0, a = Math.min(Math.max(a, h.data.width.min), h.data.width.max), 
                h.data.width.current = a, h.data.ui.$sidebar.css({
                    width: a
                });
            },
            updateNoticeAndSearch: () => {
                var a = h.globals.data.rights.c && !(h.data.tree && h.data.tree.hasItems());
                h.data.ui.$sidebar.find("#ifs-notice-create").toggleClass("ifs-active", a), 
                h.data.ui.$sidebar.find("#ifs-search").toggleClass("ifs-active", !a), 
                h.data.ui.$sidebar.find("#ifs-panel-tree").toggleClass("ifs-active", !a);
            },
            updateMediaGridSort: () => {
                if (h.data.mediaBrowse) {
                    const a = {
                        orderby: "date",
                        order: "DESC"
                    };
                    switch (h.data.meta.sort.items) {
                      case "name-asc":
                        a.orderby = "title", a.order = "ASC";
                        break;

                      case "name-desc":
                        a.orderby = "title", a.order = "DESC";
                        break;

                      case "date-asc":
                        a.orderby = "date", a.order = "ASC";
                        break;

                      case "date-desc":
                        a.orderby = "date", a.order = "DESC";
                        break;

                      case "mod-asc":
                        a.orderby = "modified", a.order = "ASC";
                        break;

                      case "mod-desc":
                        a.orderby = "modified", a.order = "DESC";
                        break;

                      case "author-asc":
                        a.orderby = "authorName", a.order = "ASC";
                        break;

                      case "author-desc":
                        a.orderby = "authorName", a.order = "DESC";
                    }
                    h.data.attachmentsBrowser && h.data.attachmentsBrowser.collection && h.data.attachmentsBrowser.collection.props.set({
                        orderby: a.orderby,
                        order: a.order
                    });
                }
            },
            updateMediaGridData: () => {
                h.fn.updateMediaGridSort(), h.data.attachmentsBrowser && h.data.attachmentsBrowser.collection && h.data.attachmentsBrowser.collection.props.set({
                    ignore: +new Date()
                });
            },
            updateListData: a => {
                const e = g.Deferred();
                h.fn.loading(!0, !0);
                a = g.ajax({
                    method: "GET",
                    url: a,
                    dataType: "html"
                }).done(a => {
                    e.resolve(a);
                }).fail(() => {
                    e.reject();
                }).always(() => {
                    h.fn.loading(!1);
                });
                return {
                    ...e.promise(),
                    abort: a.abort
                };
            },
            updateFoldersData: () => h.fn.getData("folders", {
                type: h.globals.data.type
            }).done(a => {
                for (const e of a) h.data.tree.addItem(e);
            }).fail(() => {
                h.notify.show(h.globals.msg.failed, "ifs-failed");
            }),
            updateFoldersAttachCount: a => {
                if (h.globals.data.disable_counter) {
                    const e = g.Deferred();
                    return e.resolve(), e.promise();
                }
                return h.fn.getData("attachment/counters", {
                    type: h.globals.data.type,
                    folders: a
                }).done(a => {
                    for (const e of a) h.data.tree.updateItemLabel(e.id, e.count), 
                    -1 != e.id && -2 != e.id || h.data.ui.$sidebar.find(`.ifs-tree-item[data-id='${e.id}'] .ifs-tree-label`).toggleClass("ifs-tree-active", 0 != e.count).text(e.count);
                });
            },
            reinitWordPressStuff: () => {
                if (window.inlineEditPost && window.inlineEditPost.init(), "plugins" === h.globals.data.type) {
                    const a = g("#updates-js");
                    a.length && a.remove().appendTo("head");
                }
            },
            initAttachments: () => {
                h.data.dragdrop.$ghost = g("<div>").addClass("ifs-attachment-drag-ghost"), 
                h.data.media ? h.globals.data.rights.a && g(".media-frame .media-frame-content").on("mousedown touchstart", ".attachment", h.fn.onAttachmentDown) : (h.data.ui.$list.toggleClass("ifs-can-attach", h.globals.data.rights.a), 
                h.globals.data.rights.a && g("#the-list").on("mousedown touchstart", ".check-column", h.fn.onAttachmentDown));
            },
            dropAttachments: (a, e) => {
                a && h.data.folder.active != a && e && e.length && h.fn.updateData("attach", {
                    type: h.globals.data.type,
                    folder: a,
                    attachments: e
                }).done(a => {
                    h.fn.updateFoldersAttachCount(a), h.fn.activateFolder(h.data.folder.active, !1, !0);
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            activateFolder: (a, e, t) => {
                h.data.folder.active == a && !t || (h.data.folder.prev = h.data.folder.active, 
                h.data.folder.active = a, h.data.ui.$sidebar.find(".ifs-tree-item.ifs-active").removeClass("ifs-active"), 
                h.data.ui.$sidebar.find(`.ifs-tree-item[data-id='${a}']`).addClass("ifs-active"), 
                e || (h.data.loader.request && h.data.loader.request.abort(), h.data.loader.request = h.fn.updateMeta(), 
                h.data.loader.request.done(() => {
                    var a;
                    h.data.media ? h.fn.updateMediaGridData() : (("string" == typeof (a = Url.queryString("paged")) || a instanceof String) && Url.updateSearchParam("paged", "1", !1), 
                    h.globals.data.disable_ajax ? window.location.reload() : (h.data.loader.request = h.fn.updateListData(location.href), 
                    h.data.loader.request.done(e => {
                        var a = (() => {
                            for (const a of g(e).find("#wpbody .wrap")) if (!g(a).is(":empty")) return g(a);
                            return null;
                        })();
                        a && (h.data.ui.$list.find(".wrap")[0].innerHTML = a[0].innerHTML, 
                        h.fn.initAttachments(), h.fn.reinitWordPressStuff());
                    }).fail(() => {
                        h.data.loader.request = null;
                    }).always(() => {
                        h.data.loader.request = null;
                    })));
                }).fail(() => {
                    h.data.loader.request = null;
                }).always(() => {})));
            },
            collapseFolders: a => {
                if (a && a.length) for (const e of a) h.data.tree.collapseItem(e, !0);
            },
            createFolders: (a, e, t) => {
                a && a.length && h.fn.createData("folders", {
                    type: h.globals.data.type,
                    names: a,
                    color: e,
                    parent: t
                }).done(a => {
                    for (const e of a) h.data.tree.addItem({
                        id: e.id,
                        title: e.title,
                        color: e.color
                    }, t);
                    h.fn.updateNoticeAndSearch();
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            renameFolder: (a, t) => {
                h.fn.updateData("folders", {
                    type: h.globals.data.type,
                    action: "rename",
                    folders: [ a ],
                    name: t
                }).done(a => {
                    for (const e of a) h.data.tree.updateItemTitle(e, t);
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            colorFolders: (a, t) => {
                a && a.length && h.fn.updateData("folders", {
                    type: h.globals.data.type,
                    action: "color",
                    folders: a,
                    color: t
                }).done(a => {
                    for (const e of a) h.data.tree.updateItemColor(e, t);
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            moveFolders: function(e, a, t, d, o, i) {
                const r = this;
                let s = [];
                switch (o) {
                  case "before":
                    (s = (s = JSON.parse(JSON.stringify(d))).filter(a => !e.includes(a))).splice(s.indexOf(t), 0, ...e);
                    break;

                  case "after":
                    (s = (s = JSON.parse(JSON.stringify(d))).filter(a => !e.includes(a))).splice(s.indexOf(t) + 1, 0, ...e);
                    break;

                  case "inside":
                    if (!h.data.ticket) return void h.notify.show(h.globals.msg.upgrade, "ifs-upgrade");
                    s = d.concat(e);
                }
                h.fn.updateData("folders", {
                    type: h.globals.data.type,
                    action: "move",
                    folders: e,
                    parent: a,
                    sorting: s
                }).done(a => {
                    i && "function" == typeof i && i.call(r, a, t, o);
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            collapseFolder: function() {
                h.data.loader.request && h.data.loader.request.abort(), h.data.loader.request = h.fn.updateMeta(!0), 
                h.data.loader.request.always(() => {
                    h.data.loader.request = null;
                });
            },
            copyFolders: (a, e) => {
                h.fn.createData("copyfolder", {
                    type: h.globals.data.type,
                    src: a,
                    dst: e
                }).done(a => {
                    for (const e of a) h.data.tree.addItem(e, e.parent);
                    h.fn.updateNoticeAndSearch();
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            deleteFolders: a => {
                a && a.length && h.fn.deleteData("folders", {
                    type: h.globals.data.type,
                    folders: a
                }).done(a => {
                    let e = !1;
                    for (const t of a) h.data.tree.removeItem(t), e || h.data.folder.active != t || (e = !0), 
                    h.data.folder.copy == t && (h.data.folder.copy = null);
                    h.fn.updateNoticeAndSearch(), h.fn.updateFoldersAttachCount(), 
                    h.data.folder.active < 0 ? h.fn.activateFolder(h.data.folder.active, !1, !0) : e && h.fn.activateFolder(-1);
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            downloadFolders: a => {
                a && a.length && h.fn.getData("folders/download/url", {
                    type: h.globals.data.type,
                    folders: a
                }).done(a => {
                    window.open(a, "_blank");
                }).fail(() => {
                    h.notify.show(h.globals.msg.failed, "ifs-failed");
                });
            },
            filterFolders: a => {
                clearTimeout(h.data.filter.timerId), h.data.filter.timerId = setTimeout(() => {
                    h.data.tree.filter(a);
                }, 500);
            },
            onToggleContainer: () => {
                h.data.hidden = !h.data.hidden, h.data.ui.$container.toggleClass("ifs-hidden", h.data.hidden), 
                h.data.ui.$mediaframe && h.data.ui.$mediaframe.toggleClass("ifs-active", !h.data.hidden), 
                Cookies.set("ifs-sidebar-hidden", h.data.hidden);
            },
            onSplitterMouseDown: a => {
                a.preventDefault(), a.stopImmediatePropagation(), h.data.splitter.cursor.startWidth = h.data.width.current, 
                h.data.splitter.cursor.start = h.data.splitter.prev = h.data.splitter.cursor.current = a.pageX, 
                g(window).on("mousemove", h.fn.onSplitterMouseMove), g(window).on("mouseup", h.fn.onSplitterMouseUp);
            },
            onSplitterMouseMove: a => {
                h.data.splitter.cursor.prev = h.data.splitter.cursor.current, h.data.splitter.cursor.current = a.pageX, 
                h.data.width.current = h.data.splitter.cursor.startWidth + (h.data.splitter.cursor.current - h.data.splitter.cursor.start), 
                Cookies.set("ifs-sidebar-width", h.data.width.current), h.fn.updateWidth(h.data.width.current);
            },
            onSplitterMouseUp: () => {
                g(window).off("mousemove", h.fn.onSplitterMouseMove), g(window).off("mouseup", h.fn.onSplitterMouseUp);
            },
            onFolderCreate: () => {
                if (h.globals.data.rights.c) {
                    const t = g("#ifs-form-create");
                    if (t.hasClass("ifs-active")) t.removeClass("ifs-active"); else {
                        g("#ifs-form-sort").removeClass("ifs-active");
                        const o = t.find("#ifs-folder-name"), i = t.find("#ifs-folder-parent"), r = t.find("#ifs-folder-color");
                        o.val(""), h.colorpicker.set(r, null), i.off().empty().append(g("<option>").val(0).text(h.globals.msg.parent_folder));
                        var a = h.data.tree.getFlatData();
                        for (const s in a) {
                            var e = a[s];
                            h.data.ticket ? i.append(g("<option>").val(e.id).html("&nbsp;&nbsp;".repeat(e.level) + e.title).prop("selected", e.id === h.data.folder.active)) : i.append(g("<option>").val(e.id).html("&nbsp;&nbsp;".repeat(e.level) + e.title));
                        }
                        function d() {
                            t.removeClass("ifs-active");
                        }
                        h.data.ticket || i.change(a => {
                            a.target.selectedIndex = 0, h.notify.show(h.globals.msg.upgrade, "ifs-upgrade");
                        }), t.off("click"), t.one("click", ".ifs-close", () => {
                            d();
                        }), t.one("click", ".ifs-submit", () => {
                            var a = o.val().split(",").map(a => a.trim()), e = i.val(), t = h.colorpicker.get(r);
                            h.fn.createFolders(a, t, e), d();
                        }), t.addClass("ifs-active");
                    }
                }
            },
            onFolderCreateBuiltin: e => {
                if (h.globals.data.rights.c) {
                    const o = h.data.ui.$tree.find(`.ifs-tree-item[data-id=${e}]`);
                    if (o.length) {
                        const i = g("<div>").addClass("ifs-tree-nodes"), r = g("<div>").addClass("ifs-tree-node"), s = g("<div>").addClass("ifs-tree-item ifs-tree-edited");
                        var a = g("<div>").addClass("ifs-tree-icon").append(h.data.tree.getIcon());
                        const l = g("<div>").addClass("ifs-tree-edit").attr({
                            id: "ifs-tree-edit"
                        }), n = g("<input>").addClass("ifs-tree-input").attr({
                            spellcheck: "false",
                            autocomplete: "off"
                        });
                        var t = g("<div>").addClass("ifs-tree-btn-enter");
                        function d() {
                            i.remove(), h.data.tree.toggleDragDrop(!0);
                        }
                        h.data.tree.toggleDragDrop(!1), o.parent().append(i.append(r.append(s.append(a, l.append(n, t))))), 
                        n.focus().val(h.globals.msg.new_folder).one("blur", () => {
                            d();
                        }).on("keyup", a => {
                            13 != a.keyCode && 27 != a.keyCode || (d(), 13 == a.keyCode && (a = n.val().split(",").map(a => a.trim()), 
                            h.fn.createFolders(a, null, e)));
                        });
                    }
                }
            },
            onFolderCopy: a => {
                h.data.folder.copy = a;
            },
            onFolderPaste: a => {
                null != h.data.folder.copy && h.fn.copyFolders(h.data.folder.copy, a);
            },
            onFolderDelete: a => {
                const e = g("<div>").addClass("ifs-modal"), t = g("#ifs-form-delete").clone();
                function d() {
                    e.remove();
                }
                t.off("click"), t.one("click", ".ifs-close", () => {
                    d();
                }), t.one("click", ".ifs-submit", () => {
                    h.fn.deleteFolders(a.map(a => a.id)), d();
                }), g("body").append(e.append(t)), setTimeout(() => {
                    e.addClass("ifs-active"), t.addClass("ifs-active");
                });
            },
            onFolderDownload: a => {
                h.fn.downloadFolders(a.map(a => a.id));
            },
            onFolderSort: () => {
                const d = g("#ifs-form-sort");
                if (d.hasClass("ifs-active")) d.removeClass("ifs-active"); else {
                    g("#ifs-form-create").removeClass("ifs-active");
                    let t = h.data.meta.sort.items;
                    t && d.find(`.ifs-sort-types [data="${t}"]`).addClass("ifs-active"), 
                    d.find(".ifs-sort-type").off().on("click", a => {
                        if (h.data.ticket) {
                            const e = g(a.target);
                            a = e.attr("data");
                            d.find(".ifs-sort-type").removeClass("ifs-active"), 
                            e.toggleClass("ifs-active", t !== a), t = t === a ? null : a, 
                            h.data.meta.sort.items !== t && (h.data.meta.sort.items = t, 
                            h.data.loader.request && h.data.loader.request.abort(), 
                            h.data.loader.request = h.fn.updateMeta(), h.data.loader.request.always(() => {
                                h.data.loader.request = null, h.fn.activateFolder(h.data.folder.active, !1, !0);
                            }));
                        } else h.notify.show(h.globals.msg.upgrade, "ifs-upgrade");
                    }), d.off("click"), d.one("click", ".ifs-close", () => {
                        d.removeClass("ifs-active");
                    }), d.addClass("ifs-active");
                }
            },
            onFolderClick: a => {
                if (clearTimeout(h.data.click.timerId), !a.shiftKey && !a.ctrlKey && !g(a.target).hasClass("ifs-tree-toggle") && 1 === a.detail) {
                    const e = g(a.currentTarget);
                    e.hasClass("ifs-tree-edited") || (h.data.click.folder = e.attr("data-id"), 
                    h.data.click.timerId = setTimeout(h.fn.onFolderClickAction, 300));
                }
            },
            onFolderClickAction: () => {
                h.data.click.timerId = null;
                var a = h.data.click.folder;
                -1 != a && -2 != a || h.data.tree.clearSelection(), h.fn.activateFolder(a);
            },
            onFolderDblClick: a => {
                if (h.globals.data.rights.e) {
                    a.preventDefault();
                    const t = g(a.currentTarget);
                    a = t.attr("data-id");
                    const d = h.data.tree.getItem(a);
                    if (d && !t.hasClass("ifs-tree-edited")) {
                        const o = g("<div>").addClass("ifs-tree-edit").attr({
                            id: "ifs-tree-edit"
                        }), i = g("<input>").addClass("ifs-tree-input").attr({
                            spellcheck: "false",
                            autocomplete: "off"
                        });
                        a = g("<div>").addClass("ifs-tree-btn-enter");
                        function e() {
                            o.remove(), t.removeClass("ifs-tree-edited"), h.data.tree.toggleDragDrop(!0);
                        }
                        h.data.tree.toggleDragDrop(!1), t.append(o.append(i, a)).addClass("ifs-tree-edited"), 
                        i.focus().val(d.title).one("blur", () => {
                            e();
                        }).on("keyup", a => {
                            13 != a.keyCode && 27 != a.keyCode || (e(), 13 == a.keyCode && (a = i.val(), 
                            t.find(".ifs-tree-title").text(a), h.fn.renameFolder(d.id, a)));
                        });
                    }
                }
            },
            onContextMenu: a => {
                if (h.globals.data.rights.c || h.globals.data.rights.e || h.globals.data.rights.d) {
                    const r = g(a.currentTarget), s = r.attr("data-id");
                    if (-1 != s && -2 != s) {
                        var e = h.data.tree.getItem(s);
                        e.state.selected || (h.data.tree.clearSelection(), h.data.tree.selectItem(s, !0)), 
                        a.preventDefault();
                        const l = h.data.tree.getSelectedItems(), n = g("<div>").addClass("ifs-contextmenu").attr({
                            tabindex: -1
                        }), f = g("body"), c = () => {
                            n.remove(), h.data.tree.clearSelection();
                        };
                        var t = a => {
                            h.fn.colorFolders(l.map(a => a.id), a), c();
                        };
                        for (const p of h.data.contextmenu.list) if (!(!h.globals.data.rights.c && "c" == p.right || !h.globals.data.rights.v && "v" == p.right || !h.globals.data.rights.e && "e" == p.right || !h.globals.data.rights.d && "d" == p.right || "attachment" !== h.globals.data.type && "download" == p.id)) {
                            const u = g("<div>").addClass("ifs-item").attr({
                                "data-id": p.id
                            });
                            var d = g("<div>").addClass("ifs-icon").html(p.icon), o = g("<div>").addClass("ifs-title").text(p.title);
                            switch (n.append(u.append(d, o)), p.id) {
                              case "create":
                                n.append(g("<div>").addClass("ifs-splitter"));
                                break;

                              case "color":
                                {
                                    const m = g("<div>").addClass("ifs-submenu");
                                    new IFOLDERS.PLUGINS.COLORPICKER(e.color, m, t);
                                    u.append(m), u.on("mouseover mouseout", a => {
                                        m.toggleClass("ifs-active", "mouseover" == a.type), 
                                        "mouseover" !== a.type && n.focus();
                                    });
                                }
                                break;

                              case "paste":
                                u.toggleClass("ifs-disabled", null == h.data.folder.copy);
                                break;

                              case "delete":
                                u.addClass("ifs-alert");
                            }
                        }
                        var i = (a = a.originalEvent).clientY, a = a.clientX;
                        n.css({
                            top: i,
                            left: a
                        }).on("blur", a => {
                            a.currentTarget.contains(a.relatedTarget) || c();
                        }).on("click", ".ifs-item", a => {
                            const e = g(a.target);
                            switch (e.data("id")) {
                              case "create":
                                h.data.ticket ? h.fn.onFolderCreateBuiltin(s) : h.notify.show(h.globals.msg.upgrade, "ifs-upgrade"), 
                                c();
                                break;

                              case "rename":
                                r.dblclick(), c();
                                break;

                              case "copy":
                                h.data.ticket ? h.fn.onFolderCopy(s) : h.notify.show(h.globals.msg.upgrade, "ifs-upgrade"), 
                                c();
                                break;

                              case "paste":
                                h.data.ticket ? h.fn.onFolderPaste(s) : h.notify.show(h.globals.msg.upgrade, "ifs-upgrade"), 
                                c();
                                break;

                              case "delete":
                                h.fn.onFolderDelete(l), c();
                                break;

                              case "download":
                                h.fn.onFolderDownload(l), c();
                            }
                        }), f.append(n), n.focus();
                    }
                }
            },
            onSearchInput: a => {
                h.fn.filterFolders(a.target.value);
            },
            onSearchClear: () => {
                g("#ifs-search-input").val(""), h.fn.filterFolders();
            },
            onAttachmentFolderEnter: a => {
                h.data.dragdrop.$target = g(a.currentTarget).addClass("ifs-droppable");
            },
            onAttachmentFolderLeave: () => {
                h.data.dragdrop.$target && h.data.dragdrop.$target.removeClass("ifs-droppable"), 
                h.data.dragdrop.$target = null;
            },
            onAttachmentFolderUnderPointer: a => {
                const e = g(document.elementFromPoint(a.originalEvent.touches[0].clientX, a.originalEvent.touches[0].clientY)), t = e.closest(".ifs-tree-item");
                h.data.dragdrop.$target && h.data.dragdrop.$target.removeClass("ifs-droppable"), 
                h.data.dragdrop.$target = null, t.length && (h.data.dragdrop.$target = t.addClass("ifs-droppable"));
            },
            onAttachmentDown: e => {
                var t = "touchstart" === e.type && e.originalEvent.touches && 1 == e.originalEvent.touches.length;
                if (1 === e.which || t) if (h.data.media) {
                    if (h.data.mediaBrowse) {
                        t || e.preventDefault(), t || e.stopImmediatePropagation();
                        const a = [];
                        g('.media-frame .media-frame-content .attachment[aria-checked="true"]').each(function() {
                            a.push(g(this).attr("data-id"));
                        }), 0 == a.length && a.push(g(e.currentTarget).attr("data-id")), 
                        a.length && (h.data.dragdrop.isTouch = t, h.data.dragdrop.items = a, 
                        h.data.dragdrop.$ghost.text("Move " + a.length + " items").appendTo("body"), 
                        t ? (document.addEventListener("touchmove", h.fn.onTouchMove, {
                            passive: !1
                        }), g(window).on("touchmove", h.fn.onAttachmentFolderUnderPointer), 
                        g(window).on("touchmove", h.fn.onAttachmentMove), g(window).on("touchend", h.fn.onAttachmentUp)) : (h.data.ui.$sidebar.on("mouseenter", ".ifs-tree-item", h.fn.onAttachmentFolderEnter), 
                        h.data.ui.$sidebar.on("mouseleave", ".ifs-tree-item", h.fn.onAttachmentFolderLeave), 
                        g(window).on("mousemove", h.fn.onAttachmentMove), g(window).on("mouseup", h.fn.onAttachmentUp)));
                    }
                } else {
                    t || e.preventDefault(), t || e.stopImmediatePropagation();
                    const d = [];
                    let a = "post";
                    switch (h.globals.data.type) {
                      case "attachment":
                        a = "media";
                        break;

                      case "users":
                        a = "users";
                        break;

                      case "plugins":
                        a = "checked";
                    }
                    g(`#the-list input[name='${a}[]']:checked`).each(function() {
                        d.push(g(this).val());
                    }), 0 == d.length && d.push(g(e.currentTarget).find("input").val()), 
                    d.length && (h.data.dragdrop.isTouch = t, h.data.dragdrop.items = d, 
                    h.data.dragdrop.$ghost.text("Move " + d.length + " items").appendTo("body"), 
                    t ? (document.addEventListener("touchmove", h.fn.onTouchMove, {
                        passive: !1
                    }), g(window).on("touchmove", h.fn.onAttachmentFolderUnderPointer), 
                    g(window).on("touchmove", h.fn.onAttachmentMove), g(window).on("touchend", h.fn.onAttachmentUp)) : (h.data.ui.$sidebar.on("mouseenter", ".ifs-tree-item", h.fn.onAttachmentFolderEnter), 
                    h.data.ui.$sidebar.on("mouseleave", ".ifs-tree-item", h.fn.onAttachmentFolderLeave), 
                    g(window).on("mousemove", h.fn.onAttachmentMove), g(window).on("mouseup", h.fn.onAttachmentUp)));
                }
            },
            onAttachmentMove: a => {
                h.data.dragdrop.items && h.data.dragdrop.items.length && (a = h.data.dragdrop.isTouch ? a.originalEvent.touches[0] : a, 
                h.data.dragdrop.$ghost.addClass("ifs-active").css({
                    top: a.clientY + 5 + "px",
                    left: a.clientX + 5 + "px"
                }));
            },
            onAttachmentUp: () => {
                var a = h.data.dragdrop.$target ? h.data.dragdrop.$target.attr("data-id") : null, e = h.data.dragdrop.items;
                h.data.dragdrop.$ghost.text("").removeClass("ifs-active").detach(), 
                h.data.dragdrop.$target && h.data.dragdrop.$target.removeClass("ifs-droppable"), 
                h.data.dragdrop.$target = null, h.data.dragdrop.items = null, clearTimeout(h.data.dragdrop.timerId), 
                h.data.dragdrop.timerId = null, h.data.dragdrop.isTouch ? (document.removeEventListener("touchmove", h.fn.onTouchMove, {
                    passive: !1
                }), g(window).off("touchmove", h.fn.onAttachmentFolderUnderPointer), 
                g(window).off("touchmove", h.fn.onAttachmentMove), g(window).off("touchend", h.fn.onAttachmentUp)) : (h.data.ui.$sidebar.off("mouseenter", ".ifs-tree-item", h.fn.onAttachmentFolderEnter), 
                h.data.ui.$sidebar.off("mouseleave", ".ifs-tree-item", h.fn.onAttachmentFolderLeave), 
                g(window).off("mousemove", h.fn.onAttachmentMove), g(window).off("mouseup", h.fn.onAttachmentUp)), 
                h.fn.dropAttachments(a, e);
            },
            onMediaModalPrepare: () => {},
            onMediaModalOpen: () => {
                h.data.modal || (h.data.modal = !0, h.data.ticket || wp && wp.blocks ? h.fn.loadSidebar() : h.fn.loadProposal());
            },
            onMediaModalClose: () => {
                h.data.modal = !1, h.data.ui.$container && h.data.ui.$container.remove(), 
                h.data.ui.$minitools && h.data.ui.$minitools.remove(), h.data.ui.$mediaframe && h.data.ui.$mediaframe.removeClass("ifs-active");
            },
            onAjaxComplete: (a, e, t) => {
                if (null != t.data && "string" == typeof t.data && -1 < t.data.indexOf("action=delete-post")) {
                    const d = h.data.tree.getFlatData();
                    t = d ? d.map(a => a.id) : null;
                    h.fn.activateFolder(h.data.folder.active, !1, !0), h.fn.updateFoldersAttachCount(t), 
                    h.fn.updateNoticeAndSearch();
                }
            },
            onShowMediaDetails: a => {
                const e = g(a.target);
                var t;
                e.hasClass("ifs-has-preview-details") || (a = e.attr("data-id")) && (t = window.wp.media.attachment(a)).attributes && t.attributes.preview_details && (e.addClass("ifs-has-preview-details"), 
                g(".attachment[data-id=" + a + "] .attachment-preview").prepend(t.attributes.preview_details));
            },
            onTouchMove: a => {
                a.preventDefault(), clearTimeout(h.data.dragdrop.timerId);
                a.touches[0].clientY < 30 ? h.data.dragdrop.timerId = setTimeout(h.fn.scroll.bind(null, -window.innerHeight / 5), 150) : a.touches[0].clientY > window.innerHeight - 30 && (h.data.dragdrop.timerId = setTimeout(h.fn.scroll.bind(null, window.innerHeight / 5), 150));
            },
            scroll: a => {
                window.scrollBy({
                    top: a,
                    behavior: "smooth"
                }), h.data.dragdrop.timerId = setTimeout(h.fn.scroll.bind(null, a), 150);
            },
            formatBytes: a => {
                let e = 0, t = parseInt(a, 10) || 0;
                for (;1024 <= t && ++e; ) t /= 1024;
                return t.toFixed(t < 10 && 0 < e ? 1 : 0) + " " + [ "bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ][e];
            },
            uploader: {
                build: () => {
                    h.data.uploader.$container = g("<div>").addClass("ifs-uploader"), 
                    h.data.uploader.$header = g("<div>").addClass("ifs-header").text("Upload"), 
                    h.data.uploader.$title = g("<div>").addClass("ifs-title"), h.data.uploader.$count = g("<div>").addClass("ifs-count"), 
                    h.data.uploader.$close = g("<div>").addClass("ifs-close").html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d=" M 7.734 6.281 L 6.328 7.688 L 10.609 11.969 L 6.266 16.313 L 7.672 17.719 L 12.016 13.375 L 16.328 17.688 L 17.734 16.281 L 13.422 11.969 L 17.672 7.719 L 16.266 6.313 L 12.016 10.563 L 7.734 6.281 Z "></path></svg>'), 
                    h.data.uploader.$data = g("<div>").addClass("ifs-data"), h.data.uploader.$container.append(h.data.uploader.$header.append(h.data.uploader.$title, h.data.uploader.$count, h.data.uploader.$close), h.data.uploader.$data), 
                    h.data.ui.$container.append(h.data.uploader.$container), h.data.uploader.$close.on("click", h.fn.uploader.close);
                },
                open: () => {
                    h.data.uploader.$container.addClass("ifs-active");
                },
                close: () => {
                    h.data.uploader.$container.removeClass("ifs-active"), h.data.uploader.$close.removeClass("ifs-active"), 
                    h.data.uploader.$data.empty(), h.data.uploader.list.filter(a => !a.loaded).length && (h.data.uploader.instance.stop(), 
                    h.fn.uploader.complete()), h.data.uploader.list = [];
                },
                complete: () => {
                    var a = h.data.uploader.list.map(a => a.folder).filter((a, e, t) => t.indexOf(a) == e);
                    h.fn.activateFolder(h.data.folder.active, !1, !0), h.fn.updateFoldersAttachCount(a), 
                    h.fn.updateNoticeAndSearch();
                },
                addFile: a => {
                    var e = {
                        id: a.id,
                        folder: a._folder,
                        loaded: !1
                    }, e = (h.data.uploader.list.push(e), h.data.tree.getItem(a._folder));
                    const t = g("<div>").addClass("ifs-item").attr({
                        "data-id": a.id
                    });
                    var d = g("<div>").addClass("ifs-title").text(a.name), a = g("<div>").addClass("ifs-info").text(h.fn.formatBytes(a.size) + (e ? " [" + e.title + "]" : ""));
                    h.data.uploader.$data.prepend(t.append(d, a));
                },
                completeFile: a => {
                    const e = h.data.uploader.$data.find(`.ifs-item[data-id="${a.id}"]`);
                    e.addClass("ifs-loaded");
                    for (const t of h.data.uploader.list) if (t.id === a.id) {
                        t.loaded = !0;
                        break;
                    }
                    h.fn.uploader.updateHeader();
                },
                updateHeader: () => {
                    var a = h.data.uploader.list.filter(a => a.loaded).length;
                    h.data.uploader.$count.text(a + " / " + h.data.uploader.list.length);
                }
            },
            replacemedia: {
                open: a => {
                    const e = {
                        data: {
                            $modal: g("<div>").addClass("ifs-modal"),
                            $form: g("#ifs-form-replace-media").clone(),
                            attachment: g(a).attr("data-attachment-id"),
                            file: null
                        },
                        fn: {
                            build: () => {
                                e.data.$fileDropZone = e.data.$form.find(".ifs-file-drop-zone"), 
                                e.data.$fileUpload = e.data.$form.find(".ifs-file-upload"), 
                                e.data.$imagePreview = e.data.$form.find(".ifs-image-preview"), 
                                e.data.$fileSelect = e.data.$form.find(".ifs-file-select"), 
                                e.data.$fileSubmit = e.data.$form.find(".ifs-btn.ifs-submit"), 
                                e.data.$loader = e.data.$form.find(".ifs-loader"), 
                                g("body").append(e.data.$modal.append(e.data.$form)), 
                                setTimeout(() => {
                                    e.data.$modal.addClass("ifs-active"), e.data.$form.addClass("ifs-active");
                                });
                            },
                            bind: () => {
                                e.data.$form.on("click", ".ifs-close", e.fn.close), 
                                e.data.$form.on("click", ".ifs-submit", e.fn.submit), 
                                e.data.$modal.on("dragenter dragover drop", () => !1), 
                                e.data.$fileUpload.on("change", e.fn.selectFile), 
                                e.data.$fileSelect.on("click", () => {
                                    e.data.$fileUpload.click();
                                }), new XMLHttpRequest().upload && (e.data.$fileDropZone.on("dragover dragleave", e.fn.dragHover), 
                                e.data.$fileDropZone.on("drop", e.fn.selectFile));
                            },
                            loading: a => {
                                e.data.$loader.toggleClass("ifs-active", a);
                            },
                            dragHover: a => (a.currentTarget.contains(a.relatedTarget) || e.data.$fileDropZone.toggleClass("ifs-hover", "dragover" === a.type), 
                            !1),
                            selectFile: a => {
                                e.data.file = null, e.data.$fileSubmit.addClass("ifs-hidden"), 
                                e.fn.dragHover(a);
                                var a = a.originalEvent.target.files || a.originalEvent.dataTransfer.files;
                                1 == a.length ? (a = a[0], /\.(?=gif|jpg|png|jpeg)/gi.test(a.name) ? (e.data.file = a, 
                                e.data.$fileDropZone.addClass("ifs-preview"), e.data.$imagePreview.get(0).src = URL.createObjectURL(e.data.file), 
                                e.data.$fileSubmit.removeClass("ifs-hidden")) : (e.data.$fileDropZone.removeClass("ifs-preview"), 
                                e.data.$fileDropZone.get(0).reset())) : h.notify.show(h.globals.msg.failed, "ifs-failed");
                            },
                            show: () => {
                                e.fn.build(), e.fn.bind();
                            },
                            close: () => {
                                e.data.$modal.remove();
                            },
                            submit: () => {
                                if (null != e.data.file) {
                                    const a = new FormData();
                                    a.append("file", e.data.file), a.append("attachment", e.data.attachment), 
                                    e.fn.loading(!0), g.ajax({
                                        url: h.globals.api.url + "/replace-media",
                                        type: "POST",
                                        data: a,
                                        processData: !1,
                                        contentType: !1,
                                        headers: {
                                            "X-WP-Nonce": h.globals.api.nonce
                                        }
                                    }).done(a => {
                                        a && a.success ? (e.fn.close(), h.notify.show(h.globals.msg.success, "ifs-success"), 
                                        h.fn.activateFolder(h.data.folder.active, !1, !0), 
                                        h.data.editAttachments && h.data.editAttachments.updateMediaData()) : h.notify.show(h.globals.msg.failed, "ifs-failed");
                                    }).fail(() => {
                                        h.notify.show(h.globals.msg.failed, "ifs-failed");
                                    }).always(() => {
                                        e.fn.loading(!1);
                                    });
                                }
                            }
                        }
                    };
                    e.fn.show();
                }
            }
        }
    };
    g(() => {
        h.fn.run();
    }), window.IFOLDERS = window.IFOLDERS || {}, window.IFOLDERS.APP = h;
}(jQuery);