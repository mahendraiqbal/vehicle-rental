const db = require("../config/db");

const getDataTransactions = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM transactions";
    db.query(sqlQuery, (err, result) => {
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

const insertDataTransactions = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO transactions SET ?`;
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

const deleteDataTransactions = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM transactions WHERE id = ${id}`;
    db.query(sqlQuery, (err, result) => {
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

const getPopularVehicle = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT COUNT(transactions.vehicle_id) AS jumlah, vehicles.brand, vehicles.city, vehicles.images
FROM transactions
INNER JOIN vehicles ON transactions.vehicle_id = vehicles.id
GROUP BY vehicles.brand, vehicles.city, vehicles.images
ORDER BY COUNT(transactions.vehicle_id) DESC
LIMIT 4;`;
    db.query(sqlQuery, (err, result) => {
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

const getDataTransactionsById = (transactionId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `select transactions.payment_methods AS methods, transactions.return_date AS back, users.id AS user_id, vehicles.name AS Name_Vehicle, vehicles.price AS Vehicle_Price
from transactions
inner join users ON transactions.user_id = users.id
inner join vehicles ON transactions.vehicle_id = vehicles.id
where users.id = 6`;
        db.query(sqlQuery,transactionId, (err, result) => {
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

module.exports = {
  getDataTransactions,
  insertDataTransactions,
  deleteDataTransactions,
  getPopularVehicle,
  getDataTransactionsById,
};
