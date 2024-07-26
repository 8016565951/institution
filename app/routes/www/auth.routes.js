const { Router } = require("express");
const { authController } = require("../../controllers/www");

const authRouter = Router();

authRouter.get("/signin", authController.signIn);

module.exports = authRouter;
