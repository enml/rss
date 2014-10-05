APP.templates = (function () {
    'use strict';

    function application() {
        return '<header><h1 id="logo" ><span class="fa fa-soundcloud"></span><a href="#">资讯快读</a></h1><input type="search" id="search" placeholder="输入订阅网址"><span class="fa fa-refresh" id="refreshBtn"></span><span class="fa fa-search searchBtn"></header><div id="loading"><span id="loadText">正在加载内容</span></div><article id="body"></article>';
    }

    //    function home() {
    ////        return '<button id="refreshButton">刷新新闻</button><div id="titles"></div></div>';
    //
    //    }

    function articleList(articles) {
        var i, l, output = '';

        if (!articles.length) {
            APP.articlesController.synchronizeWithServer();
        }
        APP.templates.hideLoading();
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
        APP.templates.hideLoading();
        return '<h2>' + articles[0].title + '</h2><h3>作者：' + articles[0].author + ' ，发表日期：' + articles[0].date + '</h3>' + articles[0].body;
    }

    function articleLoading() {
        $("#loading").addClass("show");
    }

    function hideLoading() {
        $("#loading").removeClass("show");
    }

    return {
        application: application,
        articleList: articleList,
        article: article,
        articleLoading: articleLoading,
        hideLoading: hideLoading
    };
}());