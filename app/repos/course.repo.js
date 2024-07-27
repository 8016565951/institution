const { db } = require("../lib/db");

class CourseRepo {
    get = async () => {
        return await db.courses.find();
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.courses.findOne({ _id: id });
    };

    create = async (data) => {
        return await db.courses.create(data);
    };

    /**
     * @param {string} id
     */
    update = async (id, data) => {
        return await db.courses.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.courses.deleteOne({ _id: id });
    };
}

module.exports = new CourseRepo();
