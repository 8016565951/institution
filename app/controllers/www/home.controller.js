const { siteConfig, menu } = require("../../config/site");

class HomeController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    home = (req, res) => {
        return res.render("www/home", {
            title: `Home | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    about = (req, res) => {
        res.render("www/about", {
            title: `About | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courses = (req, res) => {
        res.render("www/courses", {
            title: `Courses | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    gallery = (req, res) => {
        res.render("www/gallery", {
            title: `Gallery | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    contact = (req, res) => {
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
    blogs = (req, res) => {
        res.render("www/blogs", {
            title: `Blogs | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blog = (req, res) => {
        res.render("www/blog", {
            title: `Blog | ${siteConfig.name}`,
            siteConfig,
            menu,
        });
    };
}

module.exports = new HomeController();
