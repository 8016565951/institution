const { Router } = require("express");
const { authController } = require("../../controllers/api");
const { avatarUpload } = require("../../lib/multer");
const { isTokenValid } = require("../../middlewares/auth");

const authRouter = Router();

authRouter.post(
    "/signup",
    avatarUpload.single("avatar"),
    authController.signUp
);
authRouter.post("/signin", authController.signIn);
authRouter.post(
    "/verify-email/verify",
    isTokenValid,
    authController.verifyEmail
);
authRouter.post("/update-email", authController.updateEmail);
authRouter.post(
    "/verify-new-email",
    isTokenValid,
    authController.verifyNewEmail
);

module.exports = authRouter;
