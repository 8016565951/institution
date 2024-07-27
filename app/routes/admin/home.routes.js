const { Router } = require("express");
const { homeController } = require("../../controllers/admin");

const homeRouter = Router();

homeRouter.get("/", homeController.index);
homeRouter.get("/home", homeController.hero);
homeRouter.get("/courses", homeController.courses);
homeRouter.get("/gallery", homeController.gallery);
homeRouter.get("/students", homeController.students);
homeRouter.get("/teachers", homeController.teachers);
// homeRouter.get("/about", homeController.about);
homeRouter.get("/blogs", homeController.blogs);
homeRouter.get("/contacts", homeController.contacts);

// forms
homeRouter.get("/update-about", homeController.updateAbout);
homeRouter.get("/create-courses", homeController.createCourses);

module.exports = homeRouter;
