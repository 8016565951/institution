const Joi = require("joi");
const { BLOG_STATUS } = require("../../config/const");

const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().default(""),
    content: Joi.string().required(),
    authorId: Joi.string().required(),
    status: Joi.string()
        .valid(...Object.values(BLOG_STATUS))
        .default(BLOG_STATUS.DRAFT),
    publishedAt: Joi.date(),
    categories: Joi.array().items(Joi.string()),
});

module.exports = { blogSchema };
