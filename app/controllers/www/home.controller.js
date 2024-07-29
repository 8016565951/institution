const { siteConfig, menu } = require("../../config/site");
const {
    aboutRepo,
    galleryRepo,
    bannerRepo,
    userRepo,
    courseRepo,
    blogRepo,
    categoryRepo,
} = require("../../repos");

class HomeController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    home = async (req, res) => {
        const user = req.ctx?.user;

        const banners = await bannerRepo.get();
        const about = await aboutRepo.get();
        const galleries = await galleryRepo.get();

        return res.render("www/home", {
            title: `Home | ${siteConfig.name}`,
            siteConfig,
            menu,
            banners,
            about,
            galleries,
            user,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    about = async (req, res) => {
        const about = await aboutRepo.get();
        const teachers = await userRepo.getTeachers();

        res.render("www/about", {
            title: `About | ${siteConfig.name}`,
            siteConfig,
            menu,
            about,
            teachers,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courses = async (req, res) => {
        const courses = await courseRepo.get();

        res.render("www/courses", {
            title: `Courses | ${siteConfig.name}`,
            siteConfig,
            menu,
            courses,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    gallery = async (req, res) => {
        const galleries = await galleryRepo.get();

        res.render("www/gallery", {
            title: `Gallery | ${siteConfig.name}`,
            siteConfig,
            menu,
            galleries,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    contact = async (req, res) => {
        res.render("www/contact", {
            title: `Contact | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blogs = async (req, res) => {
        const blogs = await blogRepo.get();
        const categories = await categoryRepo.get();
        const recentBlogs = await blogRepo.getRecents();

        res.render("www/blogs", {
            title: `Blogs | ${siteConfig.name}`,
            siteConfig,
            menu,
            blogs,
            categories,
            recentBlogs,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blog = async (req, res) => {
        const { slug } = req.params;

        const blog = await blogRepo.getBySlug(slug);
        const recentBlogs = await blogRepo.getRecents(blog.id);

        res.render("www/blog", {
            title: `Blog | ${siteConfig.name}`,
            siteConfig,
            menu,
            blog,
            recentBlogs,
        });
    };
}

module.exports = new HomeController();
