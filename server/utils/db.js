const mysql = require("mysql");
const config = require("../../config");
const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        let string = JSON.stringify(rows); 
                        let data = JSON.parse(string);
                        resolve(data);
                    }
                    connection.release();
                })
            }
        });
    });
};

let findDataById = (table, id) => {
    let _sql = "SELECT * FROM ?? WHERE id = ? ";
    return query(_sql, [table, id, start, end]);
};

let findDataByPage = (table, keys, start, end) => {
    let _sql = "SELECT ?? FROM ??  LIMIT ? , ?";
    return query(_sql, [keys, table, start, end]);
};

let insertData = (table, values) => {
    let _sql = "INSERT INTO ?? SET ?";
    return query(_sql, [table, values]);
};

let updateData = (table, values, id) => {
    let _sql = "UPDATE ?? SET ? WHERE id = ?";
    return query(_sql, [table, values, id]);
};

let deleteDataById = (table, id) => {
    let _sql = "DELETE FROM ?? WHERE id = ?";
    return query(_sql, [table, id]);
};

let select = (table, keys) => {
    let _sql = "SELECT ?? FROM ?? ";
    return query(_sql, [keys, table]);
};

module.exports = {
    query,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    select
};