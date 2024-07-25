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

class CourseController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCourses = async (req, res) => {
        try {
            const courses = await courseRepo.getCourses();

            return CResponse({
                res,
                message: "OK",
                data: courses,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCourseById = async (req, res) => {
        try {
            const { id } = req.params;
            const course = await courseRepo.getCourseById(id);

            return CResponse({
                res,
                message: "OK",
                data: course,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    createCourse = async (req, res) => {
        try {
            const { title, description, duration, price } = req.body;

            let thumbnailUrl = getDefaultImageUrl(req, "course");
            if (req.file) thumbnailUrl = generateFileURL(req, req.file);

            await courseRepo.createCourse({
                title,
                description,
                duration,
                price,
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file.path);
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateCourse = async (req, res) => {
        try {
            const { id } = req.params;

            const { title, description, duration, price } = req.body;

            const existingCourse = await courseRepo.getCourseById(id);
            if (!existingCourse)
                throw new AppError("Course not found", "NOT_FOUND");

            let thumbnailUrl = existingCourse.thumbnailUrl;
            if (req.file) {
                thumbnailUrl = generateFileURL(req, req.file);
                await unlinkFile(
                    getFilePathFromURL(existingCourse.thumbnailUrl)
                );
            }

            await courseRepo.updateCourse(id, {
                title,
                description,
                duration,
                price,
                thumbnailUrl,
            });

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file.path);
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    deleteCourse = async (req, res) => {
        try {
            const { id } = req.params;

            const existingCourse = await courseRepo.getCourseById(id);
            if (!existingCourse)
                throw new AppError("Course not found", "NOT_FOUND");

            await unlinkFile(getFilePathFromURL(existingCourse.thumbnailUrl));
            await courseRepo.deleteCourse(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new CourseController();
