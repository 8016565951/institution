const responseSchema = require("./response");
const authSchema = require("./auth");
const userSchema = require("./user");
const courseSchema = require("./course");
const aboutSchema = require("./about");
const bannerSchema = require("./banner");

module.exports = {
    ...responseSchema,
    ...authSchema,
    ...userSchema,
    ...aboutSchema,
    ...courseSchema,
    ...bannerSchema,
};
