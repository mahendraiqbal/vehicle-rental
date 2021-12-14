const express = require("express");

const vehiclesController = require("../controller/vehicles")

const vehiclesRouter = express.Router();

const upload = require("../middlewares/upload");

// Vehicles Request
// vehiclesRouter.get("/", vehiclesController.getDataVehicles);

vehiclesRouter.get("/:id", vehiclesController.getByPriceVehicle);

vehiclesRouter.get("/", vehiclesController.paginatedVehicle);

vehiclesRouter.post("/", upload.single("vehicles"), vehiclesController.insertDataVehicles);

vehiclesRouter.post("/upload", upload.single("vehicles"), vehiclesController.uploadVehicle);

vehiclesRouter.delete("/", vehiclesController.deleteDataVehicles);

vehiclesRouter.put("/:id", vehiclesController.putDataVehicles);

module.exports = vehiclesRouter;