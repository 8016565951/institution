const { ROLES } = require("../config/const");
const { AppError } = require("../lib/helpers");
const { verifyJwt, getTokenFromHeader } = require("../lib/jwt");
const { handleJWTError, handleError } = require("../lib/utils");
const { userRepo } = require("../repos");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function isAPIAuthenticated(req, res, next) {
    try {
        const token = getTokenFromHeader(req);
        if (!token)
            throw new AppError(
                "You are not authenticated to access this route",
                "UNAUTHORIZED"
            );

        try {
            const payload = verifyJwt(token, process.env.JWT_SECRET);
            req.ctx = { ...req.ctx, user: payload };
            next();
        } catch (err) {
            return handleJWTError(err, res);
        }
    } catch (err) {
        return handleError(err, res);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function isSameUser(req, res, next) {
    try {
        const user = req.ctx?.user;
        if (!user)
            throw new AppError("You are not authenticated", "UNAUTHORIZED");

        const { id } = req.params;
        if (user.id !== id)
            throw new AppError(
                "You are not authorized to access this route",
                "FORBIDDEN"
            );

        next();
    } catch (err) {
        return handleError(err, res);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function isAdmin(req, res, next) {
    try {
        const uId = req.ctx?.user.id;
        if (!uId)
            throw new AppError("You are not authenticated", "UNAUTHORIZED");

        const user = await userRepo.getById(uId);
        if (!user) throw new AppError("User not found", "NOT_FOUND");

        if (![ROLES.ADMIN, ROLES.MOD].includes(user.role))
            throw new AppError(
                "You are not authorized to access this route",
                "FORBIDDEN"
            );

        next();
    } catch (err) {
        return handleError(err, res);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function isSameUserOrAdmin(req, res, next) {
    try {
        const uId = req.ctx?.user.id;
        if (!uId)
            throw new AppError("You are not authenticated", "UNAUTHORIZED");

        const user = await userRepo.getById(uId);
        if (!user) throw new AppError("User not found", "NOT_FOUND");

        const { id } = req.params;

        if (![ROLES.ADMIN, ROLES.MOD].includes(user.role) && user.id !== id)
            throw new AppError(
                "You are not authorized to access this route",
                "FORBIDDEN"
            );

        next();
    } catch (err) {
        return handleError(err, res);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function isTokenValid(req, res, next) {
    try {
        const { token } = req.query;
        if (!token) throw new AppError("Token is required", "BAD_REQUEST");

        try {
            const payload = verifyJwt(token, process.env.EMAIL_SECRET);
            req.ctx = { ...req.ctx, user: payload };
            next();
        } catch (err) {
            return handleJWTError(err, res);
        }
    } catch (err) {
        return handleError(err, res);
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function isTokenValidUI(req, res, next) {
    try {
        const { token } = req.query;
        if (!token) throw new AppError("Token is required", "BAD_REQUEST");

        try {
            const payload = verifyJwt(token, process.env.JWT_SECRET);
            req.ctx = { ...req.ctx, user: payload };
            next();
        } catch (err) {
            return console.error(err);
        }
    } catch (err) {
        return console.error(err);
    }
}

module.exports = {
    isTokenValid,
    isAPIAuthenticated,
    isSameUser,
    isAdmin,
    isSameUserOrAdmin,
    isTokenValidUI,
};
