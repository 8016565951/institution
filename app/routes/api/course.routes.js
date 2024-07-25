const { Router } = require("express");
const { courseController } = require("../../controllers/api");
const { courseThumbnailUpload } = require("../../lib/multer");

const courseRouter = Router();

courseRouter.get("/", courseController.getCourses);
courseRouter.get("/:id", courseController.getCourseById);

courseRouter.post(
    "/create",
    courseThumbnailUpload.single("thumbnailUrl"),
    courseController.createCourse
);

courseRouter.patch(
    "/:id",
    courseThumbnailUpload.single("thumbnailUrl"),
    courseController.updateCourse
);

courseRouter.delete("/:id", courseController.deleteCourse);

module.exports = courseRouter;
