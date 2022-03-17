const db = require("../config/db");
const mysql = require("mysql");

const insertDataVehicles = (newBody) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO vehicles SET ?`;

        newBody = {
            ...newBody,
            // id,
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
        const sqlQuery = `SELECT brand, name, price, type, city, images, id, capacity
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

const paginatedVehicle = (query, keyword) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM vehicles`;
        const statement = [];
        let data = "";
        let page = parseInt(query.page);
        let limit = parseInt(query.limit);
        let offset = "";

        // logika buat where
        

        let type = "";
        if (query.type && query.type.toLowerCase() == "car") type = "car";
        if (query.type && query.type.toLowerCase() == "motorbike") type = "motorbike";
        if (query.type && query.type.toLowerCase() == "bicycle") type = "bicycle";
        // if (type) {
        //     sqlQuery += " WHERE type = ?";
        //     statement.push(type);
        // }

        let city = "";
        if (query.city && query.city.toLowerCase() == "temanggung") city = "temanggung";
        if (query.city && query.city.toLowerCase() == "magelang") city = "magelang";
        if (query.city && query.city.toLowerCase() == "parakan") city = "parakan";
        if (query.city && query.city.toLowerCase() == "klaten") city = "klaten";
        if (query.city && query.city.toLowerCase() == "yogyakarta") city = "yogyakarta";
        if (query.city && query.city.toLowerCase() == "wonosobo") city = "wonosobo";
        // if (city) {
        //     sqlQuery += " AND city = ?";
        //     statement.push(city);
        // }

        if (type && city) {
            sqlQuery += ` WHERE type = ? AND city = ?`;
            statement.push(type, city);
            data += `&type=${type}&city=${city}`;
        } else if (type) {
            sqlQuery += ` WHERE type = ?`;
            statement.push(type);
            data += `&type=${type}`;
        } else if (city) {
            sqlQuery += ` WHERE city = ?`;
            statement.push(city);
            data += `&city=${city}`;
        }

        if (keyword) {
            sqlQuery += ` AND name LIKE ?`;
            statement.push(keyword);
            data += `&name=${query.name}`;
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

            // const page = parseInt(query.page);
            // const limit = parseInt(query.limit);
            const count = result[0].count;

            if (!query.page && !query.limit) {
                page = 1;
                limit = 1000;
                offset = 0;
                sqlQuery += " LIMIT ? OFFSET ?";
                statement.push(limit, offset);
            } else {
                sqlQuery += " LIMIT ? OFFSET ?";
                offset = (page - 1) * limit;
                statement.push(limit, offset);
            }

            const meta = {
                count,
                next:
                    page == Math.ceil(count / limit)
                    ? null
                    : `/vehicles?page=${page + 1}&limit=${limit}` + data,
                page:
                    page == 1 ? null : `/vehicles?page=${page -1}&limit=${limit}` + data,
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

const addFavorite = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err,
        });
      resolve({
        status: 200,
        result,
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
    addFavorite,
};