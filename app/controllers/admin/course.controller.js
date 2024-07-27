const { CourseRepo } = require("../../repos/admin/index");
const { handleError } = require("../../lib/utils");

class CourseController {
    getCourses = async (req, res) => {
        try {
            const data = await CourseRepo.getCourses();
            res.redirect("/admin/course");
        } catch (err) {
            return handleError(err, res);
        }
    };

    getCourseById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await CourseRepo.getCourseById(id);
            res.render("admin/course", { data });
        } catch (err) {
            return handleError(err, res);
        }
    };
    createCourse = async (req, res) => {
        try {
            const { title, description, duration, price } = req.body;
            if (req.file) {
                req.body.thumbnailUrl = req.file.path;
            }
            await CourseRepo.createCourse({
                title,
                description,
                duration,
                price,
                thumbnailUrl,
            });
            res.redirect("/admin/course");
        } catch (err) {
            return handleError(err, res);
        }
    };
    updateCourse = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, duration, price } = req.body;
            if (req.file) {
                req.body.thumbnailUrl = req.file.path;
            }

            await CourseRepo.updateCourse(id, {
                title,
                description,
                duration,
                price,
                thumbnailUrl,
            });
            res.redirect("/admin/course");
        } catch (err) {
            return handleError(err, res);
        }
    };
    deleteCourse = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await CourseRepo.deleteCourse(id);
            res.redirect("/admin/course");
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new CourseController();
