APP.applicationController = (function () {
    'use strict';

    function offlineWarning() {
        alert("This feature is only available online.");
    }

    function pageNotFound() {
        alert("That page you were looking for cannot be found.");
    }

    /*    function showHome1() {
//        $("#body").html(APP.templates.home());

        // Load up the last cached copy of the news
        APP.articlesController.showArticleList();

        $('#refreshButton').click(function () {
            // If the user is offline, don't bother trying to synchronize
            if (navigator && navigator.onLine === false) {
                offlineWarning();
            } else {
                APP.articlesController.synchronizeWithServer(offlineWarning);
            }
        });
    }*/

    function showArticle(id) {
        $("#body").html(APP.templates.show($("#loading")));
        APP.articlesController.showArticle(id);
    }

    function route() {
        var page = window.location.hash;
        if (page) {
            page = page.substring(1);
            if (parseInt(page, 10) > 0) {
                showArticle(page);
            } else {
                pageNotFound();
            }
        } else {
            APP.articlesController.showArticleList();
        }
    }


    // This is to our webapp what main() is to C, $(document).ready is to jQuery, etc
    function start(resources, storeResources) {
        APP.database.open(function () {

            // Listen to the hash tag changing
            $(window).bind("hashchange", route);

            // Create app elements
            $("body").html(APP.templates.application());
            //listen event
            $('#refreshBtn').click(function () {
                // If the user is offline, don't bother trying to synchronize
                if (navigator && navigator.onLine === false) {
                    offlineWarning();
                } else {
                    APP.articlesController.synchronizeWithServer();
                }
            });
            $("#searchBtn").click(function () {
                APP.templates.show($("#form"));
            });
            $("#logo").click(function () {
                APP.templates.hide([$("#loading"), $("#form")]);
            });
            $("#submitBtn").click(function () {
                APP.templates.hide($("#form"));
                APP.articlesController.synchronizeWithServer();
            })
            // Remove our loading splash screen
            APP.templates.hide($("#loading"));

            route();
        });

        if (storeResources) {
            localStorage.resources = JSON.stringify(resources);
        }
    }

    return {
        start: start
    };
}());