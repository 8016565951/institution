const Joi = require("joi");

const signUpSchema = Joi.object({
    name: Joi.string().required(),
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
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
            "any.only": "Password and confirm password do not match.",
        }),
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        ),
});

module.exports = {
    signUpSchema,
    signInSchema,
};
