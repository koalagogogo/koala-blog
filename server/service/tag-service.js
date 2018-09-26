"use strict";
const DB = require("../utils/db");

const tableName = "tag";

const tagParams = ["tagId", "tagName"];

let getTagList = async () => {
    return await DB.select(tableName, tagParams);
};

let addTag = async (params) => {
    return await DB.insertData(tableName, params);
};

let updateTag = async (params, tagId) => {
    return await DB.updateData(tableName, params, tagId);
};

let deleteTagById = async (tagId) => {
    return await DB.deleteDataById(tableName, tagId);
};

module.exports = {
    getTagList,
    addTag,
    updateTag,
    deleteTagById
};