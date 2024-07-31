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
const { updatePasswordSchema } = require("../../lib/validations");
const { comparePasswords, hashPassword } = require("../../lib/bcrypt");
const { mailSender } = require("../../lib/nodemailer");

class UserController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getUsers = async (req, res) => {
        try {
            const { type } = req.query;
            let users;

            switch (type) {
                case "student":
                    users = await userRepo.getStudents();
                    break;

                case "teacher":
                    users = await userRepo.getTeachers();
                    break;

                default:
                    users = await userRepo.getUsers();
                    break;
            }

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
    getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const { type } = req.query;

            let user;

            switch (type) {
                case "student":
                    user = await userRepo.getStudentById(id);
                    break;

                case "teacher":
                    user = await userRepo.getTeacherById(id);
                    break;

                default:
                    user = await userRepo.getById(id);
                    break;
            }

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
    updateAvatar = async (req, res) => {
        try {
            const { id } = req.params;

            const file = req.file;
            if (!file) throw new AppError("No file uploaded", "BAD_REQUEST");

            const existingUser = await userRepo.getById(id);
            if (!existingUser) {
                unlinkFile(file.path);
                throw new AppError("User not found", "NOT_FOUND");
            }

            const avatarUrl = generateFileURL(req, file);
            await userRepo.updateAvatar(id, avatarUrl);

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
    updatePassword = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = updatePasswordSchema.validate(req.body);
            if (error) throw error;

            const { currentPassword, newPassword } = value;

            const existingUser = await userRepo.getById(id);
            if (!existingUser)
                throw new AppError("User not found", "NOT_FOUND");

            const isPasswordValid = await comparePasswords(
                currentPassword,
                existingUser.password
            );
            if (!isPasswordValid)
                throw new AppError("Invalid password", "BAD_REQUEST");

            const hashedPassword = await hashPassword(newPassword);

            await userRepo.updatePassword(id, hashedPassword);

            mailSender.sendForgetPasswordStep2Email({
                user: {
                    email: existingUser.email,
                    username:
                        existingUser.firstName + " " + existingUser.lastName,
                },
            });

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
                unlinkFile(getFilePathFromURL(existingUser.avatarUrl));

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
