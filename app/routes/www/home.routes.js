const { Router } = require("express");
const authRouter = require("./auth.routes");
const { homeController } = require("../../controllers/www");

const homeRouter = Router();

homeRouter.get("/", homeController.index);
homeRouter.get("/about", homeController.about);
homeRouter.get("/contact", homeController.contact);
homeRouter.get("/services", homeController.services);
homeRouter.get("/portfolio", homeController.portfolio);
homeRouter.get("/portfolio-details", homeController.portfolioDetails);
homeRouter.get("/pricing", homeController.pricing);
homeRouter.get("/blog", homeController.blog);
homeRouter.get("/blog-single", homeController.blogSingle);
homeRouter.get("/team", homeController.team);
homeRouter.get("/testimonials", homeController.testimonials);

homeRouter.use("/auth", authRouter);

module.exports = homeRouter;
