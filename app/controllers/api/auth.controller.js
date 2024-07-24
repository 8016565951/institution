const {
    JWT_EXPIRES_IN,
    AUTH_TOKEN_COOKIE_NAME,
    cookieOptions,
} = require("../../config/const");
const { AppError } = require("../../lib/helpers");
const { signJWT } = require("../../lib/jwt");
const { mailSender } = require("../../lib/nodemailer");
const { handleError, CResponse } = require("../../lib/utils");
const { signUpSchema } = require("../../lib/validations");
const { studentRepo } = require("../../repos");
const { hashPassword, comparePasswords } = require("../../lib/bcrypt");

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signUp = async (req, res) => {
        try {
            const { error, value } = signUpSchema.validate(req.body);
            if (error) throw error;

            const existingStudent = await studentRepo.getStudentByEmail(
                value.email
            );
            if (existingStudent)
                throw new AppError(
                    "A student with this email already exists",
                    "CONFLICT"
                );

            const hashedPassword = await hashPassword(value.password);

            const student = await studentRepo.createStudent({
                ...value,
                password: hashedPassword,
            });

            mailSender.sendVerificationEmail({
                req,
                user: {
                    id: student.id,
                    email: student.email,
                    username: student.firstName + " " + student.lastName,
                },
            });

            const token = signJWT(
                {
                    id: student.id,
                },
                process.env.JWT_SECRET,
                JWT_EXPIRES_IN
            );

            res.cookie(AUTH_TOKEN_COOKIE_NAME, token, cookieOptions);

            return CResponse({
                res,
                message: "CREATED",
                longMessage: "Student created successfully",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;

            const student = await studentRepo.getStudentByEmail(email);
            if (!student)
                throw new AppError("Invalid email or password", "UNAUTHORIZED");

            const isPasswordValid = await comparePasswords(
                password,
                student.password
            );
            if (!isPasswordValid)
                throw new AppError("Invalid email or password", "UNAUTHORIZED");

            const token = signJWT(
                {
                    id: student.id,
                },
                process.env.JWT_SECRET,
                JWT_EXPIRES_IN
            );

            res.cookie(AUTH_TOKEN_COOKIE_NAME, token, cookieOptions);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new AuthController();
