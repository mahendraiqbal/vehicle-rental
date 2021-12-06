// setup mysql
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "M@hendra.01",
    database: "vehicle_rental",
});

module.exports = db;