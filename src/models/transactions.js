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
    const sqlQuery = `SELECT COUNT(transactions.vehicle_id) AS jumlah, vehicles.brand, vehicles.city, vehicles.image
FROM transactions
INNER JOIN vehicles ON transactions.vehicle_id = vehicles.id
GROUP BY vehicles.brand, vehicles.city, vehicles.image
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

module.exports = {
  getDataTransactions,
  insertDataTransactions,
  deleteDataTransactions,
  getPopularVehicle,
};
