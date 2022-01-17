const express = require("express");

const usersController = require("../controller/users")
const authorize = require("../middlewares/authorize");
const uploadProfile = require("../middlewares/uploadProfile");

const usersRouter = express.Router();

// Users Request
usersRouter.get("/", usersController.getDataUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.delete("/", authorize.checkToken, authorize.roleAdmin || authorize.roleCustomer, usersController.deleteDataUsers);

usersRouter.patch("/", authorize.checkToken ,uploadProfile, usersController.patchDataUsers)

module.exports = usersRouter;