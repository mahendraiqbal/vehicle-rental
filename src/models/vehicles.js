const db = require("../config/db");

const getDataVehicles = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM vehicles";
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

const insertDataVehicles = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO vehicles SET ?`;
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

const deleteDataVehicles = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM vehicles WHERE id = ${id}`;
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

const putDataVehicles = (body, vehicleId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE vehicles SET ? WHERE vehicles.id = ${vehicleId}`;
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

const getByPriceVehicle = (vehicleId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT brand, name, price
        FROM vehicles 
        WHERE vehicles.id = "${vehicleId}"`
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

const sortVehicle = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT name, price, brand FROM vehicles ORDER BY price DESC";
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

module.exports = {
    getDataVehicles,
    insertDataVehicles,
    deleteDataVehicles,
    putDataVehicles,
    getByPriceVehicle,
    sortVehicle,
}