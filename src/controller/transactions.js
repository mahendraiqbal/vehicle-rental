const transactionsModel = require("../models/transactions");
const responseHelper = require("../helpers/responseHelper");

const getDataTransactions = (req, res) => {
    transactionsModel
        .getDataTransactions()
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
            responseHelper.error(res, status, err);
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
            responseHelper.error(res, status, err);
        });
};

const putDataTransactions = (req, res) => {
    const {
        params,
        body
    } = req;
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

module.exports = {
    getDataTransactions,
    insertDataTransactions,
    deleteDataTransactions,
    putDataTransactions,
    getPopularVehicle,
}