const { Router } = require("express");
const { courseController } = require("../../controllers/admin");

const courseRouter = Router();

courseRouter.get("/", courseController.coursesUI);
courseRouter.get("/:id", courseController.courseUI);
courseRouter.get("/create", courseController.createUI);
courseRouter.get("/:id/update", courseController.updateUI);

courseRouter.post("/create", courseController.create);
courseRouter.post("/:id/update", courseController.update);
courseRouter.post("/:id/delete", courseController.delete);

module.exports = courseRouter;
