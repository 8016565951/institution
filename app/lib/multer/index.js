const none = require("./none");
const avatar = require("./avatar");
const blogThumbnail = require("./blog-thumbnail");
const courseThumbnail = require("./course-thumbnail");
const banner = require("./banner");

module.exports = {
    ...none,
    ...avatar,
    ...blogThumbnail,
    ...courseThumbnail,
    ...banner,
};
