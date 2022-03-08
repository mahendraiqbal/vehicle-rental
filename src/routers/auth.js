const express = require("express");

const authRouter = express.Router();
const authController = require("../controller/auth");
const validate = require("../middlewares/validate");
const authorize = require("../middlewares/authorize")

authRouter.post("/", authController.login)
authRouter.post("/new", validate.register, authController.register);
authRouter.delete("/logout", authorize.checkToken, authController.logout);

module.exports = authRouter;