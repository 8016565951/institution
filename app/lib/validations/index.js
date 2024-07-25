const responseSchema = require("./response");
const authSchema = require("./auth");
const userSchema = require("./user");

module.exports = {
    ...responseSchema,
    ...authSchema,
    ...userSchema,
};
