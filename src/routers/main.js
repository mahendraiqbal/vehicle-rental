const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users");
const vehiclesRouter = require("./vehicles");
const transactionsRouter = require("./transactions");
const authRouter = require("./auth");
// const uploadVehicle = require("../middlewares/uploadVehicle")

mainRouter.use("/users", usersRouter);
mainRouter.use("/vehicles", vehiclesRouter);
mainRouter.use("/transactions", transactionsRouter);
mainRouter.use("/auth", authRouter)

// mainRouter.post("/uploadVehicle", uploadVehicle.uploadMultiple, (req,res) => {
//     res.status(200).json({ msg: "Image has been added", url: req.files });
//     console.log(req.files[0].filename);
// });

module.exports = mainRouter;
