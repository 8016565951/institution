const { Router } = require("express");
const { courseController } = require("../../controllers/api");
const { courseThumbnailUpload } = require("../../lib/multer");
const { isAPIAuthenticated, isAdmin } = require("../../middlewares/auth");

const courseRouter = Router();

courseRouter.get("/", isAPIAuthenticated, courseController.getCourses);
courseRouter.get("/:id", isAPIAuthenticated, courseController.getCourseById);

courseRouter.post(
    "/",
    isAPIAuthenticated,
    isAdmin,
    courseThumbnailUpload.single("thumbnail"),
    courseController.createCourse
);

courseRouter.patch(
    "/:id",
    isAPIAuthenticated,
    isAdmin,
    courseThumbnailUpload.single("thumbnail"),
    courseController.updateCourse
);

courseRouter.delete(
    "/:id",
    isAPIAuthenticated,
    isAdmin,
    courseController.deleteCourse
);

module.exports = courseRouter;
