const Course = require("../../models/Course");
const { required } = require("joi");

class CourseRepo {
    getCourses = async () => {
        return await Course.find();
    };

    createCourse = async (data) => {
        return await Course.create(data);
    };

    updateCourse = async (id, data) => {
        return await Course.updateOne({ _id: id }, data);
    };

    deleteCourse = async (id) => {
        return await Course.deleteOne({ _id: id });
    };

    getCourseById = async (id) => {
        return await Course.findOne({ _id: id });
    };
}

module.exports = new CourseRepo();
