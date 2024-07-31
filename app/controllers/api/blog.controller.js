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
const { BLOG_STATUS } = require("../../config/const");

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
            if (blog.status !== BLOG_STATUS.PUBLISHED)
                throw new AppError("Blog not found", "NOT_FOUND");

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
    getBlogsByCategory = async (req, res) => {
        try {
            const { slug } = req.params;

            const existingCategory = await categoryRepo.getByTitle(slug);
            if (!existingCategory)
                throw new AppError("Category not found", "NOT_FOUND");

            const categoryWithBlogs = await categoryRepo.getBlogsByCategoryName(
                existingCategory.title
            );

            const blogs = categoryWithBlogs[0]?.blogs;
            if (!blogs || blogs.length === 0)
                throw new AppError(
                    "No blogs found in this category",
                    "NOT_FOUND"
                );

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
            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const { error, value } = blogSchema.validate(req.body);
            if (error) throw error;

            const { categories: catNames } = value;
            if (catNames.length === 0)
                throw new AppError(
                    "At least one category is required",
                    "BAD_REQUEST"
                );

            const { valid, validCategories, invalidCategories } =
                await blogRepo.validateCategories(catNames);
            if (!valid)
                throw new AppError(
                    `Invalid categories: ${invalidCategories.join(", ")}`,
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
                categories: validCategories.map((c) => c._id),
                authorId: uId,
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "CREATED",
                data: blog,
            });
        } catch (err) {
            if (!(err instanceof MongooseError)) unlinkFile(req.file?.path);
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    updateBlog = async (req, res) => {
        try {
            const { slug } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const { error, value } = blogSchema.validate(req.body);
            if (error) throw error;

            const { categories: catNames } = value;
            if (catNames.length === 0)
                throw new AppError(
                    "At least one category is required",
                    "BAD_REQUEST"
                );

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId.toString() !== uId)
                throw new AppError(
                    "You are not authorized to update this blog",
                    "FORBIDDEN"
                );

            const { valid, validCategories, invalidCategories } =
                await blogRepo.validateCategories(catNames);
            if (!valid)
                throw new AppError(
                    `Invalid categories: ${invalidCategories.join(", ")}`,
                    "BAD_REQUEST"
                );

            let thumbnailUrl = blog.thumbnailUrl;
            if (req.file) {
                thumbnailUrl = generateFileURL(req, req.file);
                if (blog.thumbnailUrl !== getDefaultImageUrl(req, "blog"))
                    unlinkFile(getFilePathFromURL(blog.thumbnailUrl));
            }

            await blogRepo.update(blog._id, {
                ...value,
                categories: validCategories.map((c) => c._id),
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError)) unlinkFile(req.file?.path);
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    publishBlog = async (req, res) => {
        try {
            const { slug } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId.toString() !== uId)
                throw new AppError(
                    "You are not authorized to publish this blog",
                    "FORBIDDEN"
                );

            await blogRepo.publish(blog._id);

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
            const { slug } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId.toString() !== uId)
                throw new AppError(
                    "You are not authorized to unpublish this blog",
                    "FORBIDDEN"
                );

            await blogRepo.unpublish(blog._id);

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
            const { slug } = req.params;

            const uId = req.ctx?.user?.id;
            if (!uId)
                throw new AppError("You are not authenticated", "UNAUTHORIZED");

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.authorId.toString() !== uId)
                throw new AppError(
                    "You are not authorized to delete this blog",
                    "FORBIDDEN"
                );

            if (blog.thumbnailUrl !== getDefaultImageUrl(req, "blog"))
                unlinkFile(getFilePathFromURL(blog.thumbnailUrl));

            await blogRepo.delete(blog._id);

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
