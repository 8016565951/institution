const responseSchema = require("./response");
const authSchema = require("./auth");
const userSchema = require("./user");
const courseSchema = require("./course");
const aboutSchema = require("./about");
const bannerSchema = require("./banner");
const blogSchema = require("./blog");
const categorySchema = require("./category");
const commentSchema = require("./comment");
const gallerySchema = require("./gallery");

module.exports = {
    ...responseSchema,
    ...authSchema,
    ...userSchema,
    ...aboutSchema,
    ...courseSchema,
    ...bannerSchema,
    ...blogSchema,
    ...categorySchema,
    ...commentSchema,
    ...gallerySchema,
};
