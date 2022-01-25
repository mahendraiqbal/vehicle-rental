const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const createNewUser = (body) => {
    return new Promise((resolve, reject) => {
        // check email duplicate
        // const emailDuplicated = `SELECT email FROM users WHERE email = ${body.email}`
        // db.query(emailDuplicated, (err, result) => {
        //     if (err) return reject({
        //         status: 500,
        //         err
        //     });
        //     if (result.length >= 1)
        //         return reject({
        //             status: 400,
        //             err: "Email Duplicated"
        //         })
        // })

        const sqlQuery = "INSERT INTO users SET ?"
        bcrypt
            .hash(body.password, 10)
            .then((hashedPassword) => {
                const bodyWithHashedPassword = {
                    ...body,
                    password: hashedPassword,
                    roles_id: 1,
                };
                db.query(sqlQuery, [bodyWithHashedPassword], (err, result) => {
                    console.log(bodyWithHashedPassword)
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
            // id,
            email,
            password,
            // roles_id,
        } = body;
        // const { roles_id } = req.userInfo;
        const user = `SELECT * FROM users WHERE ?`
        db.query(user, [{
            email
        }], (err, result) => {
            // console.log(result[0].id);
            console.log(body.password);
            console.log(result[0].password);
            // var id = result[0].id;
            bcrypt.compare(body.password, result[0].password, (err, result) => {
                console.log(result);
            });
            const payload = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                roles_id: result[0].roles_id,
            };
            const jwtOptions = {
                expiresIn: "10m",
                issuer: process.env.ISSUER,
            };
            console.log(result);
            console.log(password);
            jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
                // if (payload.role === 1) return 
                // console.log(payload)
                if (err) return reject({
                    status: 500,
                    err
                });
                resolve({
                    status: 200,
                    result: {
                        token,
                        payload,
                    },
                });
            });
        })
    });
};

module.exports = {
    createNewUser,
    loginUser,
};