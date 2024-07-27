const { MongooseError } = require("mongoose");
const {
    JWT_EXPIRES_IN,
    AUTH_TOKEN_COOKIE_NAME,
    cookieOptions,
} = require("../../config/const");
const { siteConfig } = require("../../config/site");
const { hashPassword } = require("../../lib/bcrypt");
const { AppError } = require("../../lib/helpers");
const { signJWT } = require("../../lib/jwt");
const { mailSender } = require("../../lib/nodemailer");
const {
    generateFileURL,
    getDefaultImageUrl,
    unlinkFile,
} = require("../../lib/utils");
const { signUpSchema } = require("../../lib/validations");
const { userRepo } = require("../../repos");

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signUpPage = (req, res) => {
        return res.render("www/signup", {
            title: `Sign Up | ${siteConfig.name}`,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signInPage = (req, res) => {
        return res.render("www/signin", {
            title: `Sign In | ${siteConfig.name}`,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    verifyEmailPage = (req, res) => {
        return res.render("www/verify-email", {
            title: `Verify Email | ${siteConfig.name}`,
        });
    };

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
                isApi: false,
            });

            const token = signJWT(
                {
                    id: user.id,
                },
                process.env.JWT_SECRET,
                JWT_EXPIRES_IN
            );

            res.cookie(AUTH_TOKEN_COOKIE_NAME, token, cookieOptions);

            return res.redirect("/auth/verify-email");
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userRepo.getByEmail(email);
            if (!user) throw new AppError("User not found", "NOT_FOUND");

            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect)
                throw new AppError("Incorrect password", "UNAUTHORIZED");

            const token = signJWT(
                {
                    id: user.id,
                },
                process.env.JWT_SECRET,
                JWT_EXPIRES_IN
            );

            res.cookie(AUTH_TOKEN_COOKIE_NAME, token, cookieOptions);

            return res.redirect("/");
        } catch (err) {
            console.error(err);
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

            return res.redirect("/");
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signOut = async (req, res) => {
        try {
            res.clearCookie(AUTH_TOKEN_COOKIE_NAME);
            return res.redirect("/");
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new AuthController();
