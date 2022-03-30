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
        body
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
    const { params } = req;
    const id = params.id;
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

const getDataTransactionsById = (req, res) => {
    const { id } = req.userInfo;
    console.log("[DEBUG] userInfo", id);
    transactionsModel
        .getDataTransactionsById(id)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

module.exports = {
    getDataTransactions,
    insertDataTransactions,
    deleteDataTransactions,
    getPopularVehicle,
    getDataTransactionsById,
}