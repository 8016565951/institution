const { Router } = require("express");
const { teacherController } = require("../../controllers/api");
const { avatarUpload } = require("../../lib/multer");
const teacherRouter = Router();

teacherRouter.get("/", teacherController.getTeachers);
teacherRouter.get("/:id", teacherController.getTeacherById);

teacherRouter.patch(
    "/:id",
    avatarUpload.single("avatar"),
    teacherController.updateTeacher
);

teacherRouter.delete("/:id", teacherController.deleteTeacher);

module.exports = teacherRouter;
