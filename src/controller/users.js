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
            id_user,
        },
    } = req;

    usersModel.deleteDataUsers(id_user)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                result: {
                    id_user,
                    id: result.insertId,
                }
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
    const {
        body
    } = req;
    usersModel.putDataUsers(body)
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

const patchDataUsers = (req, res) => {
    const {
        body: {
            id_user,
            name,
            email,
            password,
            address,
            gender,
            birth_of_date,
        },
    } = req;
    usersModel.putDataUsers(name, email, password, address, gender, birth_of_date, id_user)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result: {
                    name,
                    email,
                    password,
                    address,
                    gender,
                    birth_of_date,
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

const searchUserbyId = (req, res) => {
    // let id = parseInt(req.params.id);
    const {
        body: {
            id_user,
        }
    } = req;
    usersModel.searchUserById(id_user)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                result,
            });
        })
        .catch(({
            status,
            err
        }) => {
            res.status(status).json({
                msg: "Terjadi Error",
                err
            });
        })
};

module.exports = {
    getDataUsers,
    insertDataUsers,
    deleteDataUsers,
    putDataUsers,
    patchDataUsers,
    searchUserbyId,
};