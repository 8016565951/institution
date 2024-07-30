const Joi = require("joi");

const commentSchema = Joi.object({
    content: Joi.string().required(),
});

module.exports = { commentSchema };
