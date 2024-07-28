const Joi = require("joi");

const categorySchema = Joi.object({
    title: Joi.string().required(),
});

module.exports = { categorySchema };
