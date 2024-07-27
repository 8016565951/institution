const express = require("express");
const { adminHomeController } = require("../../controllers/admin");
const Router = express.Router();

Router.get("/", adminHomeController.index);
Router.get("/home", adminHomeController.hero);
Router.get("/courses", adminHomeController.courses);
Router.get("/gallery", adminHomeController.gallery);
Router.get("/students", adminHomeController.students);
Router.get("/teachers", adminHomeController.teachers);
Router.get("/about", adminHomeController.about);
Router.get("/blogs", adminHomeController.blogs);
Router.get("/contacts", adminHomeController.contacts);

module.exports = Router;
