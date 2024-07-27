class HomeController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    index = async (req, res) => {
        res.render("admin/index");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    hero = async (req, res) => {
        res.render("admin/hero");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courses = async (req, res) => {
        res.render("admin/courses");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    gallery = async (req, res) => {
        res.render("admin/gallery");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    students = async (req, res) => {
        res.render("admin/students");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    teachers = async (req, res) => {
        res.render("admin/teachers");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    about = async (req, res) => {
        res.render("admin/about");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blogs = async (req, res) => {
        res.render("admin/blogs");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    contacts = async (req, res) => {
        res.render("admin/contacts");
    };
}

module.exports = new HomeController();
