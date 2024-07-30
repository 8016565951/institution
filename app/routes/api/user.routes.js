const { Router } = require("express");
const { avatarUpload } = require("../../lib/multer");
const { userController } = require("../../controllers/api");
const {
    isAPIAuthenticated,
    isSameUser,
    isAdmin,
    isSameUserOrAdmin,
} = require("../../middlewares/auth");

const userRouter = Router();

userRouter.get("/", isAPIAuthenticated, userController.getUsers);
userRouter.get("/:id", isAPIAuthenticated, userController.getUserById);

userRouter.put(
    "/:id/avatar",
    isAPIAuthenticated,
    isSameUser,
    avatarUpload.single("avatar"),
    userController.updateAvatar
);

userRouter.patch(
    "/:id/password",
    isAPIAuthenticated,
    isSameUser,
    userController.updatePassword
);

userRouter.patch(
    "/:id/role",
    isAPIAuthenticated,
    isAdmin,
    userController.updateRole
);

userRouter.delete(
    "/:id",
    isAPIAuthenticated,
    isSameUserOrAdmin,
    userController.deleteUser
);

module.exports = userRouter;
