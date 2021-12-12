const express = require("express");

const authRouter = express.Router();
const authController = require("../controller/auth");
const validate = require("../middlewares/validate");

authRouter.post("/", authController.login)
authRouter.post("/new", validate.register, authController.register);
authRouter.delete("/")

module.exports = authRouter;