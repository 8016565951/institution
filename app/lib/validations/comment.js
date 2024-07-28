const Joi = require("joi");

const commentSchema = Joi.object({
    content: Joi.string().required(),
    authorId: Joi.string().required(),
    blogId: Joi.string().required(),
});

module.exports = { commentSchema };
