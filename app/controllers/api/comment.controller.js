const { AppError } = require("../../lib/helpers");
const { handleError, CResponse } = require("../../lib/utils");
const { commentSchema } = require("../../lib/validations");
const { commentRepo, blogRepo } = require("../../repos");

class CommentController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCommentByBlog = async (req, res) => {
        try {
            const { blogId } = req.params;
            const comments = await commentRepo.getByBlogId(blogId);

            return CResponse({
                res,
                message: "OK",
                data: comments,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCommentById = async (req, res) => {
        try {
            const { id } = req.params;
            const comment = await commentRepo.getById(id);

            return CResponse({
                res,
                message: "OK",
                data: comment,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createComment = async (req, res) => {
        try {
            const { slug: blogSlug } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId) throw new AppError("Unauthorized", "UNAUTHORIZED");

            const { error, value } = commentSchema.validate(req.body);
            if (error) throw error;

            const blog = await blogRepo.getBySlug(blogSlug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            const comment = await commentRepo.create({
                ...value,
                blogId: blog._id,
                authorId: uId,
            });

            return CResponse({
                res,
                message: "OK",
                data: comment,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteComment = async (req, res) => {
        try {
            const { id } = req.params;
            await commentRepo.delete(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new CommentController();
