const { AppError } = require("../../lib/helpers");
const { commentSchema } = require("../../lib/validations");
const { commentRepo, blogRepo } = require("../../repos");

class CommentController {
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

            await commentRepo.create({
                ...value,
                blogId: blog._id,
                authorId: uId,
            });

            return res.redirect(`/blogs/${blogSlug}`);
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteComment = async (req, res) => {
        try {
            const { id } = req.params;

            const comment = await commentRepo.getById(id);
            if (!comment) throw new AppError("Comment not found", "NOT_FOUND");

            const blog = await blogRepo.getById(comment.blogId);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            await commentRepo.delete(id);

            return res.redirect(`/blogs/${blog.slug}`);
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new CommentController();
