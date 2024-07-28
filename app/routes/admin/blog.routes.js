const { Router } = require("express");
const { blogController } = require("../../controllers/admin");
const { blogThumbnailUpload } = require("../../lib/multer");

const blogRouter = Router();

blogRouter.get("/", blogController.getBlogsUI);
blogRouter.get("/create", blogController.createBlogUI);
blogRouter.get("/:id/update", blogController.updateBlogUI);

blogRouter.post(
    "/create",
    blogThumbnailUpload.single("thumbnail"),
    blogController.createBlog
);
blogRouter.post(
    "/:id/update",
    blogThumbnailUpload.single("thumbnail"),
    blogController.updateBlog
);
blogRouter.post("/:id/delete", blogController.deleteBlog);

module.exports = blogRouter;
