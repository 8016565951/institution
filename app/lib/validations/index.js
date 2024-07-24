const responseSchema = require("./response");
const authSchema = require("./auth");
const studentSchema = require("./student");
const teacherSchema = require("./teacher");

module.exports = {
    ...responseSchema,
    ...authSchema,
    ...studentSchema,
    ...teacherSchema,
};
