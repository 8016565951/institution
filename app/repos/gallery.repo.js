const { db } = require("../lib/db");

class GalleryRepo {
    get = async () => {
        return await db.galleries.find();
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.galleries.findOne({ _id: id });
    };

    create = async (data) => {
        return await db.galleries.create(data);
    };

    /**
     * @param {string} id
     */
    update = async (id, data) => {
        return await db.galleries.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.galleries.deleteOne({ _id: id });
    };
}

module.exports = new GalleryRepo();
