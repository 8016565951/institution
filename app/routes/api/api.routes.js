const { Router } = require("express");
const authRouter = require("./auth.routes");
const parentRouter = require("./parent.routes");
const teacherRouter = require("./teacher.routes");
const courseRouter = require("./course.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/parents", parentRouter);
apiRouter.use("/teachers", teacherRouter);
apiRouter.use("/courses", courseRouter);

module.exports = apiRouter;
