const authModel = require("../models/auth");
const responseHelper = require("../helpers/responseHelper");

const register = (req, res) => {
    const {
        body
    } = req;
    authModel.createNewUser(body)
        .then(({ status, result }) => {
            const objResponse = {
                id: result.insertId,
                name: body.name,
                email: body.email,
            };
            responseHelper.success(res, status, objResponse);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const login = (req, res) => {
    const { body } = req;
    // const { roles_id } = req.userInfo;
    authModel
    .loginUser(body)
    .then(({status, result}) => {
        responseHelper.success(res, status, result)
    })
    .catch(({status, err}) => {
        responseHelper.error(res, status, err)
    });
};

const logout = (req, res) => {
    const token = req.header("x-access-token");
    authModel
        .logout(token)
        .then(({ status }) => {
            return responseHelper.success(res, status, {
                msg: "Success"
            });
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

module.exports = {
    register,
    login,
    logout,
};