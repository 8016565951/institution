const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const courseRouter = require("./course.routes");
const bannerRouter = require("./banner.routes");
const blogRouter = require("./blog.routes");
const categoryRouter = require("./category.routes");
const commentRouter = require("./comment.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/banners", bannerRouter);
apiRouter.use("/courses", courseRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
