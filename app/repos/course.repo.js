const { db } = require("../lib/db");

class CourseRepo {
    getCourses = async (filter = {}) => {
        return await db.courses.find(filter);
    };

    /**
     * @param {string} id
     */
    getCourseById = async (id) => {
        return await db.courses.findOne({ _id: id });
    };

    createCourse = async (data) => {
        return await db.courses.create(data);
    };

    updateCourse = async (id, data) => {
        return await db.courses.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    deleteCourse = async (id) => {
        return await db.courses.deleteOne({ _id: id });
    };

    /**
     * @param {string} data
     */
    createCourses = async (data) => {
        return await db.courses.insertMany(data);
    };
}

module.exports = new CourseRepo();
