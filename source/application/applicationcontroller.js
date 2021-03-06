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
        //        $("#body").html(APP.templates.show($("#loading")));
        APP.templates.show($("#loading"));
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
            $("header").html(APP.templates.home());
            $("header").on("click", "#logo,#return", function (e) {//传入的目标事件不需要$("#logo"),直接#logo就行
                $("#mask").css("display", "none");
                APP.templates.hide([$("#loading"), $("#form")]);
            }).on("click","#barsBt",function(){
                $("#mask").css("display", "block")
            })
            //listen event
            $('#refreshBtn').click(function () {
                $("#mask").css("display", "none");
                // If the user is offline, don't bother trying to synchronize
                if (navigator && navigator.onLine === false) {
                    offlineWarning();
                } else {
                    APP.articlesController.synchronizeWithServer();
                }
            });
        
            $("#searchBtn").click(function () {
                $("#mask").css("display", "none");
                APP.templates.show($("#form"));
            });

            $("#submitBtn").click(function () {
                APP.templates.hide($("#form"));
                APP.articlesController.synchronizeWithServer();
            });
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