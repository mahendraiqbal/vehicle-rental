const usersModel = require("../models/users");
const responseHelper = require("../helpers/responseHelper");

const getDataUsers = (req, res) => {
    const { userInfo } = req;
    console.log("[DEBUG] userInfo", userInfo)
    usersModel
        .getDataUsers()
        .then(({
            status,
            result
        }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({
            status,
            err
        }) => {
            responseHelper.error(res, status, err);
        });
};

const insertDataUsers = (req, res) => {
    const {
        body,
    } = req;
    usersModel
        .insertDataUsers(body)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result: {
                    name: body.name,
                    email: body.email,
                    address: body.address,
                    contact: body.contact,
                    gender: body.gender,
                    id: result.insertId,
                    url: req.file,
                },
            });
        })
        .catch(({
            status,
            err
        }) => {
            responseHelper.error(res, status, err);
        });
};

const deleteDataUsers = (req, res) => {
    const {
        body: {
            id,
        },
    } = req;

    usersModel.deleteDataUsers(id)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "User Telah Dihapus",
                id: result.insertId,
            });
        })
        .catch(({
            status,
            err
        }) => {
            responseHelper.error(res, status, err);
        });
};

const patchDataUsers = (req, res) => {
    const { params, body } = req;
    const usersId = params.id;
    usersModel.patchDataUsers(body, usersId)
        .then(({
            status,
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result: {
                    ...body,
                    url: req.file,
                },
            });
        })
        .catch(({
            status,
            err
        }) => {
            responseHelper.error(res, status, err)
        });
};

module.exports = {
    getDataUsers,
    insertDataUsers,
    deleteDataUsers,
    patchDataUsers,
};