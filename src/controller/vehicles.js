const vehiclesModel = require("../models/vehicles")

const getDataVehicles = (req, res) => {
    vehiclesModel
        .getDataVehicles()
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

const deleteDataVehicles = (req, res) => {
    const {
        body: {
            vehicle_id,
        },
    } = req;

    vehiclesModel.deleteDataUsers(vehicle_id)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                result: {
                    vehicle_id,
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

const putDataVehicles = (req, res) => {
    const {
        body,
    } = req;
    vehiclesModel.putDataVehicles(body)
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

const sortByPriceVehicle = (req, res) => {
    vehiclesModel.sortByPriceVehicle()
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

const searchVehicleByBrandAndType = (req, res) => {
    const {
        query
    } = req;

    vehiclesModel.searchVehicleByBrandAndType(query)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result
            });
        }).catch(({
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
    getDataVehicles,
    insertDataVehicles,
    deleteDataVehicles,
    putDataVehicles,
    sortByPriceVehicle,
    searchVehicleByBrandAndType,
};