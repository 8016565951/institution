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
const {
    signUpSchema,
    signInSchema,
    updateEmailSchema,
} = require("../../lib/validations");
const { hashPassword, comparePasswords } = require("../../lib/bcrypt");
const { MongooseError } = require("mongoose");
const { userRepo } = require("../../repos");

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signUp = async (req, res) => {
        try {
            const { error, value } = signUpSchema.validate(req.body);
            if (error) throw error;

            const existingUser = await userRepo.getByEmail(value.email);
            if (existingUser)
                throw new AppError(
                    "A user with this email already exists",
                    "CONFLICT"
                );

            let avatarUrl = getDefaultImageUrl(req, "avatar");
            if (req.file) avatarUrl = generateFileURL(req, req.file);

            const hashedPassword = await hashPassword(value.password);

            const user = await userRepo.create({
                ...value,
                password: hashedPassword,
                avatarUrl,
            });

            mailSender.sendVerificationEmail({
                req,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.firstName + " " + user.lastName,
                },
            });

            const token = signJWT(
                {
                    id: user.id,
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

            const existingUser = await userRepo.getByEmail(email);
            if (!existingUser)
                throw new AppError("Invalid email or password", "UNAUTHORIZED");

            const isPasswordValid = await comparePasswords(
                password,
                existingUser.password
            );
            if (!isPasswordValid)
                throw new AppError("Invalid email or password", "UNAUTHORIZED");

            const token = signJWT(
                {
                    id: existingUser.id,
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

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    verifyEmail = async (req, res) => {
        try {
            const id = req.ctx?.user.id;
            if (!id)
                throw new AppError(
                    "Invalid token. Please sign up again",
                    "BAD_REQUEST"
                );

            const existingUser = await userRepo.getById(id);
            if (!existingUser)
                throw new AppError("Invalid token", "BAD_REQUEST");

            if (existingUser.isVerified)
                throw new AppError("Email is already verified", "BAD_REQUEST");

            await userRepo.updateVerification(id, true);

            mailSender.sendEmailVerified({
                user: {
                    email: existingUser.email,
                    username:
                        existingUser.firstName + " " + existingUser.lastName,
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

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateEmail = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = updateEmailSchema.validate(req.body);
            if (error) throw error;

            const { email, password } = value;

            const existingUserWithId = await userRepo.getById(id);
            if (!existingUserWithId)
                throw new AppError("User not found", "NOT_FOUND");

            const existingUserWithEmail = await userRepo.getByEmail(email);
            if (existingUserWithEmail)
                throw new AppError(
                    "Another user with this email exists",
                    "BAD_REQUEST"
                );

            if (existingUserWithId.email === email)
                throw new AppError(
                    "You are already using this email",
                    "BAD_REQUEST"
                );

            const isPasswordValid = await comparePasswords(
                password,
                existingUserWithId.password
            );
            if (!isPasswordValid)
                throw new AppError("Invalid password", "BAD_REQUEST");

            await mailSender.sendUpdateMailEmail({
                user: {
                    id,
                    email,
                },
            });

            return CResponse({
                res,
                message: "OK",
                longMessage: "An OTP has been sent to your email",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    verifyNewEmail = async (req, res) => {
        try {
            const user = req.ctx?.user;
            if (!user) throw new AppError("Invalid token", "BAD_REQUEST");

            const { id, email } = user;

            const existingUser = await userRepo.getById(id);
            if (!existingUser)
                throw new AppError("Invalid token", "BAD_REQUEST");

            if (existingUser.email === email)
                throw new AppError(
                    "You are already using this email",
                    "BAD_REQUEST"
                );

            await userRepo.updateEmail(id, email);

            return CResponse({
                res,
                message: "OK",
                longMessage: "Your email has been updated",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signOut = (req, res) => {
        try {
            res.clearCookie(AUTH_TOKEN_COOKIE_NAME, cookieOptions);

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
