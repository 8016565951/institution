const { Router } = require("express");
const authRouter = require("./auth.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
