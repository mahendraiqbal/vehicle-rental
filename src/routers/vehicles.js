const express = require("express");

const vehiclesController = require("../controller/vehicles")

const vehiclesRouter = express.Router();

// Vehicles Request
vehiclesRouter.get("/", vehiclesController.getDataVehicles);

vehiclesRouter.post("/", vehiclesController.insertDataVehicles);

vehiclesRouter.delete("/", vehiclesController.deleteDataVehicles);

vehiclesRouter.put("/:id", vehiclesController.putDataVehicles);

vehiclesRouter.get("/:id", vehiclesController.getByPriceVehicle);

vehiclesRouter.get("/", vehiclesController.sortVehicle);

module.exports = vehiclesRouter;