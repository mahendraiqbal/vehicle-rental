const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helpers/responseHelper");

const insertDataVehicles = (req, res) => {
    const { body, files } = req;
    // const { id } = req.userInfo;
    console.log('body', body);
    console.log('files', files);

    const imagesVeh = files;
    let dataImages = []
    let newBody;

    if(imagesVeh) {
        for (let i = 0; i < imagesVeh.length; i++) {
            dataImages.push(imagesVeh[i].filename);
        }
        let vehicleImages = JSON.stringify(dataImages);
        newBody = {
            ...body,
            images: vehicleImages,
        };
    }

    vehiclesModel
        .insertDataVehicles(newBody)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Vehicle has been added",
                result: {
                    ...newBody,
                    id: result.insertId
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
    const { body, params, files } = req;
    // const { id } = req.userInfo;
    const id = params.id;
    const imagesVeh = files;
    let dataImages = []
    let newBody;

    if (req.files) {
        for (let i = 0; i < imagesVeh.length; i++) {
            dataImages.push(imagesVeh[i].filename);
        }
        let vehicleImages = JSON.stringify(dataImages);
        newBody = {
            ...body,
            images: vehicleImages,
        };
    } else {
        newBody = {...body, id: id};
    }

    vehiclesModel.patchDataVehicles(newBody, id)
        .then(({
            status,
            result
        }) => {
            res.status(status).json({
                msg: "Data Updated",
                result: {
                    ...newBody,
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
    const order = query.order;
    let keyword = "";
    if (query.name) keyword = `%${query.name}%`
    vehiclesModel.paginatedVehicle(query, keyword, order)
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

const addFavorite = (req, res) => {
    const { body } = req;
    vehiclesModel.addFavorite(body)
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

module.exports = {
    insertDataVehicles,
    deleteDataVehicles,
    patchDataVehicles,
    getByPriceId,
    paginatedVehicle,
    addFavorite,
};