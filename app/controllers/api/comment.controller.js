const { handleError, CResponse } = require("../../lib/utils");
const { commentSchema } = require("../../lib/validations");
const { commentRepo } = require("../../repos");

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
            const { error, value } = commentSchema.validate(req.body);
            if (error) throw error;

            const comment = await commentRepo.create(value);

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
