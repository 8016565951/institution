const { Router } = require("express");
const { commentController } = require("../../controllers/admin");
const { isUIAuthenticated } = require("../../middlewares/auth");

const commentRouter = Router();

commentRouter.post(
    "/blogs/:slug",
    isUIAuthenticated,
    commentController.createComment
);

commentRouter.delete(
    "/:id",
    isUIAuthenticated,
    commentController.deleteComment
);

module.exports = commentRouter;
