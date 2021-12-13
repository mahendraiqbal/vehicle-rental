const express = require("express");

const usersController = require("../controller/users")
const authorize = require("../middlewares/authorize")

const usersRouter = express.Router();


// Users Request
usersRouter.get("/", usersController.getDataUsers);

usersRouter.post("/", authorize.checkToken, usersController.insertDataUsers);

usersRouter.delete("/", usersController.deleteDataUsers);

usersRouter.put("/:id", usersController.putDataUsers);

module.exports = usersRouter;