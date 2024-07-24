const { Router } = require("express");
const courseController = require("../../controllers/api/course.controller");
const { courseThumbnailUpload } = require("../../lib/multer");
const courseRouter = Router();

courseRouter.get("/", courseController.getCourses);
courseRouter.get("/:id", courseController.getCourseById);
courseRouter.patch(
    "/:id",
    courseThumbnailUpload.single("thumbnailUrl"),
    courseController.updateCourse
);
courseRouter.delete("/:id", courseController.deleteCourse);
courseRouter.post(
    "/",
    courseThumbnailUpload.single("thumbnailUrl"),
    courseController.createCourse
);

module.exports = courseRouter;
