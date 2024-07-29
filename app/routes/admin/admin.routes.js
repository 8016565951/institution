const { Router } = require("express");
const aboutRouter = require("./about.routes");
const bannerRouter = require("./banner.routes");
const courseRouter = require("./course.routes");
const contactRouter = require("./contact.routes");
const blogRouter = require("./blog.routes");
const galleryRouter = require("./gallery.routes");
const usersRouter = require("./users.routes");

const adminRouter = Router();

adminRouter.use("/about", aboutRouter);
adminRouter.use("/banners", bannerRouter);
adminRouter.use("/courses", courseRouter);
adminRouter.use("/contacts", contactRouter);
adminRouter.use("/blogs", blogRouter);
adminRouter.use("/galleries", galleryRouter);
adminRouter.use("/users", usersRouter);

module.exports = adminRouter;
