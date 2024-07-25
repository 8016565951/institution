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
userRouter.get("/students", isAPIAuthenticated, userController.getStudents);
userRouter.get("/teachers", isAPIAuthenticated, userController.getTeachers);

userRouter.get("/user/:id", isAPIAuthenticated, userController.getUserById);
userRouter.get(
    "/student/:id",
    isAPIAuthenticated,
    userController.getStudentById
);
userRouter.get(
    "/teacher/:id",
    isAPIAuthenticated,
    userController.getTeacherById
);

userRouter.put(
    "/user/:id/avatar",
    isAPIAuthenticated,
    isSameUser,
    avatarUpload.single("avatar"),
    userController.updateAvatar
);

userRouter.patch(
    "/user/:id/role",
    isAPIAuthenticated,
    isAdmin,
    userController.updateRole
);

userRouter.delete(
    "/user/:id",
    isAPIAuthenticated,
    isSameUserOrAdmin,
    userController.deleteUser
);

module.exports = userRouter;
