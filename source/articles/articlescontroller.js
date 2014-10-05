APP.articlesController = (function () {
    'use strict';

    function showArticleList(id, successCallback) {
        APP.article.selectBasicArticles(function (articles) {
            $("#body").html(APP.templates.articleList(articles));
        });
    }

    function showArticle(id, successCallback) {
        APP.article.selectFullArticle(id, function (article) {
            $("#body").html(APP.templates.article(article));
        });
    }

    function synchronizeWithServer() {
        while ($(".getRss")[0]) {
            console.log(!!$(".getRss")[0])
            $(".getRss")[0].parentNode.removeChild($(".getRss")[0]);
        }
        var script = document.createElement("script"),
            urlText = $("#url").val();
        script.type = "text/javascript";
        script.className = "getRss";
        script.src = "http://ajax.googleapis.com/ajax/services/feed/load?q=" + "http://n.rss.qq.com/rss/tech_rss.php" + "&v=2.0&callback=feed&context=c&num=15";
        document.body.appendChild(script);
        APP.templates.articleLoading();
    }


    return {
        synchronizeWithServer: synchronizeWithServer,
        showArticleList: showArticleList,
        showArticle: showArticle,
//        getDataSuccess:getDataSuccess
    };
}());


var str = "hello";
str += " world!";