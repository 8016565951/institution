const { CResponse, handleError } = require("../../lib/utils");
const { courseRepo } = require("../../repos");
const fs = require("fs");

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
     * @param {import("express").Response} res
     */
    updateCourse = async (req, res) => {
        try {
            const { id } = req.params;

            const { title, description, duration, price } = req.body;
            if (req.file) {
                const olderimage = req.body.thumbnailUrl;

                if (olderimage) {
                    fs.unlinkSync(olderimage);
                }

                const thumbnailUrl = req.file.path;

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
            } else {
                await courseRepo.updateCourse(id, {
                    title,
                    description,
                    duration,
                    price,
                });
                return CResponse({
                    res,
                    message: "OK",
                });
            }
        } catch (err) {
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
            await courseRepo.deleteCourse(id);
            if (req.body.thumbnailUrl) {
                fs.unlinkSync(req.body.olderimage);
            }
            return CResponse({
                res,
                message: "OK",
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
            if (req.file) {
                const thumbnailUrl = req.file.path;
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
            } else {
                await courseRepo.createCourse({
                    title,
                    description,
                    duration,
                    price,
                });
                return CResponse({
                    res,
                    message: "OK",
                });
            }
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new CourseController();
