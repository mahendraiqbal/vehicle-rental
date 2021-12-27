const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helpers/responseHelper");

const insertDataVehicles = (req, res) => {
    const {
        body,
    } = req;
    vehiclesModel
        .insertDataVehicles(body)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Vehicle has been added",
                result: {
                    ...body,
                    id: result.insertId,
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

const deleteDataVehicles = (req, res) => {
    const {
        body: {
            id,
        },
    } = req;

    vehiclesModel.deleteDataVehicles(id)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                result: {
                    msg: "Vehicles has been deleted",
                    id: result.insertId,
                }
            });
        })
        .catch(({
            status,
            err
        }) => {
            responseHelper.error(res, status, err);
        });
};

const patchDataVehicles = (req, res) => {
    const { body } = req;
    const { id } = req.userInfo;
    vehiclesModel.patchDataVehicles(body, id)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Data Updated",
                result: {
                    ...body,
                    url: req.file,
                    id: result.insertId,
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

const getByPriceId = (req, res) => {
    const { params } = req;
    const vehicleId = params.id;
    vehiclesModel.getByPriceId(vehicleId)
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
            responseHelper.error(res, status, err)
        });
};

const paginatedVehicle = (req, res) => {
    const { query } = req;
    vehiclesModel.paginatedVehicle(query)
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
    insertDataVehicles,
    deleteDataVehicles,
    patchDataVehicles,
    getByPriceId,
    paginatedVehicle,
};