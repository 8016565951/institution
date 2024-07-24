const PORT = process.env.PORT ?? 3001;

const AUTH_TOKEN_COOKIE_NAME = "institution__auth_SDRFasdrfa_532125";

const DEFAULT_AVATAR_PATH = "uploads/images/avatars/default_avatar.png";
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
    PARENT: "parent",
    TEACHER: "teacher",
    MOD: "mod",
    ADMIN: "admin",
};

module.exports = {
    PORT,
    AUTH_TOKEN_COOKIE_NAME,
    DEFAULT_AVATAR_PATH,
    JWT_EXPIRES_IN,
    cookieOptions,
    ROLES,
    ACCEPTED_IMAGE_TYPES,
};
