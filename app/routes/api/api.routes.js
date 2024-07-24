const { Router } = require("express");
const authRouter = require("./auth.routes");
const ParentRouter = require("./parents.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/parents", ParentRouter);

module.exports = apiRouter;
