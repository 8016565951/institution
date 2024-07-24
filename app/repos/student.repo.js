const { db } = require("../lib/db");

class StudentRepo {
    getStudents = async (filter = {}) => {
        return await db.students.find(filter);
    };

    /**
     * @param {string} id
     */
    getStudentById = async (id) => {
        return await db.students.findOne({ _id: id });
    };

    /**
     * @param {string} email
     */
    getStudentByEmail = async (email) => {
        return await db.students.findOne({ email });
    };

    createStudent = async (data) => {
        return await db.students.create(data);
    };
}

module.exports = new StudentRepo();
