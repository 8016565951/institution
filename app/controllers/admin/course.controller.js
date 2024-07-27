const { MongooseError } = require("mongoose");
const { siteConfig } = require("../../config/site");
const {
    generateFileURL,
    getDefaultImageUrl,
    unlinkFile,
    getFilePathFromURL,
} = require("../../lib/utils");
const { courseSchema } = require("../../lib/validations");
const { courseRepo } = require("../../repos");
const { AppError } = require("../../lib/helpers");

class CourseController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courses = async (req, res) => {
        try {
            const courses = await courseRepo.get();

            return res.render("admin/courses", {
                title: `Courses | Admin Panel | ${siteConfig.name}`,
                courses,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    course = async (req, res) => {
        try {
            const { id } = req.params;
            const course = await courseRepo.getById(id);

            return res.render("admin/course", {
                title: `Course | Admin Panel | ${siteConfig.name}`,
                course,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createCourse = async (req, res) => {
        try {
            const { error, value } = courseSchema.validate(req.body);
            if (error) throw error;

            let thumbnailUrl = getDefaultImageUrl(req, "course");
            if (req.file)
                thumbnailUrl = generateFileURL(req, req.file.filename);

            await courseRepo.create({
                ...value,
                thumbnailUrl,
            });

            return res.redirect("/admin/courses");
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateCourse = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = courseSchema.validate(req.body);
            if (error) throw error;

            const existingCourse = await courseRepo.getById(id);
            if (!existingCourse)
                throw new AppError("Course not found", "NOT_FOUND");

            let thumbnailUrl = existingCourse.thumbnailUrl;
            if (req.file) {
                thumbnailUrl = generateFileURL(req, req.file.filename);
                await unlinkFile(
                    getFilePathFromURL(existingCourse.thumbnailUrl)
                );
            }

            await courseRepo.update(id, {
                ...value,
                thumbnailUrl,
            });

            return res.redirect("/admin/courses");
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteCourse = async (req, res) => {
        try {
            const { id } = req.params;

            const existingCourse = await courseRepo.getById(id);
            if (!existingCourse)
                throw new AppError("Course not found", "NOT_FOUND");

            await courseRepo.delete(id);
            await unlinkFile(getFilePathFromURL(existingCourse.thumbnailUrl));

            return res.redirect("/admin/courses");
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new CourseController();
