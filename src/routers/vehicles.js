const express = require("express");

const vehiclesController = require("../controller/vehicles")
const authorize = require("../middlewares/authorize");

const vehiclesRouter = express.Router();

const uploadVehicle = require("../middlewares/uploadVehicle");

// Vehicles Request

vehiclesRouter.get("/:id", vehiclesController.getByPriceId);

vehiclesRouter.get("/", vehiclesController.paginatedVehicle);

vehiclesRouter.post("/", authorize.checkToken, authorize.roleOwner, uploadVehicle ,vehiclesController.insertDataVehicles);

vehiclesRouter.delete("/", authorize.checkToken ,authorize.roleOwner , vehiclesController.deleteDataVehicles);

vehiclesRouter.patch("/:id", authorize.checkToken, authorize.roleOwner, uploadVehicle, vehiclesController.patchDataVehicles);

vehiclesRouter.post("/favorite", authorize.checkToken, authorize.roleCustomer, vehiclesController.addFavorite)

module.exports = vehiclesRouter;