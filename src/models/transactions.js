const db = require("../config/db");

const getDataTransactions = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM transactions";
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

const insertDataTransactions = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO transactions SET ?`;
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

const deleteDataTransactions = (transaction_id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM transactions WHERE transaction_id = ${transaction_id}`;
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

const putDataTransactions = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE transactions SET ?`;
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

const getPopularVehicle = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT COUNT(transactions.vehicle_id) AS jumlah, vehicles.brand
FROM transactions
INNER JOIN vehicles ON transactions.vehicle_id = vehicles.vehicle_id
GROUP BY vehicles.brand
ORDER BY COUNT(transactions.vehicle_id) DESC
LIMIT 1`;
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({status: 500, err})
            resolve({status:200, result}) 
        });
    });
};

module.exports = {
    getDataTransactions,
    insertDataTransactions,
    deleteDataTransactions,
    putDataTransactions,
    getPopularVehicle,
}