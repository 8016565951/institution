const PORT = process.env.PORT ?? 3001;
const AUTH_TOKEN_COOKIE_NAME = "institution__auth_SDRFasdrfa_532125";
const DEFAULT_AVATAR_PATH = "uploads/images/avatars/default_avatar.png";
const JWT_EXPIRES_IN = "90d";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: 90 * 24 * 60 * 60 * 1000,
};

const siteConfig = {
    name: "Institution",
    description: "Best Institution in the world",
    owner: "Institution",
    emails: {
        support: "support@institution.com",
    },
};

const USER_ROLES = {
    USER: "user",
    MOD: "mod",
    ADMIN: "admin",
};

module.exports = {
    PORT,
    AUTH_TOKEN_COOKIE_NAME,
    DEFAULT_AVATAR_PATH,
    JWT_EXPIRES_IN,
    cookieOptions,
    siteConfig,
    USER_ROLES,
};
