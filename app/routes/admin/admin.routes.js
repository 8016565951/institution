const { Router } = require("express");
const homeRouter = require("./home.routes");
const aboutRouter = require("./about.routes");

const adminRouter = Router();

adminRouter.use(homeRouter);
adminRouter.use(aboutRouter);

module.exports = adminRouter;
