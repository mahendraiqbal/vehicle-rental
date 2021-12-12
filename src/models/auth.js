const bcrypt = require("bcrypt");

const db = require("../config/db");

const createNewUser = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users SET ?"
        bcrypt
            .hash(body.password, 10)
            .then((hashedPassword) => {
                const bodyWithHashedPassword = {
                    ...body,
                    password: hashedPassword,
                };
                db.query(sqlQuery, [bodyWithHashedPassword], (err, result) => {
                    if (err) return reject({
                        status: 500,
                        err
                    });
                    resolve({
                        status: 201,
                        result,
                    });
                });
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });

};

module.exports = {
    createNewUser,
};