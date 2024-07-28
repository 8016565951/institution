const { Router } = require("express");
const { usersControllers } = require("../../controllers/admin");

const userRouter = Router();

userRouter.get("/", usersControllers.studentsUI);
userRouter.get("/teachers", usersControllers.teachersUI);

module.exports = userRouter;
