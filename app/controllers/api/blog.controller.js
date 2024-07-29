const { MongooseError } = require("mongoose");
const {
    CResponse,
    handleError,
    unlinkFile,
    generateFileURL,
    getFilePathFromURL,
    getDefaultImageUrl,
    slugify,
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
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getBlogBySlug = async (req, res) => {
        try {
            const { slug } = req.params;

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            return CResponse({
                res,
                message: "OK",
                data: blog,
            });
        } catch (err) {
            return handleError(err, res);
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
            return handleError(err, res);
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
            return handleError(err, res);
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
            return handleError(err, res);
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

            const slug = slugify(value.title);

            const existingBlog = await blogRepo.getBySlug(slug);
            if (existingBlog)
                throw new AppError(
                    "Blog with this title already exists",
                    "CONFLICT"
                );

            let thumbnailUrl = getDefaultImageUrl(req, "blog");
            if (req.file) thumbnailUrl = generateFileURL(req, req.file);

            const blog = await blogRepo.create({
                ...value,
                slug,
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "CREATED",
                data: blog,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    updateBlog = async (req, res) => {
        try {
            const { id } = req.params;
            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const { error, value } = blogSchema.validate(req.body);
            if (error) throw error;

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId !== uId)
                throw new AppError(
                    "You are not authorized to update this blog",
                    "FORBIDDEN"
                );

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
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    publishBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId !== uId)
                throw new AppError(
                    "You are not authorized to publish this blog",
                    "FORBIDDEN"
                );

            await blogRepo.publish(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    unpublishBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId !== uId)
                throw new AppError(
                    "You are not authorized to publish this blog",
                    "FORBIDDEN"
                );

            await blogRepo.unpublish(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    deleteBlog = async (req, res) => {
        try {
            const { id } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const blog = await blogRepo.getById(id);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId !== uId)
                throw new AppError(
                    "You are not authorized to publish this blog",
                    "FORBIDDEN"
                );

            await blogRepo.delete(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new BlogController();
