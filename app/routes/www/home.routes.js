const { Router } = require("express");
const authRouter = require("./auth.routes");
const { homeController } = require("../../controllers/www");

const homeRouter = Router();

homeRouter.get("/", homeController.home);
homeRouter.get("/about", homeController.about);
homeRouter.get("/courses", homeController.courses);
homeRouter.get("/gallery", homeController.gallery);
homeRouter.get("/contact", homeController.contact);
homeRouter.get("/blogs", homeController.blogs);
homeRouter.get("/blogs/:slug", homeController.blog);

homeRouter.use("/auth", authRouter);

module.exports = homeRouter;
