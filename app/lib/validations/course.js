const Joi = require("joi");
const { TIMESPANS } = require("../../config/const");

const courseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    duration: Joi.object({
        number: Joi.string().required(),
        unit: Joi.string()
            .valid(...Object.values(TIMESPANS))
            .required(),
    }),
});

module.exports = { courseSchema };
