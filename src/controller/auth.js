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
                address: body.address,
                contact: body.contact,
                gender: body.gender,
                DoB: body.DoB,
                created_at: body.created_at,
            };
            responseHelper.success(res, status, objResponse);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

module.exports = {
    register
}