const { Router } = require("express");
const { authController } = require("../../controllers/api");
const { avatarUpload } = require("../../lib/multer");

const authRouter = Router();

authRouter.post(
    "/signup",
    avatarUpload.single("avatar"),
    authController.signUp
);

module.exports = authRouter;
