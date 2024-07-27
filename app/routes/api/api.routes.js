const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const courseRouter = require("./course.routes");
const bannerRouter = require("./banner.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/banners", bannerRouter);
apiRouter.use("/courses", courseRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
