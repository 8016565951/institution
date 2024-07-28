const { Router } = require("express");
const aboutRouter = require("./about.routes");
const bannerRouter = require("./banner.routes");
const courseRouter = require("./course.routes");
const contactRouter = require("./contact.routes");
const blogRouter = require("./blog.routes");
const GallaryRouter = require("./gallary.routes");

const adminRouter = Router();

adminRouter.use("/about", aboutRouter);
adminRouter.use("/banners", bannerRouter);
adminRouter.use("/courses", courseRouter);
adminRouter.use("/contacts", contactRouter);
adminRouter.use("/blogs", blogRouter);
adminRouter.use("/gallaries", GallaryRouter);

module.exports = adminRouter;
