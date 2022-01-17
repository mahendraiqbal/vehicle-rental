const express = require("express");

const vehiclesController = require("../controller/vehicles")
const authorize = require("../middlewares/authorize");

const vehiclesRouter = express.Router();

// const upload = require("../middlewares/uploadProfile");

// Vehicles Request

vehiclesRouter.get("/:id", vehiclesController.getByPriceId);

vehiclesRouter.get("/", vehiclesController.paginatedVehicle);

vehiclesRouter.post("/", authorize.checkToken, vehiclesController.insertDataVehicles);

vehiclesRouter.delete("/", authorize.checkToken ,authorize.roleOwner , vehiclesController.deleteDataVehicles);

vehiclesRouter.patch("/:id", authorize.checkToken ,authorize.roleOwner || authorize.roleAdmin, vehiclesController.patchDataVehicles);

module.exports = vehiclesRouter;