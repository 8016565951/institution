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
    coursesUI = async (req, res) => {
        try {
            const user = req.ctx?.user;
            const courses = await courseRepo.get();

            return res.render("admin/courses", {
                title: `Courses | Admin Panel | ${siteConfig.name}`,
                courses,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    courseUI = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.ctx?.user;

            const course = await courseRepo.getById(id);

            return res.render("admin/course", {
                title: `Course | Admin Panel | ${siteConfig.name}`,
                course,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createUI = async (req, res) => {
        try {
            const user = req.ctx?.user;

            return res.render("admin/course-create", {
                title: `Create Course | Admin Panel | ${siteConfig.name}`,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateUI = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.ctx?.user;

            const course = await courseRepo.getById(id);
            if (!course) throw new AppError("Course not found", "NOT_FOUND");

            return res.render("admin/course-update", {
                title: `Update Course | Admin Panel | ${siteConfig.name}`,
                course,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    create = async (req, res) => {
        try {
            const { error, value } = courseSchema.validate(req.body);
            if (error) throw error;

            let thumbnailUrl = getDefaultImageUrl(req, "course");
            if (req.file) thumbnailUrl = generateFileURL(req, req.file);

            await courseRepo.create({
                ...value,
                duration: {
                    ...value.duration,
                    number: +value.duration.number,
                },
                price: +value.price,
                thumbnailUrl,
            });

            return res.redirect("/admin/courses");
        } catch (err) {
            if (!(err instanceof MongooseError)) unlinkFile(req.file?.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    update = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = courseSchema.validate(req.body);
            if (error) throw error;

            const existingCourse = await courseRepo.getById(id);
            if (!existingCourse)
                throw new AppError("Course not found", "NOT_FOUND");

            let thumbnailUrl = existingCourse.thumbnailUrl;
            if (req.file) {
                thumbnailUrl = generateFileURL(req, req.file);
                if (
                    existingCourse.thumbnailUrl !==
                    getDefaultImageUrl(req, "course")
                )
                    unlinkFile(getFilePathFromURL(existingCourse.thumbnailUrl));
            }

            await courseRepo.update(id, {
                ...value,
                thumbnailUrl,
            });

            return res.redirect("/admin/courses");
        } catch (err) {
            if (!(err instanceof MongooseError)) unlinkFile(req.file?.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    delete = async (req, res) => {
        try {
            const { id } = req.params;

            const existingCourse = await courseRepo.getById(id);
            if (!existingCourse)
                throw new AppError("Course not found", "NOT_FOUND");

            if (
                existingCourse.thumbnailUrl !==
                getDefaultImageUrl(req, "course")
            )
                unlinkFile(getFilePathFromURL(existingCourse.thumbnailUrl));

            await courseRepo.delete(id);

            return res.redirect("/admin/courses");
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new CourseController();
