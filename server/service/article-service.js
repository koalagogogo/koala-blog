"use strict";
const DB = require("../utils/db");

const tableName = "article";

const articleParams = ["id", "title", "desc", "content", "tagIds", "createDate", "updateDate", "status"];

let getArticleList = async (start, end) => {
    return await DB.findDataByPage(tableName, articleParams, start, end);
};

let getArticleById = async (articleId) => {
    return await DB.findDataById(tableName, articleId);
};

let addArticle = async (params) => {
    return await DB.insertData(tableName, params);
};

let updateArticle = async (params, articleId) => {
    return await DB.updateData(tableName, params, articleId);
};

let deleteArticleById = async (articleId) => {
    return await DB.deleteDataById(tableName, articleId);
};

module.exports = {
    getTagList,
    getArticleList,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticleById
};