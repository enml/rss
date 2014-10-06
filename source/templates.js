APP.templates = (function () {
    'use strict';

    function home() {
        return '<a id="logo"  class="fa fa-moon-o" href="#">资讯</a><span class="fa fa-bars" id="barsBt" ></span>';
    }

    function subPage() {
        return '<a id="return" class="fa fa-angle-left" href="#">返回</a><a class="fa fa-bars" id="barsBt" ></a>';
    }


    function articleList(articles) {
        var i, l, output = '';

        if (!articles.length) {
            APP.articlesController.synchronizeWithServer();
        }
        APP.templates.hide([$("#loading"), $("#form")]);
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
        APP.templates.hide([$("#loading"), $("#form")]);
        return '<h2 id="articleTitle">' + articles[0].title + '</h2><div class="author">作者：' + articles[0].author + ' <br>发表日期：' + articles[0].date + '</div>' + articles[0].body;
    }

    function show(ele) {
        ele.addClass("show");
    }

    function hide(ele) {
        var i, len = ele.length;
        if (len > 1) {
            for (i = 0; i < len; i++) {
                ele[i].removeClass("show");
            }
        } else {
            ele.removeClass("show");
        }
    }


    return {
        home: home,
        subPage: subPage,
        articleList: articleList,
        article: article,
        show: show,
        hide: hide
    };
}());