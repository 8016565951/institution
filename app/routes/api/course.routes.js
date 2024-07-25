const { Router } = require("express");
const { courseController } = require("../../controllers/api");
const { courseThumbnailUpload } = require("../../lib/multer");

const courseRouter = Router();

courseRouter.get("/", courseController.getCourses);
courseRouter.get("/:id", courseController.getCourseById);

courseRouter.post(
    "/",
    courseThumbnailUpload.single("thumbnail"),
    courseController.createCourse
);

courseRouter.patch(
    "/:id",
    courseThumbnailUpload.single("thumbnail"),
    courseController.updateCourse
);

courseRouter.delete("/:id", courseController.deleteCourse);

module.exports = courseRouter;
