const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helpers/responseHelper");

// const getDataVehicles = (req, res) => {
//     vehiclesModel
//         .getDataVehicles()
//         .then(({
//             status,
//             result
//         }) => {
//             res.status(status).json({
//                 msg: "Berhasil",
//                 result
//             });
//         })
//         .catch(({
//             status,
//             err
//         }) => {
//             res.status(status).json({
//                 msg: "Error",
//                 err
//             });
//         });
// };

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
                    url: req.file,
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
                    msg: "Vehicles telah dihapus",
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
    const { params, body } = req;
    const vehicleId = params.id;
    vehiclesModel.putDataVehicles(body, vehicleId)
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

const getByPriceVehicle = (req, res) => {
    const { params } = req;
    const vehicleId = params.id;
    vehiclesModel.getByPriceVehicle(vehicleId)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Berhasil",
                result,
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

const uploadVehicle = (req, res) => {
    res.status(200).json({ msg: "Success", url: req.file})
};

module.exports = {
    // getDataVehicles,
    insertDataVehicles,
    deleteDataVehicles,
    putDataVehicles,
    getByPriceVehicle,
    paginatedVehicle,
    uploadVehicle,
};