APP.templates = (function () {
    'use strict';

    function application() {
        return '<header><h1 id="logo" ><span class="fa fa-moon-o"></span><a href="#">资讯</a></h1><span class="fa fa-refresh" id="refreshBtn"></span><span class="fa fa-search" id="searchBtn"></header><div class="container"><div id="loading"><span id="loadText">正在加载内容</span></div><div id="form"><input type="search" id="urlText" value="http://n.rss.qq.com/rss/tech_rss.php"><input type="button" value="订阅" id="submitBtn"></div></div><article id="body"></article>';
    }


    function articleList(articles) {
        var i, l, output = '';

        if (!articles.length) {
            APP.articlesController.synchronizeWithServer();
        }
        APP.templates.hide([$("#loading"),$("#form")]);
        for (i = 0, l = articles.length; i < l; i = i + 1) {
            output = output + '<li><h2><a href="#' + articles[i].id + '" data-transition="flow">' + articles[i].title + '</a></h2>' +
                '<p class="byline">作者：<strong>' + articles[i].author + '</strong> ，发表日期：' + articles[i].date + '</p></li>';
        }
        return '<ul>' + output + '</ul>';
    }

    function article(articles) {

        // If the data is not in the right form, redirect to an error
        if (!articles[0]) {
            window.location = '#error';
        }
        APP.templates.hide([$("#loading"),$("#form")]);
        return '<h2 id="articleTitle">' + articles[0].title + '</h2><div class="author">作者：' + articles[0].author + ' <br>发表日期：' + articles[0].date + '</div>' + articles[0].body;
    }

    function show(ele) {
        ele.addClass("show");
    }

    function hide(ele) {
        if (ele.length > 1) {
            for (var i = 0, len = ele.length; i < len; i++) {
                ele[i].removeClass("show");
            }
        } else {
            ele.removeClass("show");
        }
    }


    return {
        application: application,
        articleList: articleList,
        article: article,
        show: show,
        hide: hide
    };
}());