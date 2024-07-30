const {
    unlinkFile,
    generateFileURL,
    getFilePathFromURL,
    getDefaultImageUrl,
    slugify,
} = require("../../lib/utils");
const { AppError } = require("../../lib/helpers");
const { blogRepo, categoryRepo } = require("../../repos");
const { blogSchema } = require("../../lib/validations");
const { siteConfig } = require("../../config/site");

class BlogController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getBlogsUI = async (req, res) => {
        try {
            const user = req.ctx?.user;
            const blogs = await blogRepo.get();

            return res.render("admin/blogs", {
                title: `Blogs | ${siteConfig.name}`,
                blogs,
                user,
            });
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createBlogUI = async (req, res) => {
        try {
            const user = req.ctx?.user;
            const categories = await categoryRepo.get();

            return res.render("admin/blog-create", {
                title: `Create Blog | ${siteConfig.name}`,
                categories,
                user,
            });
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateBlogUI = async (req, res) => {
        try {
            const { slug } = req.params;
            const user = req.ctx?.user;

            const blog = await blogRepo.getBySlug(slug);
            const categories = await categoryRepo.get();

            return res.render("admin/blog-update", {
                title: `Update Blog | ${siteConfig.name}`,
                blog,
                categories,
                user,
            });
        } catch (err) {
            console.log(err);
        }
    };
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getsingleBlog = async (req, res) => {
        try {
            const { slug } = req.params;
            const user = req.ctx?.user;

            const blog = await blogRepo.getBySlug(slug);
            const recentBlogs = await blogRepo.getRecents(blog.id);

            return res.render("admin/blog-single", {
                title: `single Blog | ${siteConfig.name}`,
                blog,
                recentBlogs,
                user,
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createBlog = async (req, res) => {
        try {
            const { categories: cats } = req.body;
            const categories = Array.isArray(cats) ? cats : [cats];

            const { error, value } = blogSchema.validate({
                ...req.body,
                categories,
            });
            if (error) throw error;

            const userId = req.ctx?.user.id;
            if (!userId)
                throw new AppError(
                    "You are not authorized to perform this action",
                    "UNAUTHORIZED"
                );

            if (!categories || categories.length === 0)
                throw new AppError(
                    "At least one category is required",
                    "BAD_REQUEST"
                );

            const { valid, invalidCategories, validCategories } =
                await blogRepo.validateCategories(categories);
            if (!valid)
                throw new AppError(
                    `Invalid categories: ${invalidCategories.join(", ")}`,
                    "BAD_REQUEST"
                );

            const slug = slugify(value.title);

            const existingBlog = await blogRepo.getBySlug(slug);
            console.log(existingBlog);
            if (existingBlog)
                throw new AppError(
                    "A blog with this title already exists",
                    "CONFLICT"
                );

            let thumbnailUrl = getDefaultImageUrl(req, "blog");
            if (req.file) thumbnailUrl = generateFileURL(req, req.file);

            await blogRepo.create({
                ...value,
                authorId: userId,
                categories: validCategories.map((c) => c.id),
                slug,
                thumbnailUrl,
            });

            return res.redirect("/admin/blogs");
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateBlog = async (req, res) => {
        try {
            const { slug } = req.params;

            const { error, value } = blogSchema.validate(req.body);
            if (error) throw error;

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            let thumbnailUrl = blog.thumbnailUrl;
            if (req.file) {
                thumbnailUrl = generateFileURL(req, req.file);
                if (blog.thumbnailUrl !== getDefaultImageUrl(req, "blog"))
                    await unlinkFile(getFilePathFromURL(blog.thumbnailUrl));
            }

            await blogRepo.update(blog._id, {
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
     * @param {import("express").Response} res
     */
    deleteBlog = async (req, res) => {
        try {
            const { slug } = req.params;

            const blog = await blogRepo.getBySlug(slug);
            if (!blog) throw new AppError("Blog not found", "NOT_FOUND");

            if (blog.thumbnailUrl !== getDefaultImageUrl(req, "blog"))
                await unlinkFile(getFilePathFromURL(blog.thumbnailUrl));

            await blogRepo.delete(blog._id);

            return res.redirect("/admin/blogs");
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new BlogController();
