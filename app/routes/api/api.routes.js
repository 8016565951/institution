const { Router } = require("express");
const authRouter = require("./auth.routes");
const parentRouter = require("./parents.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/parents", parentRouter);

module.exports = apiRouter;
