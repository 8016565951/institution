const { ROLES, AUTH_TOKEN_COOKIE_NAME } = require("../config/const");
const { AppError } = require("../lib/helpers");
const {
    verifyJwt,
    getTokenFromHeader,
    getTokenFromCookie,
} = require("../lib/jwt");
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
function isUIAuthenticated(req, res, next) {
    try {
        if (req.originalUrl === "/admin/")
            return res.redirect("/admin/banners");

        const token = getTokenFromCookie(req);
        if (!token) return res.redirect("/auth/signin");

        try {
            const payload = verifyJwt(token, process.env.JWT_SECRET);
            req.ctx = { ...req.ctx, user: payload };
            next();
        } catch (err) {
            console.error(err);
            return res.redirect("/auth/signin");
        }
    } catch (err) {
        console.error(err);
        return res.redirect("/auth/signin");
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getUserFromToken(req, res, next) {
    try {
        const token = getTokenFromCookie(req);

        if (token) {
            try {
                const payload = verifyJwt(token, process.env.JWT_SECRET);

                const user = await userRepo.getById(payload.id);
                req.ctx = { ...req.ctx, user };

                next();
            } catch (err) {
                console.error(err);
                res.clearCookie(AUTH_TOKEN_COOKIE_NAME);
                next();
            }
        } else next();
    } catch (err) {
        console.error(err);
        next();
    }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function isAdminUI(req, res, next) {
    try {
        const uId = req.ctx?.user.id;
        if (!uId) return res.redirect("/auth/signin");

        const user = await userRepo.getById(uId);
        if (!user) return res.redirect("/auth/signin");

        if (![ROLES.ADMIN, ROLES.MOD].includes(user.role))
            return res.redirect("/");

        req.ctx = { ...req.ctx, user };

        next();
    } catch (err) {
        console.error(err);
        return res.redirect("/auth/signin");
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
            const payload = verifyJwt(token, process.env.EMAIL_SECRET);
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
    isUIAuthenticated,
    isSameUser,
    isAdmin,
    isAdminUI,
    isSameUserOrAdmin,
    isTokenValidUI,
    getUserFromToken,
};
