const { db } = require("../lib/db");

class BannerRepo {
    get = async () => {
        return await db.banners.find();
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.banners.findOne({ _id: id });
    };

    create = async (data) => {
        return await db.banners.create(data);
    };

    update = async (id, data) => {
        return await db.banners.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.banners.deleteOne({ _id: id });
    };
}

module.exports = new BannerRepo();
