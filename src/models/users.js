const db = require("../config/db");

const getDataUsers = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM users";
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });
            resolve({
                status: 200,
                result
            })
        });
    });
};

const insertDataUsers = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO users SET ? `;
        db.query(sqlQuery, body, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });
            resolve({
                status: 200,
                result
            });
        });
    });
};

const deleteDataUsers = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM users WHERE id = ${id}`;
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });
            resolve({
                status: 200,
                result
            });
        });
    });
};

const putDataUsers = (body, usersId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE users SET ? WHERE users.id = ${usersId}`;
        db.query(sqlQuery, body, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            })
            resolve({
                status: 200,
                result
            });
        });
    });
};

const searchUserById = (usersId) => {
    return new Promise((resolve, reject) => {
        const user = `SELECT id, name, email, contact
        FROM users  
        WHERE users.id = ${usersId}`;
        db.query(user, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });
            if (result.length == 0) return resolve({
                status: 404,
                result
            });
            resolve({
                status: 200,
                result
            });
        });
    });
};

module.exports = {
    getDataUsers,
    insertDataUsers,
    deleteDataUsers,
    putDataUsers,
    searchUserById,
}