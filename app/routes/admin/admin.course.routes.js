const { Router } = require("express");
const { courseController } = require("../../controllers/admin");

const courseRouter = Router();

courseRouter.get("/courses", courseController.courses);
courseRouter.get("/course/:id", courseController.course);
courseRouter.post("/course", courseController.createCourse);
courseRouter.patch("/course/:id", courseController.updateCourse);
courseRouter.delete("/course/:id", courseController.deleteCourse);

module.exports = courseRouter;
