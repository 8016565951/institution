const { AppError } = require("../lib/helpers");
const { verifyJwt } = require("../lib/jwt");
const { handleJWTError, handleError } = require("../lib/utils");

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

module.exports = { isTokenValid };
