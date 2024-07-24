const { Router } = require("express");
const { teacherController } = require("../../controllers/api");
const teacherRouter = Router();

teacherRouter.get("/", teacherController.getTeachers);
teacherRouter.get("/:id", teacherController.getTeacherById);
teacherRouter.patch("/:id", teacherController.updateTeacher);
teacherRouter.delete("/:id", teacherController.deleteTeacher);

module.exports = teacherRouter;
