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
        const sqlQuery = `INSERT INTO users SET ?`;
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

const deleteDataUsers = (id_user) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM users WHERE id_user = ${id_user}`;
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

const putDataUsers = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE users SET ?`;
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

const patchDataUsers = (name, email, password, address, gender, birth_of_date, id_user) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE users SET name = '${name}', email = '${email}', password = '${password}', address = '${address}', gender = '${gender}', birth_of_date = '${birth_of_date}' WHERE id_user = ${id_user}`;
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err});
            resolve({ status: 200, result});
        });
    });
};

const searchUserById = (id_user) => {
    return new Promise((resolve, reject) => {
        const user = `SELECT * FROM users WHERE id_user = ${id_user}`;
    db.query(user, (err, result) => {
        if (err) return reject({ status: 500, err })
        resolve({ status: 200, result });
    });
    });
};

module.exports = {
    getDataUsers,
    insertDataUsers,
    deleteDataUsers,
    putDataUsers,
    patchDataUsers,
    searchUserById,
}