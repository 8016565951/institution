const PORT = process.env.PORT ?? 3001;

const AUTH_TOKEN_COOKIE_NAME = "institution__auth_SDRFasdrfa_532125";

const DEFAULT_AVATAR_PATH = "uploads/images/avatars/default_avatar.png";
const DEFAULT_COURSE_THUMBNAIL_PATH =
    "uploads/images/courses/default_thumbnail.png";
const DEFAULT_BLOG_THUMBNAIL_PATH =
    "uploads/images/blogs/default_thumbnail.png";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const JWT_EXPIRES_IN = "1d";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: 90 * 24 * 60 * 60 * 1000,
};

const ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    MOD: "mod",
    ADMIN: "admin",
};

const TIMESPANS = {
    DAY: "days",
    WEEK: "weeks",
    MONTH: "months",
    YEAR: "years",
};

module.exports = {
    PORT,
    AUTH_TOKEN_COOKIE_NAME,
    JWT_EXPIRES_IN,
    cookieOptions,
    ROLES,
    ACCEPTED_IMAGE_TYPES,
    DEFAULT_AVATAR_PATH,
    DEFAULT_COURSE_THUMBNAIL_PATH,
    DEFAULT_BLOG_THUMBNAIL_PATH,
    TIMESPANS,
};
