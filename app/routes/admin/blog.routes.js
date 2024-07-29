const { Router } = require("express");
const { blogController } = require("../../controllers/admin");
const { blogThumbnailUpload } = require("../../lib/multer");

const blogRouter = Router();

blogRouter.get("/", blogController.getBlogsUI);
blogRouter.get("/create", blogController.createBlogUI);
blogRouter.get("/:slug/update", blogController.updateBlogUI);
blogRouter.get("/:slug/single",blogController.getsingleBlog)

blogRouter.post(
    "/create",
    blogThumbnailUpload.single("thumbnail"),
    blogController.createBlog
);
blogRouter.post(
    "/:slug/update",
    blogThumbnailUpload.single("thumbnail"),
    blogController.updateBlog
);
blogRouter.post("/:slug/delete", blogController.deleteBlog);

module.exports = blogRouter;
