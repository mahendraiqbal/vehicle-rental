const transactionsModel = require("../models/transactions")

const getDataTransactions = (req, res) => {
    transactionsModel
        .getDataTransactions()
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

const insertDataTransactions = (req, res) => {
    const {
        body,
    } = req;
    transactionsModel
        .insertDataTransactions(body)
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

const deleteDataTransactions = (req, res) => {
    const {
        body: {
            id,
        },
    } = req;
    transactionsModel.deleteDataTransactions(id)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Transaction Telah Dihapus",
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

const putDataTransactions = (req, res) => {
    const { params, body } = req;
    const transactionId = params.id;
    transactionsModel.putDataTransactions(body, transactionId)
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

const getPopularVehicle = (req, res) => {
    transactionsModel.getPopularVehicle()
    .then(({status, result}) => {
        res.status(status).json({
                msg: "Berhasil",
                result
            })
    })
    .catch(({status, err}) => {
        res.status(status).json({
                msg: "Error",
                err
            }); 
    });
};

module.exports = {
    getDataTransactions,
    insertDataTransactions,
    deleteDataTransactions,
    putDataTransactions,
    getPopularVehicle,
}