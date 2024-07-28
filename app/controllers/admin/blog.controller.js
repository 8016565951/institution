const { MongooseError } = require("mongoose");
const {
    unlinkFile,
    generateFileURL,
    getFilePathFromURL,
    getDefaultImageUrl,
} = require("../../lib/utils");
const { AppError } = require("../../lib/helpers");
const { blogRepo, categoryRepo } = require("../../repos");
const { blogSchema } = require("../../lib/validations");
const { siteConfig } = require("../../config/site");

class BlogController {
    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getblogSIngle = async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await blogRepo.getById(id);
            return res.render("admin/blog-single", {
                title: `Blog | ${siteConfig.name}`,
                blog,
            });
        } catch (err) {
            console.log(err);
        }
    };
    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getBlogsUI = async (req, res) => {
        try {
            const blogs = await blogRepo.get();

            return res.render("admin/blogs", {
                title: `Blogs | ${siteConfig.name}`,
                siteConfig,
                blogs,
            });
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    createblogsUI = async (req, res) => {
        try {
            return res.render("admin/blog-create", {
                title: `Create Blog `,
            });
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    updateBlogsUI = async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await blogRepo.getById(id);
            const categories = await categoryRepo.get();
            return res.render("admin/blog-update", {
                title: `Update Blog | ${siteConfig.name}`,
                blog,
                categories,
            });
        } catch (err) {
            console.log(err);
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

            return res.redirect("/admin/blogs");
        } catch (err) {
            console.log(err);
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

            return res.redirect("/admin/blogs");
        } catch (err) {
            console.log(err);
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

            return res.redirect("/admin/blogs");
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new BlogController();
