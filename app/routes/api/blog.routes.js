const { Router } = require("express");
const { blogController } = require("../../controllers/api");
const { blogThumbnailUpload } = require("../../lib/multer");
const { isAPIAuthenticated, isAdmin } = require("../../middlewares/auth");

const blogRouter = Router();

blogRouter.get("/", isAPIAuthenticated, blogController.getBlogs);
blogRouter.get("/:slug", isAPIAuthenticated, blogController.getBlogBySlug);
blogRouter.get(
    "/categories/:slug",
    isAPIAuthenticated,
    blogController.getBlogsByCategory
);

blogRouter.post(
    "/",
    isAPIAuthenticated,
    isAdmin,
    blogThumbnailUpload.single("thumbnail"),
    blogController.createBlog
);

blogRouter.patch(
    "/:slug/publish",
    isAPIAuthenticated,
    isAdmin,
    blogController.publishBlog
);
blogRouter.patch(
    "/:slug/unpublish",
    isAPIAuthenticated,
    isAdmin,
    blogController.unpublishBlog
);

blogRouter.patch(
    "/:slug",
    isAPIAuthenticated,
    isAdmin,
    blogThumbnailUpload.single("thumbnail"),
    blogController.updateBlog
);

blogRouter.delete(
    "/:slug",
    isAPIAuthenticated,
    isAdmin,
    blogController.deleteBlog
);

module.exports = blogRouter;
