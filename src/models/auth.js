const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const createNewUser = (body) => {
    return new Promise((resolve, reject) => {
        // check email duplicate
        // const emailDuplicate = `SELECT email FROM users WHERE email = ${body.email}`
        // db.query(emailDuplicate, (err, result) => {
        //     if (err) return reject({ status: 500, err});
        //     if (result.length >= 1)
        //     return reject({ status: 400, err: "Email Dupplicated"})
        // })

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
                reject({
                    status: 500,
                    err
                });
            });
    });

};

const loginUser = (body) => {
    return new Promise((resolve, reject) => {
        const {
            email,
            password
        } = body;
        const sqlQuery = `SELECT * FROM users WHERE ? AND ?`
        db.query(sqlQuery, [{email}, {password}], (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });
            if (result.length == 0) return reject({
                status: 401,
                err: "Email/Password Salah"
            });
            const payload = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
            };
            const jwtOptions = {
                expiresIn: "10m",
                issuer: process.env.ISSUER,
            };
            jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
                // if (payload.role === 1) return 
                if (err) return reject({
                    status: 500,
                    err
                });
                resolve({
                    status: 200,
                    result: {
                        token,
                    },
                });
            });

        });
    });
};

module.exports = {
    createNewUser,
    loginUser,
};