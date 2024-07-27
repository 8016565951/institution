class adminHomeController {
    index = async (req, res) => {
        res.render("admin/index");
    };

    hero = async (req, res) => {
        res.render("admin/hero");
    };

    courses = async (req, res) => {
        res.render("admin/courses");
    };

    gallery = async (req, res) => {
        res.render("admin/gallery");
    };

    students = async (req, res) => {
        res.render("admin/students");
    };

    teachers = async (req, res) => {
        res.render("admin/teachers");
    };
    about = async (req, res) => {
        res.render("admin/about");
    };
    blogs = async (req, res) => {
        res.render("admin/blogs");
    };
    contacts = async (req, res) => {
        res.render("admin/contacts");
    };
}

module.exports = new adminHomeController();
