APP.articlesController = (function () {
    'use strict';

    function showArticleList(id, successCallback) {
        APP.article.selectBasicArticles(function (articles) {
            $("header").html(APP.templates.home());
            $("#body").html(APP.templates.articleList(articles));
        });
    }

    function showArticle(id, successCallback) {
        APP.article.selectFullArticle(id, function (article) {
            $("header").html(APP.templates.subPage());
            $("#body").html(APP.templates.article(article));
        });
    }

    function synchronizeWithServer() {
        var script = document.createElement("script"),
            urlText = $("#urlText").val();
        while ($(".getRss")[0]) {
            $(".getRss")[0].parentNode.removeChild($(".getRss")[0]);
        }
        script.type = "text/javascript";
        script.className = "getRss";
        script.src = "http://ajax.googleapis.com/ajax/services/feed/load?q=" + urlText + "&v=2.0&callback=feed&context=c&num=15";
        document.body.appendChild(script);
        APP.templates.show($("#loading"));
    }


    return {
        synchronizeWithServer: synchronizeWithServer,
        showArticleList: showArticleList,
        showArticle: showArticle
        //        getDataSuccess:getDataSuccess
    };
}());


var str = "hello";
str += " world!";