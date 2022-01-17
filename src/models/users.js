const db = require("../config/db");

const getDataUsers = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT name, email, address, contact, DoB ,gender, image FROM users";
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

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT email, address, contact, DoB, name FROM users WHERE users.id = "${id}"`
        db.query(sqlQuery, (err, result) => {
            if(err) return reject({
                status: 500,
                err
            })
            resolve({
                status: 200,
                result
            })
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

const patchDataUsers = (body, id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE users SET ? WHERE id = ?`;
        db.query(sqlQuery, [body, id], (err, result) => {
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

module.exports = {
    getDataUsers,
    deleteDataUsers,
    patchDataUsers,
    getUserById,
}