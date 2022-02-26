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

    const sqlQuery = "INSERT INTO users SET ?";
    bcrypt
      .hash(body.password, 10)
      .then((hashedPassword) => {
        const bodyWithHashedPassword = {
          ...body,
          password: hashedPassword,
          roles_id: 1,
        };
        db.query(sqlQuery, [bodyWithHashedPassword], (err, result) => {
          console.log(bodyWithHashedPassword);
          if (err)
            return reject({
              status: 500,
              err,
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
          err,
        });
      });
  });
};

const loginUser = (body) => {
    return new Promise((resolve, reject) => {
        const { email, password } = body;
        const sqlQuery = `SELECT * FROM users WHERE ?`; //AND ?
        db.query(sqlQuery, { email }, (err, result) => { //, { password }]

            if (err) return reject({ status: 500, err });
            if (result.length == 0)
                return reject({ status: 401, err: "Wrong Email/Password" });

            bcrypt.compare(password, result[0].password, function(err) {
                if (err) return reject({ status: 500, err });
                const payload = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email,
                    roles_id:result[0].roles_id,
                    image: result[0].image,
                };
                console.log(payload)
                const jwtOptions = {
                    expiresIn: "10h",
                    issuer: process.env.ISSUER,
                }
                jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
                    if (err) return reject({ status: 500, err });
                    resolve({
                        status: 200,
                        result: {
                            token,
                            payload,
                        },
                    });
                });
            });

        });
    });
};

module.exports = {
  createNewUser,
  loginUser,
};
