const Joi = require("joi");

const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().default(""),
    content: Joi.string().required(),
    categories: Joi.array().items(Joi.string()),
});

module.exports = { blogSchema };
