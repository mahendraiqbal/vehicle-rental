const express = require("express");

const usersController = require("../controller/users")
const authorize = require("../middlewares/authorize");
const upload = require("../middlewares/upload");

const usersRouter = express.Router();

// Users Request
usersRouter.get("/",authorize.checkToken, usersController.getDataUsers);

usersRouter.post("/", upload.single("profile"), usersController.insertDataUsers);

usersRouter.delete("/", usersController.deleteDataUsers);

usersRouter.patch("/:id", upload.single("profile"), usersController.patchDataUsers);

module.exports = usersRouter;