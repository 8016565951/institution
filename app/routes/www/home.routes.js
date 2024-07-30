const { Router } = require("express");
const authRouter = require("./auth.routes");
const { homeController } = require("../../controllers/www");
const { getUserFromToken } = require("../../middlewares/auth");
const commentRouter = require("./comment.routes");

const homeRouter = Router();

homeRouter.get("/", getUserFromToken, homeController.home);
homeRouter.get("/about", getUserFromToken, homeController.about);
homeRouter.get("/courses", getUserFromToken, homeController.courses);
homeRouter.get("/gallery", getUserFromToken, homeController.gallery);
homeRouter.get("/contact", getUserFromToken, homeController.contact);
homeRouter.get("/blogs", getUserFromToken, homeController.blogs);
homeRouter.get("/blogs/:slug", getUserFromToken, homeController.blog);

homeRouter.use("/auth", authRouter);

homeRouter.use("/comments", commentRouter);

module.exports = homeRouter;
