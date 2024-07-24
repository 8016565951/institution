const { Router } = require("express");
const authRouter = require("./auth.routes");
const parentRouter = require("./parents.routes");
const teacherRouter = require("./teachres.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/parents", parentRouter);
apiRouter.use("/teachers", teacherRouter);

module.exports = apiRouter;
