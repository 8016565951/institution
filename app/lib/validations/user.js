const Joi = require("joi");
const { ROLES } = require("../../config/const");

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    avatarUrl: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        )
        .messages({
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        }),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        country: Joi.string().required(),
    }),
    isVerified: Joi.boolean(),
    role: Joi.string().valid(...Object.values(ROLES)),
});

const updateUserRoleSchema = Joi.object({
    role: Joi.string().valid(...Object.values(ROLES)),
});

module.exports = {
    userSchema,
    updateUserRoleSchema,
};
