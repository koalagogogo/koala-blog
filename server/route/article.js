"use strict";

const ArticleService = require("../service/article-service");
const moment = require("moment");

// 获取文章列表
Router.get("/api/article/list", async (ctx) => {
    try {
        const { pageNum = 1, pageSize = 10 } = ctx.params;
        let start = pageNum * pageSize - pageSize;
        let end = pageNum * pageSize + 1;
        const list = await ArticleService.getArticleList(start, end);
        // console.log(list, "啦啦啦");
        ctx.apiSuccess(list);
    } catch (err) {
        console.error(err);
    }
});
// 获取文章详情
Router.get("/api/article/:articleId", async (ctx) => {
    const { articleId = "" } = ctx.params;
    try {
        const article = await ArticleService.getArticleById(articleId);
        ctx.apiSuccess(article);
    } catch (err) {
        console.error(err);
    }
});

// 添加文章

Router.post("/api/article/add", async (ctx) => {
    const { body } = ctx.request;
    let params = {
        title: body.title,
        content: body.content,
        desc: body.desc,
        tagIds: body.tagIds,
        userId: 1,
        createDate: moment().format("yyyy-MM-dd"),
        updateDate: moment().format("yyyy-MM-dd")
    };
    try {
        const article = await ArticleService.addArticle(params);
        console.log(article);
        ctx.apiSuccess();
    } catch (err) {
        console.log(err);
    }
});

// 删除文章
Router.post("/api/article/delete", async (ctx) => {
    const { body } = ctx.request;
    let articleId = body.articleId;
    try {
        const article = await ArticleService.deleteArticleById(articleId);
        console.log(article);
        ctx.apiSuccess(isDelete);
    } catch (err) {
        console.log(err);
    }
});

// 根据 tagId获取文章列表