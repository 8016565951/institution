const {
    JWT_EXPIRES_IN,
    AUTH_TOKEN_COOKIE_NAME,
    cookieOptions,
} = require("../../config/const");
const { AppError } = require("../../lib/helpers");
const { signJWT } = require("../../lib/jwt");
const { mailSender } = require("../../lib/nodemailer");
const {
    handleError,
    CResponse,
    getDefaultImageUrl,
    generateFileURL,
    unlinkFile,
} = require("../../lib/utils");
const { signUpSchema, signInSchema } = require("../../lib/validations");
const { studentRepo, parentRepo } = require("../../repos");
const { hashPassword, comparePasswords } = require("../../lib/bcrypt");
const { MongooseError } = require("mongoose");

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signUp = async (req, res) => {
        try {
            const { error, value } = signUpSchema.validate(req.body);
            if (error) throw error;

            const { parent, ...rest } = value;

            const existingStudent = await studentRepo.getStudentByEmail(
                rest.email
            );
            if (existingStudent)
                throw new AppError(
                    "A student with this email already exists",
                    "CONFLICT"
                );

            let avatarUrl = getDefaultImageUrl(req, "avatar");
            if (req.file) avatarUrl = generateFileURL(req, req.file);

            const hashedPassword = await hashPassword(rest.password);

            const newParent = await parentRepo.createParent(parent);

            const student = await studentRepo.createStudent({
                ...rest,
                password: hashedPassword,
                avatarUrl,
                parentId: newParent.id,
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
                longMessage:
                    "A verification email has been sent to your email address. Please verify your email to continue.",
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
    signIn = async (req, res) => {
        try {
            const { error, value } = signInSchema.validate(req.body);
            if (error) throw error;

            const { email, password } = value;

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

    verifyEmail = async (req, res) => {
        try {
            const id = req.ctx?.user.id;
            if (!id)
                throw new AppError(
                    "Invalid token. Please sign up again",
                    "BAD_REQUEST"
                );

            const student = await studentRepo.getStudentById(id);
            if (!student) throw new AppError("Invalid token", "BAD_REQUEST");

            if (student.isVerified)
                throw new AppError("Email is already verified", "BAD_REQUEST");

            student.isVerified = true;
            await student.save();

            mailSender.sendEmailVerified({
                user: {
                    email: student.email,
                    username: student.firstName + " " + student.lastName,
                },
            });

            return CResponse({
                res,
                message: "OK",
                longMessage: "Your email has been verified",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new AuthController();
