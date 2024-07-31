const { MulterError } = require("multer");
const { AppError } = require("./helpers");
const { MongooseError } = require("mongoose");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("joi");
const { existsSync, unlinkSync } = require("fs");
const path = require("path");
const { logger } = require("./helpers");
const {
    DEFAULT_AVATAR_PATH,
    DEFAULT_BLOG_THUMBNAIL_PATH,
    DEFAULT_COURSE_THUMBNAIL_PATH,
} = require("../config/const.js");

/**
 * @param {unknown} err
 */
function sanitizeError(err) {
    if (err instanceof AppError) return err.message;
    else if (err instanceof ValidationError)
        return err.details.map((e) => e.message);
    else if (err instanceof MulterError) return err.message;
    else if (err instanceof MongooseError) return err.message;
    else if (err instanceof jwt.NotBeforeError)
        return err.message + ", the token is not yet valid";
    else if (err instanceof jwt.TokenExpiredError)
        return err.message + ", the token has expired";
    else if (err instanceof jwt.JsonWebTokenError)
        return err.message + ", the token is invalid";
    else if (err instanceof Error) return err.message;
    else return "Unknown error";
}

/**
 * @param {unknown} err
 * @param {import("express").Response} res
 */
function handleJWTError(err, res) {
    if (err instanceof jwt.NotBeforeError)
        return CResponse({
            res,
            message: "UNAUTHORIZED",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof jwt.TokenExpiredError)
        return CResponse({
            res,
            message: "UNAUTHORIZED",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof jwt.JsonWebTokenError)
        return CResponse({
            res,
            message: "UNAUTHORIZED",
            longMessage: sanitizeError(err),
        });
    else
        return CResponse({
            res,
            message: "UNAUTHORIZED",
            longMessage: sanitizeError(err),
        });
}

/**
 * @param {unknown} err
 * @param {import("express").Response} res
 */
function handleError(err, res) {
    logger.error(err);

    if (err instanceof AppError)
        return CResponse({
            res,
            message: err.status,
            longMessage: sanitizeError(err),
        });
    else if (err instanceof ValidationError)
        return CResponse({
            res,
            message: "BAD_REQUEST",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof MulterError)
        return CResponse({
            res,
            message: "BAD_REQUEST",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof MongooseError)
        return CResponse({
            res,
            message: "ERROR",
            longMessage: sanitizeError(err),
        });
    else if (err instanceof Error)
        return CResponse({
            res,
            message: "ERROR",
            longMessage: sanitizeError(err),
        });
    else
        return CResponse({
            res,
            message: "INTERNAL_SERVER_ERROR",
            longMessage: sanitizeError(err),
        });
}

/**
 * @param {Object} options
 * @param {import("express").Response} options.res
 * @param {import("zod").z.infer<typeof import("./validations/index.js").responseMessages>} options.message
 * @param {string} [options.longMessage]
 * @param {any} [options.data]
 */
function CResponse({ res, message, longMessage, data }) {
    let code;
    let status = false;

    switch (message) {
        case "OK":
            code = 200;
            status = true;
            break;
        case "ERROR":
            code = 400;
            break;
        case "UNAUTHORIZED":
            code = 401;
            break;
        case "CONFLICT":
            code = 409;
            break;
        case "FORBIDDEN":
            code = 403;
            break;
        case "NOT_FOUND":
            code = 404;
            break;
        case "BAD_REQUEST":
            code = 400;
            break;
        case "TOO_MANY_REQUESTS":
            code = 429;
            break;
        case "INTERNAL_SERVER_ERROR":
            code = 500;
            break;
        case "SERVICE_UNAVAILABLE":
            code = 503;
            break;
        case "GATEWAY_TIMEOUT":
            code = 504;
            break;
        case "UNKNOWN_ERROR":
            code = 500;
            break;
        case "UNPROCESSABLE_ENTITY":
            code = 422;
            break;
        case "NOT_IMPLEMENTED":
            code = 501;
            break;
        case "CREATED":
            code = 201;
            status = true;
            break;
        case "BAD_GATEWAY":
            code = 502;
            break;
        default:
            code = 500;
            break;
    }

    return res.status(code).json({
        status,
        message,
        longMessage,
        data,
    });
}

function generateDbUrl() {
    const { DB_PROTOCOL, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } =
        process.env;
    return `${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
}

/**
 * @param {string} [filePath]
 */
function unlinkFile(filePath) {
    if (!filePath) return;
    if (existsSync(filePath)) unlinkSync(filePath);
}

/**
 * @param {import("express").Request} req
 * @param {Express.Multer.File} file
 */
function generateFileURL(req, file) {
    return `${req.protocol}://${req.get("host")}/${file.path.replace(
        /\\/g,
        "/"
    )}`;
}

/**
 * @param {string} url
 */
function getFilePathFromURL(url) {
    return "uploads/" + url.split("/uploads/")[1];
}

/**
 *
 * @param {Express.Multer.File} file
 * @param {string} prefix
 * @returns
 */
function generateFilename(file, prefix = "item") {
    const ext = path.extname(file.originalname);
    return `${prefix}_${Date.now()}${ext}`;
}

/**
 * @param {import("express").Request} req
 * @param {"avatar" | "blog" | "course"} [type]
 */
function getDefaultImageUrl(req, type = "avatar") {
    let imagePath;

    switch (type) {
        case "avatar":
            imagePath = DEFAULT_AVATAR_PATH;
            break;
        case "blog":
            imagePath = DEFAULT_BLOG_THUMBNAIL_PATH;
            break;
        case "course":
            imagePath = DEFAULT_COURSE_THUMBNAIL_PATH;
            break;
        default:
            imagePath = DEFAULT_AVATAR_PATH;
            break;
    }

    return `${req.protocol}://${req.get("host")}/${imagePath}`;
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

/**
 * @param {string} text
 * @param {string} separator
 */
function slugify(text, separator = "-") {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, separator);
}

module.exports = {
    generateDbUrl,
    handleError,
    handleJWTError,
    CResponse,
    sanitizeError,
    unlinkFile,
    generateFileURL,
    getFilePathFromURL,
    generateFilename,
    getDefaultImageUrl,
    generateOTP,
    slugify,
};
