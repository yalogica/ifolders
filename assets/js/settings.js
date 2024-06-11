!function(o) {
    "use strict";
    const d = {
        clone: e => JSON.parse(JSON.stringify(e)),
        guid: () => ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16))
    }, a = {
        TABLE: {
            loading: !1,
            checked: !1,
            selected: null,
            items: [],
            view: {
                page: 1,
                perpage: 7,
                first: 0,
                last: 0,
                total: 0
            },
            order: {
                column: null,
                type: null
            }
        }
    }, n = {
        alight: null,
        scope: null,
        ui: {
            loader: {
                count: 0,
                timerId: null,
                $container: null
            },
            tabs: {
                items: [ "general", "permissions", "tools", "gopro" ],
                selected: 0,
                zindex: 4,
                fn: {
                    is: e => 0 <= n.ui.tabs.selected && n.ui.tabs.selected < n.ui.tabs.items.length && n.ui.tabs.items[n.ui.tabs.selected] == e,
                    click: (e, a) => {
                        n.ui.tabs.items[n.ui.tabs.selected] !== a && (o(e).css({
                            "z-index": n.ui.tabs.zindex++
                        }), n.ui.tabs.selected = n.ui.tabs.items.indexOf(a));
                    }
                }
            }
        },
        default: {
            config: {
                roles: [],
                token: null,
                default_color: null,
                disable_counter: !1,
                disable_ajax: !1,
                infinite_scrolling: !1,
                disable_search_bar: !1,
                replace_media: !1,
                uninstall_fully: !1,
                media_hover_details: !1,
                media_hover_details_list: []
            },
            securityprofiles: {
                profile: {
                    id: null,
                    owner: {
                        type: null,
                        id: null,
                        title: null
                    },
                    access_type: {
                        id: null,
                        title: null
                    },
                    actions: {
                        create: !1,
                        view: !0,
                        edit: !1,
                        delete: !1,
                        attach: !1
                    }
                }
            }
        },
        data: {
            ready: !1,
            roles: [],
            media_hover_details: [],
            config: null,
            ticket: null,
            foldertypes: d.clone(a.TABLE),
            securityprofiles: d.clone(a.TABLE),
            export: {
                filename: null,
                url: null
            },
            import: {
                file: null,
                clear: !1,
                attachments: !1,
                plugins: null
            }
        },
        modal: {
            $container: null,
            templates: {},
            fn: {
                show: (l, a, t) => {
                    function s(e, a, t) {
                        a.guid = a.guid || d.guid();
                        const s = o(e).attr({
                            "data-modal-name": l,
                            "data-modal-guid": a.guid
                        }), i = (n.modal.$container.append(s), feather.replace({
                            "stroke-width": 2,
                            width: 22,
                            height: 22
                        }), a.scope = n.alight(s.get(0), {
                            App: n,
                            Modal: a
                        }), o("body").addClass("ifs-modal-active"), this);
                        setTimeout(() => {
                            s.addClass("ifs-active"), t && t.call(i);
                        }, 100);
                    }
                    n.modal.templates[l] ? s(n.modal.templates[l], a, t) : n.fn.getData("template", {
                        name: l
                    }).done(e => {
                        n.modal.templates[l] = e, s(n.modal.templates[l], a, t);
                    }).fail(() => {
                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                    });
                },
                close: e => {
                    o(`[data-modal-guid='${e.guid}']`).removeClass("ifs-active").remove(), 
                    0 == o(".ifs-modals").children().length && o("body").removeClass("ifs-modal-active"), 
                    e.scope.destroy(), e.scope = null;
                }
            }
        },
        fn: {
            init: () => {
                n.notify = new IFOLDERS.PLUGINS.NOTIFY(), n.colorpicker = new IFOLDERS.PLUGINS.COLORPICKER();
                const e = o("#ifs-app-settings");
                e.removeAttr("style"), n.fn.initDefaults(), n.fn.build(), o.when(n.fn.config.load(), n.fn.ticket.load(), n.fn.foldertypes.load(), n.fn.securityprofiles.load()).done(() => {
                    e.addClass("ifs-active");
                }), feather.replace({
                    "stroke-width": 2,
                    width: 22,
                    height: 22
                });
            },
            initDefaults: () => {
                n.default.securityprofiles.profile.access_type = {
                    ...n.globals.data.accesstypes.commonfolders
                }, n.data.import.plugins = n.globals.data.plugins_to_import;
            },
            build: () => {
                n.ui.loader.$container = o("#ifs-loader"), n.modal.$container = o("<div>").addClass("ifs-modals").attr({
                    tabindex: -1
                }), o("body").append(n.modal.$container).addClass("ifs-app-settings-wrap");
            },
            loading: e => {
                n.ui.loader.count += e ? 1 : -1, n.ui.loader.count = n.ui.loader.count < 0 ? 0 : n.ui.loader.count, 
                clearTimeout(n.ui.loader.timerId), n.ui.loader.count ? n.ui.loader.$container.toggleClass("ifs-active", !0) : setTimeout(() => {
                    n.ui.loader.$container.toggleClass("ifs-active", !1);
                }, 300);
            },
            processData: (e, a, t = {}) => {
                const s = o.Deferred();
                n.fn.loading(!0);
                e = o.ajax({
                    url: n.globals.api.url + "/" + e,
                    type: "GET" == a ? "GET" : "POST",
                    cache: !1,
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "X-WP-Nonce": n.globals.api.nonce,
                        "X-HTTP-Method-Override": a
                    },
                    data: "GET" == a ? t : JSON.stringify(t)
                }).done(e => {
                    e && e.success ? s.resolve(e.data) : s.reject();
                }).fail(() => {
                    s.reject();
                }).always(() => {
                    n.fn.loading(!1);
                });
                return {
                    ...s.promise(),
                    abort: e.abort
                };
            },
            getData: (e, a = {}) => n.fn.processData(e, "GET", a),
            createData: (e, a = {}) => n.fn.processData(e, "POST", a),
            updateData: (e, a = {}) => n.fn.processData(e, "PUT", a),
            deleteData: (e, a = {}) => n.fn.processData(e, "DELETE", a),
            getTableView: (e, a) => {
                var t = e.view.page, s = e.view.perpage ? Math.ceil(a / e.view.perpage) : 1;
                return {
                    page: t,
                    pages: s,
                    prev: 1 < t ? t - 1 : null,
                    next: t < s ? t + 1 : null,
                    perpage: e.view.perpage,
                    first: (e.view.page - 1) * e.view.perpage + 1,
                    last: e.view.page * e.view.perpage - Math.max(e.view.perpage - e.items.length, 0),
                    total: a
                };
            },
            selectOne: (e, a, t, s) => {
                if (a) t.checked || (t.checked = a, (s || n.scope).scan()); else {
                    let e = !0;
                    for (const i in t.items) if (t.items[i].checked) {
                        e = !1;
                        break;
                    }
                    e && (t.checked = a, (s || n.scope).scan());
                }
            },
            selectAll: (e, a, t, s) => {
                for (const i in t.items) t.items[i].checked = a;
                (s || n.scope).scan();
            },
            config: {
                load: () => {
                    const l = o.Deferred();
                    return o.when(n.fn.getData("roles"), n.fn.getData("media-hover-details"), n.fn.getData("config")).done((e, a, t) => {
                        if (n.data.roles = e.items, n.data.media_hover_details = a.items, 
                        n.data.config = o.extend(!0, {}, n.default.config, t), n.data.config) for (var s in n.data.config) n.default.config.hasOwnProperty(s) || delete n.data.config[s];
                        n.scope.scan();
                        const i = o("#ifs-default-folder-color");
                        n.colorpicker.set(i, n.data.config.default_color, {
                            top: 6,
                            left: -4
                        }), i.on("color", n.fn.config.onColor), l.resolve();
                    }), {
                        ...l.promise()
                    };
                },
                onColor: (e, a) => {
                    n.data.config.default_color = a || null;
                },
                onColorClick: e => {
                    n.data.ticket || (n.notify.show(n.globals.msg.upgrade, "ifs-upgrade"), 
                    e.stopImmediatePropagation());
                },
                onAccessRoleChange: (e, a) => {
                    var t;
                    n.data.ticket ? (t = n.data.config.roles.indexOf(a.id), e.target.checked ? -1 == t && n.data.config.roles.push(a.id) : n.data.config.roles.splice(t, 1)) : (n.notify.show(n.globals.msg.upgrade, "ifs-upgrade"), 
                    a = o(e.target).prop("checked"), o(e.target).prop("checked", !a));
                },
                isAccessRoleChecked: e => -1 !== n.data.config.roles.indexOf(e.id),
                onMediaDetailsChange: (e, a) => {
                    var t = n.data.config.media_hover_details_list.indexOf(a.id);
                    e.target.checked ? -1 == t && n.data.config.media_hover_details_list.push(a.id) : n.data.config.media_hover_details_list.splice(t, 1);
                },
                isMediaDetailsChecked: e => -1 !== n.data.config.media_hover_details_list.indexOf(e.id),
                onCheckboxChange: e => {
                    n.data.ticket || (n.notify.show(n.globals.msg.upgrade, "ifs-upgrade"), 
                    e.preventDefault(), e.stopImmediatePropagation());
                },
                save: () => {
                    n.fn.loading(!0), n.fn.updateData("config", n.data.config).done(() => {
                        n.notify.show(n.globals.msg.success, "ifs-success");
                    }).fail(() => {
                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                    }).always(() => {
                        n.fn.loading(!1);
                    });
                }
            },
            ticket: {
                load: () => n.fn.getData("config").done(e => {
                    e && e.token ? (n.data.ticket = JSON.parse(atob(e.token)), n.data.ticket.supported_until = new Date(1e3 * n.data.ticket.supported_until).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })) : n.data.ticket = null, n.scope.scan();
                }),
                activate: () => {
                    if (/^([a-f0-9]{8})-(([a-f0-9]{4})-){3}([a-f0-9]{12})$/i.exec(o.trim(n.data.code))) {
                        const a = {
                            ...JSON.parse(atob(n.globals.data.token)),
                            code: n.data.code
                        };
                        var e = JSON.stringify({
                            action: "activate",
                            token: btoa(JSON.stringify(a))
                        });
                        n.fn.loading(!0), o.ajax({
                            url: n.globals.api.license_url,
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json",
                            data: e
                        }).done(e => {
                            e && e.success ? (n.data.config.token = btoa(JSON.stringify({
                                code: a.code,
                                supported_until: e.data.supported_until,
                                product: "iFolders Pro",
                                site: a.site
                            })), n.fn.loading(!0), n.fn.updateData("config", n.data.config).done(() => {
                                n.notify.show(n.globals.msg.success, "ifs-success"), 
                                n.fn.ticket.load();
                            }).fail(() => {
                                n.notify.show(n.globals.msg.status[407], "ifs-failed");
                            }).always(() => {
                                n.fn.loading(!1);
                            })) : e.status && n.globals.msg.status[e.status] ? n.notify.show(n.globals.msg.status[e.status], "ifs-failed") : n.notify.show(n.globals.msg.failed, "ifs-failed");
                        }).fail(() => {
                            n.notify.show(n.globals.msg.failed, "ifs-failed");
                        }).always(() => {
                            n.fn.loading(!1);
                        });
                    } else n.notify.show(n.globals.msg.status[404], "ifs-failed");
                },
                deactivate: () => {
                    var e;
                    n.data.ticket && n.data.ticket.code && (e = JSON.stringify({
                        action: "deactivate",
                        code: n.data.ticket.code
                    }), n.fn.loading(!0), o.ajax({
                        url: n.globals.api.license_url,
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        data: e
                    }).done(e => {
                        e && e.success ? (n.data.config.token = null, n.fn.loading(!0), 
                        n.fn.updateData("config", n.data.config).done(() => {
                            n.notify.show(n.globals.msg.success, "ifs-success"), 
                            n.fn.ticket.load();
                        }).fail(() => {
                            n.notify.show(n.globals.msg.failed, "ifs-failed");
                        }).always(() => {
                            n.fn.loading(!1);
                        })) : n.notify.show(n.globals.msg.failed, "ifs-failed");
                    }).fail(() => {
                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                    }).always(() => {
                        n.fn.loading(!1);
                    }));
                }
            },
            foldertypes: {
                load: a => {
                    function t() {
                        return n.data.foldertypes.loading = !0, n.scope.scan(), 
                        n.fn.getData("foldertypes", {
                            page: n.data.foldertypes.view.page,
                            perpage: n.data.foldertypes.view.perpage
                        }).done(e => {
                            n.data.foldertypes.items = e.items.map(e => ({
                                ...e,
                                checked: !1
                            })), n.data.foldertypes.view = n.fn.getTableView(n.data.foldertypes, e.total), 
                            n.data.foldertypes.checked = !1, n.data.foldertypes.selected = null, 
                            n.data.foldertypes.loading = !1, n.scope.scan();
                        });
                    }
                    return void 0 !== a ? n.fn.getData("foldertypes").done(e => {
                        a = Math.min(Math.max(a, 1), Math.ceil(e.total / n.data.foldertypes.view.perpage)), 
                        n.data.foldertypes.view.page = a, n.data.foldertypes.view.total = e.total, 
                        t();
                    }) : t();
                },
                prev: () => {
                    n.fn.foldertypes.load(n.data.foldertypes.view.prev);
                },
                next: () => {
                    n.fn.foldertypes.load(n.data.foldertypes.view.next);
                },
                isLock: e => !n.data.ticket && ![ "attachment", "users" ].includes(e.type),
                select: e => {
                    n.data.foldertypes.selected = n.data.foldertypes.selected !== e.id ? e.id : null;
                },
                dblclick: e => {
                    n.data.foldertypes.selected = e.id, n.fn.foldertypes.edit();
                },
                createEdit: t => {
                    n.data.foldertypes.loading = !0, n.fn.getData("securityprofiles/all").done(e => {
                        const a = {
                            data: {
                                item: t,
                                securityprofiles: {
                                    items: e.items,
                                    none: {
                                        id: null,
                                        title: null
                                    }
                                },
                                changed: !t.id
                            },
                            fn: {
                                load: () => {
                                    var e = a.data.securityprofiles.items.findIndex(e => e.id == a.data.item.security_profile.id);
                                    a.data.item.security_profile = 0 <= e ? a.data.securityprofiles.items[e] : a.data.securityprofiles.none, 
                                    a.scope.scan(), a.scope.watch("Modal.data.item", () => {
                                        a.data.changed = !0;
                                    });
                                },
                                loading: e => {
                                    a.loading = e, a.scope.scan();
                                },
                                close: () => {
                                    n.modal.fn.close(a);
                                },
                                submit: () => {
                                    a.fn.loading(!0), (a.data.item.id ? n.fn.updateData("foldertypes/" + a.data.item.id, a.data.item) : n.fn.createData("foldertypes", a.data.item)).done(() => {
                                        var e;
                                        a.data.item.id ? (e = n.data.foldertypes.items.findIndex(e => e.id == a.data.item.id), 
                                        n.data.foldertypes.items[e] = {
                                            ...a.data.item
                                        }, n.scope.scan()) : n.fn.foldertypes.load(), 
                                        n.notify.show(n.globals.msg.success, "ifs-success");
                                    }).fail(() => {
                                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                                    }).always(() => {
                                        a.fn.loading(!1), a.fn.close();
                                    });
                                }
                            }
                        };
                        n.modal.fn.show("modal-folder-type", a, a.fn.load);
                    }).always(() => {
                        n.data.foldertypes.loading = !1, n.scope.scan();
                    });
                },
                create: () => {
                    n.data.ticket ? n.fn.foldertypes.unregistered.popup(e => {
                        n.fn.foldertypes.createEdit({
                            id: null,
                            type: e.id,
                            title: e.title,
                            security_profile: {
                                id: n.globals.data.accesstypes.commonfolders.id,
                                title: n.globals.data.accesstypes.commonfolders.title
                            },
                            enabled: !0
                        });
                    }) : n.notify.show(n.globals.msg.upgrade, "ifs-upgrade");
                },
                edit: () => {
                    var e = n.data.foldertypes.items.findIndex(e => e.id == n.data.foldertypes.selected), e = n.data.foldertypes.items[e];
                    n.data.ticket || [ "attachment", "users" ].includes(e.type) ? (n.data.foldertypes.loading = !0, 
                    n.fn.getData("foldertypes/" + n.data.foldertypes.selected).done(e => {
                        n.fn.foldertypes.createEdit(e);
                    }).always(() => {
                        n.data.foldertypes.loading = !1, n.scope.scan();
                    })) : n.notify.show(n.globals.msg.upgrade, "ifs-upgrade");
                },
                delete: () => {
                    if (n.data.ticket) {
                        const e = n.data.foldertypes.items.filter(e => e.checked).map(e => e.id), a = {
                            data: {
                                count: e.length
                            },
                            fn: {
                                loading: e => {
                                    a.loading = e, a.scope.scan();
                                },
                                close: () => {
                                    n.modal.fn.close(a);
                                },
                                submit: () => {
                                    a.fn.loading(!0), n.fn.deleteData("foldertypes", {
                                        ids: e
                                    }).done(() => {
                                        n.notify.show(n.globals.msg.success, "ifs-success"), 
                                        n.fn.foldertypes.load();
                                    }).fail(() => {
                                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                                    }).always(() => {
                                        a.fn.loading(!1), n.modal.fn.close(a);
                                    });
                                }
                            }
                        };
                        e.length && n.modal.fn.show("modal-confirm-delete", a);
                    } else n.notify.show(n.globals.msg.upgrade, "ifs-upgrade");
                },
                unregistered: {
                    popup: e => {
                        const a = {
                            data: {
                                items: [],
                                selected: null
                            },
                            fn: {
                                load: () => {
                                    a.fn.loading(!0), a.request = n.fn.getData("foldertypes/unregistered").done(e => {
                                        a.data.items = e.items, a.scope.scan();
                                    }).always(() => {
                                        a.request = null, a.fn.loading(!1);
                                    });
                                },
                                loading: e => {
                                    a.loading = e, a.scope.scan();
                                },
                                close: () => {
                                    a.request && a.request.abort(), n.modal.fn.close(a);
                                },
                                submit: () => {
                                    e && e.call(this, a.data.selected), a.fn.close();
                                }
                            }
                        };
                        n.modal.fn.show("modal-select-folder-type", a, a.fn.load);
                    }
                }
            },
            securityprofiles: {
                load: a => {
                    function t() {
                        return n.data.securityprofiles.loading = !0, n.scope.scan(), 
                        n.fn.getData("securityprofiles", {
                            page: n.data.securityprofiles.view.page,
                            perpage: n.data.securityprofiles.view.perpage
                        }).done(e => {
                            n.data.securityprofiles.items = e.items.map(e => ({
                                ...e,
                                checked: !1
                            })), n.data.securityprofiles.view = n.fn.getTableView(n.data.securityprofiles, e.total), 
                            n.data.securityprofiles.checked = !1, n.data.securityprofiles.selected = null, 
                            n.data.securityprofiles.loading = !1, n.scope.scan();
                        });
                    }
                    return void 0 !== a ? n.fn.getData("securityprofiles").done(e => {
                        a = Math.min(Math.max(a, 1), Math.ceil(e.total / n.data.securityprofiles.view.perpage)), 
                        n.data.securityprofiles.view.page = a, n.data.securityprofiles.view.total = e.total, 
                        t();
                    }) : t();
                },
                prev: () => {
                    n.fn.securityprofiles.load(n.data.securityprofiles.view.prev);
                },
                next: () => {
                    n.fn.securityprofiles.load(n.data.securityprofiles.view.next);
                },
                isLock: e => !n.data.ticket,
                select: e => {
                    n.data.securityprofiles.selected = n.data.securityprofiles.selected !== e.id ? e.id : null;
                },
                dblclick: e => {
                    n.data.securityprofiles.selected = e.id, n.fn.securityprofiles.edit();
                },
                createEdit: e => {
                    const t = {
                        data: {
                            item: {
                                id: e.id,
                                title: e.title,
                                description: e.description,
                                rights: d.clone(a.TABLE)
                            },
                            changed: !e.id,
                            seed: 0
                        },
                        fn: {
                            load: () => {
                                t.data.item.rights.items = e.rights.map(e => ({
                                    ...e,
                                    checked: !1
                                })), t.data.item.rights.view = n.fn.getTableView(t.data.item.rights, t.data.item.rights.items.length), 
                                t.data.item.rights.checked = !1, t.data.item.rights.selected = null, 
                                t.data.item.rights.loading = !1, t.scope.scan(), 
                                t.scope.watch("Modal.data.item", () => {
                                    t.data.changed = !0;
                                });
                            },
                            loading: e => {
                                t.loading = e, t.scope.scan();
                            },
                            select: e => {
                                t.data.item.rights.selected = t.data.item.rights.selected !== e.id ? e.id : null;
                            },
                            dblclick: e => {
                                t.data.item.rights.selected = e.id, t.fn.edit();
                            },
                            createEdit: a => {
                                t.fn.loading(!0), n.fn.getData("securityprofiles/predefined").done(e => {
                                    n.fn.securityprofiles.rights.popup(a, e.items, t.data.item.rights.items, a => {
                                        var e;
                                        a.id ? (e = t.data.item.rights.items.findIndex(e => e.id == a.id), 
                                        t.data.item.rights.items[e] = a) : (a.id = --t.data.seed, 
                                        t.data.item.rights.items.push(a)), t.scope.scan();
                                    });
                                }).always(() => {
                                    t.fn.loading(!1);
                                });
                            },
                            create: () => {
                                var e = d.clone(n.default.securityprofiles.profile);
                                t.fn.createEdit(e);
                            },
                            edit: () => {
                                var e = t.data.item.rights.items.findIndex(e => e.id == t.data.item.rights.selected), e = d.clone(t.data.item.rights.items[e]);
                                t.fn.createEdit(e);
                            },
                            delete: () => {
                                const a = t.data.item.rights.items.filter(e => e.checked).map(e => e.id);
                                var e = t.data.item.rights.items.filter(e => !a.includes(e.id));
                                t.data.item.rights.items = e, t.data.item.rights.view = n.fn.getTableView(t.data.item.rights, t.data.item.rights.items.length), 
                                t.scope.scan();
                            },
                            close: () => {
                                n.modal.fn.close(t);
                            },
                            submit: () => {
                                const e = d.clone(t.data.item);
                                e.rights = e.rights.items.map(e => (delete e.checked, 
                                e)), t.fn.loading(!0), (t.data.item.id ? n.fn.updateData("securityprofiles/" + t.data.item.id, e) : n.fn.createData("securityprofiles", e)).done(() => {
                                    var e;
                                    t.data.item.id ? (e = n.data.securityprofiles.items.findIndex(e => e.id == t.data.item.id), 
                                    n.data.securityprofiles.items[e] = {
                                        ...t.data.item
                                    }, n.scope.scan()) : n.fn.securityprofiles.load(1), 
                                    n.notify.show(n.globals.msg.success, "ifs-success");
                                }).fail(() => {
                                    n.notify.show(n.globals.msg.failed, "ifs-failed");
                                }).always(() => {
                                    t.fn.loading(!1), t.fn.close();
                                });
                            }
                        }
                    };
                    n.modal.fn.show("modal-security-profile", t, t.fn.load);
                },
                create: () => {
                    n.data.ticket ? n.fn.securityprofiles.createEdit({
                        id: null,
                        title: null,
                        description: null,
                        rights: []
                    }) : n.notify.show(n.globals.msg.upgrade, "ifs-upgrade");
                },
                edit: () => {
                    [ "-1", "-2" ].includes(n.data.securityprofiles.selected) ? n.notify.show(n.globals.msg.builtin, "ifs-warning") : n.data.ticket ? (n.data.securityprofiles.loading = !0, 
                    n.fn.getData("securityprofiles/" + n.data.securityprofiles.selected).done(e => {
                        n.fn.securityprofiles.createEdit(e);
                    }).always(() => {
                        n.data.securityprofiles.loading = !1, n.scope.scan();
                    })) : n.notify.show(n.globals.msg.upgrade, "ifs-upgrade");
                },
                delete: () => {
                    if (n.data.ticket) {
                        const e = n.data.securityprofiles.items.filter(e => e.checked).map(e => e.id), a = {
                            data: {
                                count: e.length
                            },
                            fn: {
                                loading: e => {
                                    a.loading = e, a.scope.scan();
                                },
                                close: () => {
                                    n.modal.fn.close(a);
                                },
                                submit: () => {
                                    a.fn.loading(!0), n.fn.deleteData("securityprofiles", {
                                        ids: e
                                    }).done(() => {
                                        n.notify.show(n.globals.msg.success, "ifs-success"), 
                                        n.fn.securityprofiles.load(), n.fn.foldertypes.load();
                                    }).fail(() => {
                                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                                    }).always(() => {
                                        a.fn.loading(!1), n.modal.fn.close(a);
                                    });
                                }
                            }
                        };
                        e.length && n.modal.fn.show("modal-confirm-delete", a);
                    } else n.notify.show(n.globals.msg.upgrade, "ifs-upgrade");
                },
                rights: {
                    popup: (e, a, t, s) => {
                        const i = {
                            data: {
                                item: d.clone(e),
                                access_types: {
                                    items: a,
                                    none: {
                                        id: null,
                                        title: null
                                    }
                                },
                                changed: !e.id
                            },
                            fn: {
                                load: () => {
                                    var e = i.data.access_types.items.findIndex(e => e.id == i.data.item.access_type.id);
                                    i.data.item.access_type = 0 <= e ? i.data.access_types.items[e] : i.data.access_types.none, 
                                    i.scope.scan(), i.scope.watch("Modal.data.item", () => {
                                        i.data.changed = !0;
                                    });
                                },
                                loading: e => {
                                    i.loading = e, i.scope.scan();
                                },
                                selectUser: () => {
                                    var e = t.filter(e => "user" == e.owner.type).map(e => e.owner.id);
                                    n.fn.users.popup(e, e => {
                                        i.data.item.owner.type = e ? "user" : null, 
                                        i.data.item.owner.id = e ? e.id : null, 
                                        i.data.item.owner.title = e ? e.title : null, 
                                        i.scope.scan();
                                    });
                                },
                                selectRole: () => {
                                    var e = t.filter(e => "role" == e.owner.type).map(e => e.owner.id);
                                    n.fn.roles.popup(e, e => {
                                        i.data.item.owner.type = e ? "role" : null, 
                                        i.data.item.owner.id = e ? e.id : null, 
                                        i.data.item.owner.title = e ? e.title : null, 
                                        i.scope.scan();
                                    });
                                },
                                close: () => {
                                    n.modal.fn.close(i);
                                },
                                submit: () => {
                                    s && s.call(this, i.data.item), i.fn.close();
                                }
                            }
                        };
                        n.modal.fn.show("modal-security-profile-rights", i, i.fn.load);
                    }
                }
            },
            roles: {
                popup: (a, e) => {
                    const t = {
                        data: {
                            items: [],
                            selected: null
                        },
                        fn: {
                            load: () => {
                                t.fn.loading(!0), t.request = n.fn.getData("roles").done(e => {
                                    t.data.items = e.items.filter(e => !a.includes(e.id)), 
                                    t.scope.scan();
                                }).always(() => {
                                    t.request = null, t.fn.loading(!1);
                                });
                            },
                            loading: e => {
                                t.loading = e, t.scope.scan();
                            },
                            close: () => {
                                t.request && t.request.abort(), n.modal.fn.close(t);
                            },
                            submit: () => {
                                e && e.call(this, t.data.selected), t.fn.close();
                            }
                        }
                    };
                    n.modal.fn.show("modal-select-role", t, t.fn.load);
                }
            },
            users: {
                popup: (a, e) => {
                    const t = {
                        data: {
                            items: [],
                            selected: null
                        },
                        fn: {
                            load: () => {
                                t.fn.loading(!0), t.request = n.fn.getData("users").done(e => {
                                    t.data.items = e.items.filter(e => !a.includes(e.id)), 
                                    t.scope.scan();
                                }).always(() => {
                                    t.request = null, t.fn.loading(!1);
                                });
                            },
                            loading: e => {
                                t.loading = e, t.scope.scan();
                            },
                            close: () => {
                                t.request && t.request.abort(), n.modal.fn.close(t);
                            },
                            submit: () => {
                                e && e.call(this, t.data.selected), t.fn.close();
                            }
                        }
                    };
                    n.modal.fn.show("modal-select-user", t, t.fn.load);
                }
            },
            tools: {
                export: () => {
                    n.data.export.url = null, n.scope.scan(), n.fn.getData("export-csv").done(e => {
                        n.fn.tools.generateCSVFile(e), n.notify.show(n.globals.msg.success, "ifs-success");
                    });
                },
                generateCSVFile: e => {
                    e = e.map((a, e) => {
                        let t = "";
                        return 0 == e && (t += Object.keys(a).map(e => [ e ]).join(",") + "\n"), 
                        t += Object.keys(a).map(e => (Array.isArray(a[e]) && (a[e] = a[e].join("|")), 
                        [ a[e] ].join(",")));
                    }).join("\n"), e = new Blob([ e ], {
                        type: "text/csv;charset=utf-8;"
                    }), e = URL.createObjectURL(e);
                    const a = new Date();
                    var t = ("0" + a.getDate()).slice(-2) + "-" + ("0" + (a.getMonth() + 1)).slice(-2) + "-" + a.getFullYear();
                    n.data.export.filename = "ifolders-" + t + ".csv", n.data.export.url = e, 
                    n.scope.scan();
                },
                import: () => {
                    const e = new FormData();
                    e.append("file", n.data.import.file), e.append("clear", n.data.import.clear), 
                    e.append("attachments", n.data.import.attachments), n.fn.loading(!0), 
                    o.ajax({
                        url: n.globals.api.url + "/import-csv",
                        type: "POST",
                        data: e,
                        processData: !1,
                        contentType: !1,
                        headers: {
                            "X-WP-Nonce": n.globals.api.nonce
                        }
                    }).done(e => {
                        e && e.success ? n.notify.show(n.globals.msg.success, "ifs-success") : n.notify.show(n.globals.msg.failed, "ifs-failed");
                    }).fail(() => {
                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                    }).always(() => {
                        n.fn.loading(!1);
                    });
                },
                onFileToImportChange: e => {
                    n.data.import.file = e.files[0], n.scope.scan();
                },
                clear: () => {
                    const a = {
                        fn: {
                            loading: e => {
                                a.loading = e, a.scope.scan();
                            },
                            close: () => {
                                n.modal.fn.close(a);
                            },
                            submit: () => {
                                n.modal.fn.close(a), n.fn.updateData("uninstall").done(e => {
                                    n.notify.show(n.globals.msg.success, "ifs-success"), 
                                    window.location.replace(e);
                                }).fail(() => {
                                    n.notify.show(n.globals.msg.failed, "ifs-failed");
                                });
                            }
                        }
                    };
                    n.modal.fn.show("modal-confirm-clear-all", a);
                },
                importFromPlugin: a => {
                    const e = n.data.import.plugins.find(e => e.key == a);
                    e && !e.lock && (o(":focus").blur(), n.fn.loading(!0), n.fn.createData("import/" + e.key).done(() => {
                        n.notify.show(n.globals.msg.success, "ifs-success"), e.lock = !0, 
                        n.scope.scan();
                    }).fail(() => {
                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                    }).always(() => {
                        n.fn.loading(!1);
                    }));
                },
                recalculate: () => {
                    n.fn.updateData("attachment/counters").done(() => {
                        n.notify.show(n.globals.msg.success, "ifs-success");
                    }).fail(() => {
                        n.notify.show(n.globals.msg.failed, "ifs-failed");
                    });
                }
            }
        }
    };
    alight.directives.al.toggle = {
        restrict: "EA",
        link: function(t, e, a, s) {
            const i = o(e);
            i.addClass("ifs-toggle").html("&nbsp;"), i.on("click", function(e) {
                s.setValue(a, !s.getValue(a)), s.scan(), function() {
                    var e = i.data("callback");
                    if (e) {
                        const a = s.changeDetector.compile(e);
                        a(t);
                    }
                }();
            }), void 0 === s.getValue(a) && void 0 !== i.attr("data-default") && (e = i.data("default"), 
            s.setValue(a, e)), s.watch(a, function(e) {
                e ? i.addClass("ifs-checked").removeClass("ifs-unchecked") : i.removeClass("ifs-checked").addClass("ifs-unchecked");
            }, {
                readOnly: !0
            });
        }
    }, n.data.config = o.extend(!0, {}, n.default.config), n.globals = ifolders_settings_globals, 
    n.alight = alight, n.scope = alight(document.querySelectorAll("#ifs-app-settings")[0], {
        App: n
    }), n.fn.init();
}(jQuery);