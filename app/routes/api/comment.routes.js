const { Router } = require("express");
const { commentController } = require("../../controllers/api");
const { isAPIAuthenticated } = require("../../middlewares/auth");

const commentRouter = Router();

commentRouter.get(
    "/blogs/:blogId",
    isAPIAuthenticated,
    commentController.getCommentByBlog
);
commentRouter.get(
    "/comment/:id",
    isAPIAuthenticated,
    commentController.getCommentById
);

commentRouter.post("/", isAPIAuthenticated, commentController.createComment);

commentRouter.delete(
    "/:id",
    isAPIAuthenticated,
    commentController.deleteComment
);

module.exports = commentRouter;
