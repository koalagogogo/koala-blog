'use strict'

const { resolve } = require('path');
const fs = require('fs');

const fsStat = path => new Promise((res, rej) => {
    fs.stat(path, (err, stat) => {
        if (err) {
            rej(err);
        }
        res(stat);
    })
})

const fsReaddir = path => new Promise((res, rej) => {
    fs.readdir(path, (err, stat) => {
        if (err) {
            rej(err);
        }
        res(stat);
    })
})

const traverse = async (path) => {
    if (!path) {
        throw new Error('path is required at traverse')
    }
    try {
        const stat = await fsStat(path);
        if (stat.isFile()) {
            require(path);
        } else {
            const pathList = await fsReaddir(path);
            pathList.forEach((pathName) => {
                const pathSub = resolve(path, pathName);
                traverse(pathSub);
            })
        }
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = traverse;
