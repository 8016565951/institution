const { db } = require("../lib/db");

class ParentRepo {
    getParents = async (filter = {}) => {
        return await db.parents.find({ filter });
    };

    /**
     * @param {string} id
     */
    getParentById = async (id) => {
        return await db.parents.findOne({ _id: id });
    };

    createParent = async (data = {}) => {
        return await db.parents.create({
            data,
        });
    };

    updateParent = async (id, data) => {
        return await db.parents.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    deleteParent = async (id) => {
        return await db.parents.deleteOne({ _id: id });
    };
}

module.exports = new ParentRepo();
