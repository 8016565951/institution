const { db } = require("../lib/db");

class TeacherRepo {
    getTeachers = async (filter = {}) => {
        return await db.teachers.find(filter);
    };

    /**
     * @param {string} id
     */
    getTeacherById = async (id) => {
        return await db.teachers.findOne({ _id: id });
    };

    /**
     * @param {string} email
     */
    getTeacherByEmail = async (email) => {
        return await db.teachers.findOne({ email });
    };

    createTeacher = async (data) => {
        return await db.teachers.create(data);
    };

    updateTeacher = async (id, data) => {
        return await db.teachers.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    deleteTeacher = async (id) => {
        return await db.teachers.deleteOne({ _id: id });
    };
}

module.exports = new TeacherRepo();
