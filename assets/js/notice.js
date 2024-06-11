!function(o) {
    "use strict";
    if (ifolders_notice_globals) {
        const i = ifolders_notice_globals;
        o(document).on("click", "#ifolders-first-use-notification .notice-dismiss", () => {
            o.ajax({
                url: i.api.url + "/noticeoff",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                headers: {
                    "X-WP-Nonce": i.api.nonce
                }
            });
        });
    }
}(jQuery);