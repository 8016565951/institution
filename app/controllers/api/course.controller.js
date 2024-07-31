const { MongooseError } = require("mongoose");
const {
    CResponse,
    handleError,
    unlinkFile,
    getDefaultImageUrl,
    generateFileURL,
    getFilePathFromURL,
} = require("../../lib/utils");
const { courseRepo } = require("../../repos");
const { AppError } = require("../../lib/helpers");
const { courseSchema } = require("../../lib/validations");

class CourseController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCourses = async (req, res) => {
        try {
            const courses = await courseRepo.get();

            return CResponse({
                res,
                message: "OK",
                data: courses,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCourseById = async (req, res) => {
        try {
            const { id } = req.params;
            const course = await courseRepo.getById(id);

            return CResponse({
                res,
                message: "OK",
                data: course,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    createCourse = async (req, res) => {
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

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError)) unlinkFile(req.file?.path);
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    deleteCourse = async (req, res) => {
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

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new CourseController();
