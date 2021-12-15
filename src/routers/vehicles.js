const express = require("express");

const vehiclesController = require("../controller/vehicles")

const vehiclesRouter = express.Router();

const upload = require("../middlewares/upload");

// Vehicles Request

vehiclesRouter.get("/:id", vehiclesController.getByPriceId);

vehiclesRouter.get("/", vehiclesController.paginatedVehicle);

vehiclesRouter.post("/", upload.single("vehicle_photo"), vehiclesController.insertDataVehicles);

vehiclesRouter.delete("/", vehiclesController.deleteDataVehicles);

vehiclesRouter.patch("/:id", upload.single("vehicle_photo"),vehiclesController.patchDataVehicles);

module.exports = vehiclesRouter;