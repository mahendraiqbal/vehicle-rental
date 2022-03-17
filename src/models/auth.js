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
                    expiresIn: "10d",
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

const logoutUser = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'INSERT INTO blacklist_token (token) VALUES (?)';

    db.query(sqlQuery, [token], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;

    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return reject({
          status: 401,
          result: { errMsg: "Invalid Email" },
        });

      const otp = Math.ceil(Math.random() * 1000000);
      console.log("OTP ", otp);

      const sqlQuery = `UPDATE users SET otp = ? WHERE email = ?`;
      db.query(sqlQuery, [otp, email], (err) => {
        if (err) return reject({ status: 500, err });
        const data = {
          email: email,
        };

        resolve({ status: 200, result: data });
      });
    });
  });
};

const checkOTP = (body) => {
  return new Promise((resolve, reject) => {
    const { email, otp } = body;
    const sqlQuery = `SELECT email, otp FROM users WHERE email = ? AND otp = ?`;

    db.query(sqlQuery, [email, otp], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length === 0)
        return reject({ status: 401, err: "Invalid OTP" });
      const data = {
        email: email,
      };
      resolve({ status: 200, result: data });
    });
  });
};

module.exports = {
  createNewUser,
  loginUser,
  logoutUser,
  forgotPassword,
  checkOTP,
};
