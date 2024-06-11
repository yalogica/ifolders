!function(s) {
    "use strict";
    const f = {
        data: {
            deactivationUrl: null,
            $feedback: null
        },
        fn: {
            show: e => {
                f.globals = ifolders_feedback_globals, f.data.deactivationUrl = e, 
                f.data.$feedback = s("#ifs-feedback"), f.data.$feedback.addClass("ifs-active").css("display", ""), 
                f.data.$feedback.find(".ifs-fields").off().on("click", "input[type=radio]", f.fn.select), 
                f.data.$feedback.find(".ifs-close").off().on("click", f.fn.close), 
                f.data.$feedback.find(".ifs-btn.ifs-submit").off().on("click", f.fn.submit), 
                f.data.$feedback.find(".ifs-btn.ifs-skip").off().on("click", f.fn.skip);
            },
            select: e => {
                const a = s(e.target);
                f.data.$feedback.find(".ifs-fields input[type=text]").removeClass("ifs-active"), 
                a.closest(".ifs-field").find("input[type=text]").addClass("ifs-active");
            },
            close: () => {
                f.data.$feedback.removeClass("ifs-active");
            },
            deactivate: () => {
                f.fn.close(), window.location.href = f.data.deactivationUrl, s(document).off("click", "tr[data-slug='ifolders']");
            },
            skip: () => {
                f.fn.deactivate();
            },
            submit: () => {
                const e = f.data.$feedback.find(".ifs-fields input[type=radio]:checked");
                if (e.length) {
                    const i = e.closest(".ifs-field").find("input[type=text]");
                    var a = i.length ? i.val() : "", t = e.val(), t = JSON.stringify({
                        token: f.globals.token,
                        reason: t,
                        description: a
                    });
                    s.ajax({
                        url: f.globals.api.feedback_url,
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        data: t
                    }).always(() => {
                        f.fn.deactivate();
                    });
                } else f.fn.deactivate();
            }
        }
    };
    s(document).on("click", "tr[data-slug='ifolders']", e => {
        s(e.target).parent().hasClass("deactivate") && (e.preventDefault(), f.fn.show(e.target.href));
    });
}(jQuery);