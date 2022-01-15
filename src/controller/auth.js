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
    authModel
    .loginUser(body)
    .then(({status, result}) => {
        responseHelper.success(res, status, result={
            ...body,
            roles_id: 1,
            result,
        })
    })
    .catch(({status, err}) => {
        responseHelper.error(res, status, err)
    });
};

module.exports = {
    register,
    login,
};