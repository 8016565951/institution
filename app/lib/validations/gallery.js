const Joi = require("joi");

const gallerySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = { gallerySchema };
