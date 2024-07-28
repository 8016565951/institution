const { Router } = require("express");
const { courseController } = require("../../controllers/admin");
const { courseThumbnailUpload } = require("../../lib/multer");

const courseRouter = Router();

courseRouter.get("/", courseController.coursesUI);
courseRouter.get("/create", courseController.createUI);
courseRouter.get("/:id", courseController.courseUI);
courseRouter.get("/:id/update", courseController.updateUI);

courseRouter.post("/create",courseThumbnailUpload.single("thumbnail"), courseController.create);
courseRouter.post("/:id/update",courseThumbnailUpload.single("thumbnail"), courseController.update);
courseRouter.post("/:id/delete", courseController.delete);

module.exports = courseRouter;
