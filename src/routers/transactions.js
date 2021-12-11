const express = require("express");

const transactionsController = require("../controller/transactions")

const transactionsRouter = express.Router();


// Transactions Request
transactionsRouter.get("/", transactionsController.getDataTransactions);

transactionsRouter.get("/popular", transactionsController.getPopularVehicle);

transactionsRouter.get("/transaction", transactionsController.getUserFromTransaction);

transactionsRouter.post("/", transactionsController.insertDataTransactions);

transactionsRouter.delete("/", transactionsController.deleteDataTransactions);

transactionsRouter.put("/:id", transactionsController.putDataTransactions);

module.exports = transactionsRouter;