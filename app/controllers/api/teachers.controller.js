const { CResponse, handleError } = require("../../lib/utils");
const { teacherRepo } = require("../../repos");

class TeachersController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getTeachers = async (req, res) => {
        try {
            const teachers = await teacherRepo.getTeachers();

            return CResponse({
                res,
                message: "OK",
                data: teachers,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getTeacherById = async (req, res) => {
        try {
            const { id } = req.params;
            const teacher = await teacherRepo.getTeacherById(id);

            return CResponse({
                res,
                message: "OK",
                data: teacher,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateTeacher = async (req, res) => {
        try {
            const { id } = req.params;

            const {
                firstName,
                middleName,
                lastName,
                email,
                password,
                phone,
                dob,
                address: { street, city, state, zipCode, country },
            } = req.body;

            await teacherRepo.updateTeacher(id, {
                firstName,
                middleName,
                lastName,
                email,
                password,
                phone,
                dob,
                address: {
                    street,
                    city,
                    state,
                    zipCode,
                    country,
                },
            });

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
     * @param {import("express").Response} res
     */
    deleteTeacher = async (req, res) => {
        try {
            const { id } = req.params;
            await teacherRepo.deleteTeacher(id);
            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new TeachersController();
