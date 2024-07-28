const { MongooseError } = require("mongoose");
const {
    CResponse,
    handleError,
    unlinkFile,
    generateFileURL,
    getFilePathFromURL,
    getDefaultImageUrl,
} = require("../../lib/utils");
const { AppError } = require("../../lib/helpers");
const { blogRepo, categoryRepo } = require("../../repos");
const { blogSchema } = require("../../lib/validations");

class BlogController {
    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getBlogs = async (req, res) => {
        try {
            const blogs = await blogRepo.get();

            return CResponse({
                res,
                message: "OK",
                data: blogs,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getBlogById = async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await blogRepo.getById(id);

            return CResponse({
                res,
                message: "OK",
                data: blog,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getBlogsByCategoryId = async (req, res) => {
        try {
            const { categoryId } = req.params;
            const blogs = await categoryRepo.getBlogsByCategoryId(categoryId);

            return CResponse({
                res,
                message: "OK",
                data: blogs,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getBlogByAuthorId = async (req, res) => {
        try {
            const { authorId } = req.params;
            const blog = await blogRepo.getByAuthorId(authorId);

            return CResponse({
                res,
                message: "OK",
                data: blog,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    createBlog = async (req, res) => {
        try {
            const { error, value } = blogSchema.validate(req.body);
            if (error) throw error;

            const { categories } = value;
            if (!categories || categories.length === 0)
                throw new AppError(
                    "At least one category is required",
                    "BAD_REQUEST"
                );

            const validateCats = await blogRepo.validateCategories(categories);
            if (!validateCats.valid)
                throw new AppError(
                    `Invalid categories: ${validateCats.invalidCategories.join(
                        ", "
                    )}`,
                    "BAD_REQUEST"
                );

            let thumbnailUrl = getDefaultImageUrl(req, "blog");
            if (req.file) thumbnailUrl = generateFileURL(req, req.file);

            const blog = await blogRepo.create({
                ...value,
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "CREATED",
                data: blog,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    updateBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = blogSchema.validate(req.body);
            if (error) throw error;

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            let thumbnailUrl = blog.thumbnailUrl;
            if (req.file) {
                thumbnailUrl = generateFileURL(req, req.file);
                await unlinkFile(getFilePathFromURL(blog.thumbnailUrl));
            }

            await blogRepo.update(id, {
                ...value,
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    publishBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            await blogRepo.publish(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    unpublishBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            await blogRepo.unpublish(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    deleteBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            await blogRepo.delete(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new BlogController();
