const express = require("express");

const transactionsController = require("../controller/transactions")
const authorize = require("../middlewares/authorize")

const transactionsRouter = express.Router();


// Transactions Request
transactionsRouter.get("/", transactionsController.getDataTransactions);

transactionsRouter.get("/popular", transactionsController.getPopularVehicle);

transactionsRouter.post("/", transactionsController.insertDataTransactions);

transactionsRouter.delete("/", authorize.roleAdmin ,transactionsController.deleteDataTransactions);

module.exports = transactionsRouter;