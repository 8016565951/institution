const authController = require("./auth.controller");
const userController = require("./user.controller");
const courseController = require("./course.controller");
const bannerController = require("./banner.controller");
const blogController = require("./blog.controller");
const categoryController = require("./category.controller");
const commentController = require("./comment.controller");

module.exports = {
    authController,
    bannerController,
    userController,
    courseController,
    blogController,
    categoryController,
    commentController,
};
