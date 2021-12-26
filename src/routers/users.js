const express = require("express");

const usersController = require("../controller/users")
const authorize = require("../middlewares/authorize");
const upload = require("../middlewares/upload");

const usersRouter = express.Router();

// Users Request
usersRouter.get("/", authorize.checkToken, usersController.getDataUsers);

usersRouter.post("/", authorize.checkToken ,authorize.roleCustomer ,upload.single("profile"), usersController.insertDataUsers);

usersRouter.delete("/", authorize.checkToken, authorize.roleAdmin || authorize.roleCustomer, usersController.deleteDataUsers);

usersRouter.patch("/update", authorize.checkToken, upload.single("profile"), usersController.patchDataUsers)

module.exports = usersRouter;