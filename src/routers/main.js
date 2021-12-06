const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users");
const vehiclesRouter = require("./vehicles");
const transactionsRouter = require("./transactions");

mainRouter.use("/users", usersRouter);
mainRouter.use("/vehicles", vehiclesRouter);
mainRouter.use("/transactions", transactionsRouter);

module.exports = mainRouter;
