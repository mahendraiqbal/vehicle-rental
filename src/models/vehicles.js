const db = require("../config/db");
const mysql = require("mysql");

const insertDataVehicles = (newBody, id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO vehicles SET ?`;

        newBody = {
            ...newBody,
            id,
        }     
        db.query(sqlQuery, newBody, (err, result) => {
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

const patchDataVehicles = (newBody, id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE vehicles SET ? WHERE id = ?`;
        db.query(sqlQuery, [newBody, id], (err, result) => {
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

const getByPriceId = (vehicleId) => {
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

        // logika buat where
        

        let type = "";
        if (query.type && query.type.toLowerCase() == "car") type = "car";
        if (query.type && query.type.toLowerCase() == "motorbike") type = "motorbike";
        if (query.type && query.type.toLowerCase() == "bicycle") type = "bicycle";
        if (type) {
            sqlQuery += " WHERE type = ?";
            statement.push(type);
        }

        let city = "";
        if (query.city && query.city.toLowerCase() == "temanggung") city = "Temanggung";
        if (query.city && query.city.toLowerCase() == "magelang") city = "Magelang";
        if (query.city && query.city.toLowerCase() == "parakan") city = "Parakan";
        if (query.city && query.city.toLowerCase() == "klaten") city = "Klaten";
        if (query.city && query.city.toLowerCase() == "yogyakarta") city = "Yogyakarta";
        if (query.city && query.city.toLowerCase() == "wonosobo") city = "Wonosobo";
        if (city) {
            sqlQuery += " AND city = ?";
            statement.push(city);
        }

        const order = query.order;
        let orderBy = "";
        if (query.by && query.by.toLowerCase() == "price") orderBy = "price";
        if (query.by && query.by.toLowerCase() == "city") orderBy = "city";
        if (query.by && query.by.toLowerCase() == "type") orderBy = "type";
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
                next: page == Math.ceil(count / limit) ? null : `/vehicles?type=${type}&city=${city}&by=${orderBy}&order=${order}&page=${page + 1}&limit=3`,
                prev: page == 1 ? null : `/vehicles?type=${type}&city=${city}&by=${orderBy}&order=${order}&page=${page - 1}&limit=3`,
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
    insertDataVehicles,
    deleteDataVehicles,
    patchDataVehicles,
    getByPriceId,
    paginatedVehicle,
};