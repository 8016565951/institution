const { mkdirSync, existsSync } = require("fs");
const multer = require("multer");
const { generateFilename } = require("../utils");
const { AppError } = require("../helpers");
const { ACCEPTED_IMAGE_TYPES } = require("../../config/const");

const dir = "uploads/images/avatars/";

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, dir),
    filename: (_, file, cb) => cb(null, generateFilename(file)),
});

const avatarUpload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
    },
    fileFilter: (_, file, cb) => {
        if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype))
            return cb(new AppError("Invalid file type", "BAD_REQUEST"));

        cb(null, true);
    },
});

module.exports = avatarUpload;
