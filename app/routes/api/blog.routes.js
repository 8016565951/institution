const { Router } = require("express");
const { blogController } = require("../../controllers/api");
const { blogThumbnailUpload } = require("../../lib/multer");
const { isAPIAuthenticated } = require("../../middlewares/auth");

const blogRouter = Router();

blogRouter.get("/", isAPIAuthenticated, blogController.getBlogs);
blogRouter.get("/blog/:id", isAPIAuthenticated, blogController.getBlogById);
blogRouter.get(
    "/blog/slug/:slug",
    isAPIAuthenticated,
    blogController.getBlogBySlug
);
blogRouter.get(
    "/categories/:categoryId",
    isAPIAuthenticated,
    blogController.getBlogsByCategoryId
);
blogRouter.get(
    "/authors/:authorId",
    isAPIAuthenticated,
    blogController.getBlogByAuthorId
);

blogRouter.post(
    "/",
    isAPIAuthenticated,
    blogThumbnailUpload.single("thumbnail"),
    blogController.createBlog
);

blogRouter.patch(
    "/:id/publish",
    isAPIAuthenticated,
    blogController.publishBlog
);
blogRouter.patch(
    "/:id/unpublish",
    isAPIAuthenticated,
    blogController.unpublishBlog
);

blogRouter.patch(
    "/:id",
    isAPIAuthenticated,
    blogThumbnailUpload.single("thumbnail"),
    blogController.updateBlog
);

blogRouter.delete("/:id", isAPIAuthenticated, blogController.deleteBlog);

module.exports = blogRouter;
