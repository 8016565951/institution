const Joi = require("joi");

const aboutSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = {
    aboutSchema,
};
