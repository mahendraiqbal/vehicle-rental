const express = require("express");

const vehiclesController = require("../controller/vehicles")
const authorize = require("../middlewares/authorize");

const vehiclesRouter = express.Router();

const upload = require("../middlewares/upload");

// Vehicles Request

vehiclesRouter.get("/:id", vehiclesController.getByPriceId);

vehiclesRouter.get("/", vehiclesController.paginatedVehicle);

vehiclesRouter.post("/", authorize.roleOwner , upload.single("vehicle_photo"), vehiclesController.insertDataVehicles);

vehiclesRouter.delete("/", authorize.roleOwner || authorize.roleAdmin, vehiclesController.deleteDataVehicles);

vehiclesRouter.patch("/update", authorize.roleOwner || authorize.roleAdmin, upload.single("vehicle_photo"),vehiclesController.patchDataVehicles);

module.exports = vehiclesRouter;