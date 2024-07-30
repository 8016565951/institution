const Joi = require("joi");

const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().optional(),
    lastName: Joi.string().required(),
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
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        country: Joi.string().required(),
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

const updateEmailSchema = Joi.object({
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
});

const updatePhoneSchema = Joi.object({
    phone: Joi.string().required(),
});

const updateAddressSchema = Joi.object({
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        country: Joi.string().required(),
    }),
});

const forgetPasswordStep1Schema = Joi.object({
    email: Joi.string().email().required(),
});

const forgetPasswordStep2Schema = Joi.object({
    otp: Joi.string().required(),
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

const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        ),
    newPassword: Joi.string()
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
    confirmNewPassword: Joi.string()
        .required()
        .valid(Joi.ref("newPassword"))
        .messages({
            "any.only": "New password and confirm new password do not match.",
        }),
});

module.exports = {
    signUpSchema,
    signInSchema,
    updateEmailSchema,
    updatePhoneSchema,
    updateAddressSchema,
    forgetPasswordStep1Schema,
    forgetPasswordStep2Schema,
    updatePasswordSchema,
};
