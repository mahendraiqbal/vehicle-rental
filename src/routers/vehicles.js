const express = require("express");

const vehiclesController = require("../controller/vehicles")

const vehiclesRouter = express.Router();

const upload = require("../middlewares/upload");

// Vehicles Request
vehiclesRouter.get("/", vehiclesController.getDataVehicles);

vehiclesRouter.get("/:id", vehiclesController.getByPriceVehicle);

vehiclesRouter.get("/", vehiclesController.sortVehicle);

vehiclesRouter.post("/", vehiclesController.insertDataVehicles);

vehiclesRouter.post("/upload", upload.single("vehicles"), vehiclesController)

vehiclesRouter.delete("/", vehiclesController.deleteDataVehicles);

vehiclesRouter.put("/:id", vehiclesController.putDataVehicles);

module.exports = vehiclesRouter;