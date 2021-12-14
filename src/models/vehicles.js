const db = require("../config/db");
const mysql = require("mysql");

// const getDataVehicles = () => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = "SELECT * FROM vehicles";
//         db.query(sqlQuery, (err, result) => {
//             if (err) return reject({
//                 status: 500,
//                 err
//             });
//             resolve({
//                 status: 200,
//                 result
//             });
//         });
//     });
// };

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

const paginatedVehicle = (query) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM vehicles`;
        const statement = [];

        const search = query.search;
        if (query.search) {
            sqlQuery += " WHERE type LIKE ?";
            statement.push(mysql.raw(search));
        }

        const filter = query.filter;
        if (query.filter) {
            sqlQuery += " AND price = ?"
            statement.push(filter);
        }

        const order = query.order;
        let orderBy = "";
        if (query.by.toLowerCase() == "price") orderBy = "price";
        if (query.by.toLowerCase() == "city") orderBy = "city";
        if (query.by.toLowerCase() == "type") orderBy = "type";
        if (order && orderBy) {
            sqlQuery += " ORDER BY ? ?";
            statement.push(mysql.raw(orderBy), mysql.raw(order));
        }


        const countQuery = `SELECT COUNT(*) AS "count" from vehicles`;
        db.query(countQuery, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });

            const page = parseInt(query.page);
            const limit = parseInt(query.limit);
            const count = result[0].count;
            if (query.page && query.limit) {
                sqlQuery += " LIMIT ? OFFSET ?";
                const offset = (page - 1) * limit;
                statement.push(limit, offset);
            }
            const meta = {
                next: page == Math.ceil(count / limit) ? null : `/vehicles?by=price&order=asc&page=${page + 1}&limit=3`,
                prev: page == 1 ? null : `/vehicles?by=price&order=asc&page=${page - 1}&limit=3`,
                count: result[0].count,
            };

            db.query(sqlQuery, statement, (err, result) => {
                if (err) return reject({
                    status: 500,
                    err
                });
                resolve({
                    status: 200,
                    result: {
                        data: result,
                        meta
                    }
                });
            });
        });
    });
};

module.exports = {
    // getDataVehicles,
    insertDataVehicles,
    deleteDataVehicles,
    putDataVehicles,
    getByPriceVehicle,
    paginatedVehicle,
};