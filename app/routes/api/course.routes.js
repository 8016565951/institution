const { Router } = require("express");
const { courseController } = require("../../controllers/api");
const { courseThumbnailUpload } = require("../../lib/multer");
const { isAPIAuthenticated } = require("../../middlewares/auth");

const courseRouter = Router();

courseRouter.get("/", isAPIAuthenticated, courseController.getCourses);
courseRouter.get("/:id", isAPIAuthenticated, courseController.getCourseById);

courseRouter.post(
    "/",
    isAPIAuthenticated,
    courseThumbnailUpload.single("thumbnail"),
    courseController.createCourse
);

courseRouter.patch(
    "/:id",
    isAPIAuthenticated,
    courseThumbnailUpload.single("thumbnail"),
    courseController.updateCourse
);

courseRouter.delete("/:id", isAPIAuthenticated, courseController.deleteCourse);

module.exports = courseRouter;
