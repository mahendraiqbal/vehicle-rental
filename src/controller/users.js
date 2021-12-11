const usersModel = require("../models/users")

const getDataUsers = (req, res) => {
    usersModel
        .getDataUsers()
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result
            });
        })
        .catch(({
            status,
            err
        }) => {
            res.status(status).json({
                msg: "Error",
                err
            });
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
                    ...body,
                    id: result.insertId,
                },
            });
        })
        .catch(({
            status,
            err
        }) => {
            res.status(status).json({
                msg: "Error",
                err
            });
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
            res.status(status).json({
                msg: "Error",
                err
            });
        });
};

const putDataUsers = (req, res) => {
    const { params, body } = req;
    const usersId = params.id;
    usersModel.putDataUsers(body, usersId)
        .then(({
            status,
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result: {
                    ...body,
                },
            });
        })
        .catch(({
            status,
            err
        }) => {
            res.status(status).json({
                msg: "Error",
                err
            });
        });
};

module.exports = {
    getDataUsers,
    insertDataUsers,
    deleteDataUsers,
    putDataUsers,
};