const { siteConfig, menu } = require("../../config/site");
const about = require("../../models/About");
const user = require("../../models/User");
const course = require("../../models/Course");
const gallery = require("../../models/Gallery");
const contact = require("../../models/Contact");
const blog=require("../../models/Blog")
const comment=require("../../models/Comment")
const category=require("../../models/Category")

class HomeController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    home =async (req, res) => {
        const About = await about.find();
        const galleries = await gallery.find();
        return res.render("www/home", {
            title: `Home | ${siteConfig.name}`,
            siteConfig,
            menu,
            about:About,
            galleries
            
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    about = async (req, res) => {
        const About = await about.find();
        const users = await user.find();
        res.render("www/about", {
            title: `About | ${siteConfig.name}`,
            siteConfig,
            menu,
            about: About,
            users,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courses = async (req, res) => {
        const courses = await course.find();
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
        const galleries = await gallery.find();
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
        const con = await contact.find();
        res.render("www/contact", {
            title: `Contact | ${siteConfig.name}`,
            siteConfig,
            menu,
            contact: con,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    blogs = async(req, res) => {
        const Blog=await blog.find().populate('users').populate('comments')
        const categories=await category.find()
    
        res.render("www/blogs", {
            title: `Blogs | ${siteConfig.name}`,
            siteConfig,
            menu,
            blogs:Blog,
            categories
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
