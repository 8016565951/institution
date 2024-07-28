const { Router } = require("express");
const { blogController } = require("../../controllers/admin");
const { blogThumbnailUpload } = require("../../lib/multer");

const blogRouter = Router();

blogRouter.get("/", blogController.getBlogsUI);
blogRouter.get("/createBlogsUI", blogController.createblogsUI);
blogRouter.get("/updateBlogsUI/:id", blogController.updateBlogsUI);
blogRouter.get("/blog/:id", blogController.getblogSIngle);

blogRouter.post(
    "/create",
    blogThumbnailUpload.single("thumbnailUrl"),
    blogController.createBlog
);
blogRouter.post(
    "/update",
    blogThumbnailUpload.single("thumbnailUrl"),
    blogController.updateBlog
);
blogRouter.post("/deleteblog", blogController.deleteBlog);

module.exports = blogRouter;
