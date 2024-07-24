const none = require("./none");
const avatar = require("./avatar");
const blogThumbnail = require("./blog-thumbnail");
const courseThumbnail = require("./course-thumbnail");

module.exports = {
    ...none,
    ...avatar,
    ...blogThumbnail,
    ...courseThumbnail,
};
