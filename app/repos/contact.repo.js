const { db } = require("../lib/db");

class ContactRepo {
    get = async () => {
        return await db.contacts.find();
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.contacts.findOne({ _id: id });
    };

    create = async (data) => {
        return await db.contacts.create(data);
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.contacts.deleteOne({ _id: id });
    };
}

module.exports = new ContactRepo();
