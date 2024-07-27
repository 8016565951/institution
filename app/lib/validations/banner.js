const Joi = require("joi");

const bannerSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = {
    bannerSchema,
};
