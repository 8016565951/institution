const { Router } = require("express");
const { authController } = require("../../controllers/www");
const { isTokenValidUI } = require("../../middlewares/auth");

const authRouter = Router();

authRouter.get("/signup", authController.signUpPage);
authRouter.get("/signin", authController.signInPage);
authRouter.get("/verify-email", authController.verifyEmailPage);

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.post("/verify-email", isTokenValidUI, authController.verifyEmail);
authRouter.get("/signout", authController.signOut);

module.exports = authRouter;
