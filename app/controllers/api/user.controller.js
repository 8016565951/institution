const { MongooseError } = require("mongoose");
const { AppError } = require("../../lib/helpers");
const {
    handleError,
    unlinkFile,
    generateFileURL,
    CResponse,
    getDefaultImageUrl,
    getFilePathFromURL,
} = require("../../lib/utils");
const { userRepo } = require("../../repos");
const { updateUserRoleSchema } = require("../../lib/validations/user");

class UserController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getUsers = async (req, res) => {
        try {
            const users = await userRepo.getUsers();

            return CResponse({
                res,
                message: "OK",
                data: users,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getStudents = async (req, res) => {
        try {
            const students = await userRepo.getStudents();

            return CResponse({
                res,
                message: "OK",
                data: students,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getTeachers = async (req, res) => {
        try {
            const teachers = await userRepo.getTeachers();

            return CResponse({
                res,
                message: "OK",
                data: teachers,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getUserById = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await userRepo.getById(id);
            if (!user) throw new AppError("User not found", "NOT_FOUND");

            return CResponse({
                res,
                message: "OK",
                data: user,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getStudentById = async (req, res) => {
        try {
            const { id } = req.params;

            const student = await userRepo.getStudentById(id);
            if (!student) throw new AppError("Student not found", "NOT_FOUND");

            return CResponse({
                res,
                message: "OK",
                data: student,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getTeacherById = async (req, res) => {
        try {
            const { id } = req.params;

            const teacher = await userRepo.getTeacherById(id);
            if (!teacher) throw new AppError("Teacher not found", "NOT_FOUND");

            return CResponse({
                res,
                message: "OK",
                data: teacher,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateAvatar = async (req, res) => {
        try {
            const { id } = req.params;

            const file = req.file;
            if (!file) throw new AppError("No file uploaded", "BAD_REQUEST");

            const existingUser = await userRepo.getById(id);
            if (!existingUser) {
                await unlinkFile(file.path);
                throw new AppError("User not found", "NOT_FOUND");
            }

            const avatarUrl = generateFileURL(req, file);
            await userRepo.updateAvatar(id, avatarUrl);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateRole = async (req, res) => {
        try {
            const { id } = req.params;
            const { error, value } = updateUserRoleSchema.validate(req.body);
            if (error) throw error;

            const { role } = value;

            const existingUser = await userRepo.getById(id);
            if (!existingUser)
                throw new AppError("User not found", "NOT_FOUND");

            if (existingUser.role === role)
                throw new AppError("User already has this role", "BAD_REQUEST");

            await userRepo.updateRole(id, role);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;

            const existingUser = await userRepo.getById(id);
            if (!existingUser)
                throw new AppError("User not found", "NOT_FOUND");

            if (existingUser.avatarUrl !== getDefaultImageUrl(req, "avatar"))
                await unlinkFile(getFilePathFromURL(existingUser.avatarUrl));

            await userRepo.deleteUser(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new UserController();
