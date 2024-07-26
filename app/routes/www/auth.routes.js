const { Router } = require("express");
const { authController } = require("../../controllers/www");

const authRouter = Router();

authRouter.get("/signin", authController.signIn);

authRouter.get("/signup", authController.signUp);

module.exports = authRouter;
