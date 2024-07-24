const Joi = require("joi");
const { USER_ROLES } = require("../../config/const");

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/
            )
        ),
    role: Joi.string()
        .valid(...Object.values(USER_ROLES))
        .default(USER_ROLES.USER),
});

module.exports = {
    userSchema,
};
