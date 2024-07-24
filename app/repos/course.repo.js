const { db } = require("../lib/db");

class CourseRepo {
    getCourses = async (filter = {}) => {
        return await db.courses.find(filter);
    };

    getCourseById = async (id) => {
        return await db.courses.findOne({ _id: id });
    };

    createCourse = async (data) => {
        return await db.courses.create(data);
    };

    updateCourse = async (id, data) => {
        return await db.courses.updateOne({ _id: id }, data);
    };

    deleteCourse = async (id) => {
        return await db.courses.deleteOne({ _id: id });
    };
}

module.exports = new CourseRepo();
