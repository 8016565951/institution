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
        const user = req.ctx?.user;

        const about = await aboutRepo.get();
        const teachers = await userRepo.getTeachers();

        res.render("www/about", {
            title: `About | ${siteConfig.name}`,
            siteConfig,
            menu,
            about,
            teachers,
            user,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courses = async (req, res) => {
        const user = req.ctx?.user;

        const courses = await courseRepo.get();

        res.render("www/courses", {
            title: `Courses | ${siteConfig.name}`,
            siteConfig,
            menu,
            courses,
            user,

        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    gallery = async (req, res) => {
        const user = req.ctx?.user;

        const galleries = await galleryRepo.get();

        res.render("www/gallery", {
            title: `Gallery | ${siteConfig.name}`,
            siteConfig,
            menu,
            galleries,
            user,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    contact = async (req, res) => {
        const user = req.ctx?.user;

        res.render("www/contact", {
            title: `Contact | ${siteConfig.name}`,
            siteConfig,
            menu,
            user
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blogs = async (req, res) => {
        const user = req.ctx?.user;
        
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
         user

        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blog = async (req, res) => {
        const user = req.ctx?.user;

        const { slug } = req.params;

        const blog = await blogRepo.getBySlug(slug);
        const recentBlogs = await blogRepo.getRecents(blog.id);

        res.render("www/blog", {
            title: `Blog | ${siteConfig.name}`,
            siteConfig,
            menu,
            blog,
            recentBlogs,
            user
        });
    };
}

module.exports = new HomeController();
