const { Router } = require("express");
const { commentController } = require("../../controllers/api");
const { isAPIAuthenticated } = require("../../middlewares/auth");

const commentRouter = Router();

commentRouter.get(
    "/blogs/:slug",
    isAPIAuthenticated,
    commentController.getCommentsByBlog
);

commentRouter.post(
    "/blogs/:slug/",
    isAPIAuthenticated,
    commentController.createComment
);

commentRouter.delete(
    "/:id",
    isAPIAuthenticated,
    commentController.deleteComment
);

module.exports = commentRouter;
