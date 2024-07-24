const multer = require("multer");

const parseForm = multer().none();

module.exports = { parseForm };
