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
authRouter.post("/signin/admin", authController.signInAdmin);

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

authRouter.post("/forget-password/s1", authController.forgetPasswordStep1);
authRouter.post("/forget-password/s2", authController.forgetPasswordStep2);

authRouter.post("/signout", authController.signOut);
authRouter.post("/signout/admin", authController.signOutAdmin);

module.exports = authRouter;
