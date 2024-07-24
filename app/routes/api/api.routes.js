const { Router } = require("express");
const authRouter = require("./auth.routes");
const parentRouter = require("./parent.routes");
const teacherRouter = require("./teacher.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/parents", parentRouter);
apiRouter.use("/teachers", teacherRouter);

module.exports = apiRouter;
