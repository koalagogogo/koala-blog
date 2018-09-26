"use strict";

const TagService = require("../service/tag-service");
// 获取所有tag
Router.get("/api/tag/list", async (ctx) => {
    try {
        const list = await TagService.getTagList();
        ctx.apiSuccess(list);
    } catch (err) {
        console.error(err);
    }
});

// 添加tag

Router.post("/api/tag/add", async (ctx) => {
    const { body } = ctx.request;
    let params = {
        tagName: body.tagName
    };
    try {
        const tag = await TagService.addTag(params);
        console.log(tag);
        ctx.apiSuccess();
    } catch (err) {
        console.log(err);
    }
});

// 删除tag
Router.post("/api/tag/delete", async (ctx) => {
    const { body } = ctx.request;
    let tagId = body.tagId;
    try {
        const tag = await TagService.deleteTagById(tagId);
        console.log(tag);
        ctx.apiSuccess(tag);
    } catch (err) {
        console.log(err);
    }
});