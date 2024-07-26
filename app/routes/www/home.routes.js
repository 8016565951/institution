const { Router } = require("express");
const authRouter = require("./auth.routes");

const homeRouter = Router();

homeRouter.use("/auth", authRouter);

module.exports = homeRouter;
