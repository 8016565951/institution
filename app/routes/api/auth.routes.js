const { Router } = require("express");
const { authController } = require("../../controllers/api");

const authRouter = Router();

authRouter.post("/signup", authController.signUp);

module.exports = authRouter;
