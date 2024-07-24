const { db } = require("../lib/db");

class ParentRepo {
    createParent = async (data = {}) => {
        try {
            const parent = await db.parents.create({
                data,
            });
            return parent;
        } catch (err) {
            return handleError(err);
        }
    };
    /**
     
     * @param {string} id 
     */

    getParentById = async (id) => {
        try {
            const parent = await db.parents.findOne({ _id: id });
            return parent;
        } catch (err) {
            return handleError(err);
        }
    };

    getParents = async (filter = {}) => {
        try {
            const parents = await db.parents.find({ filter });
            return parents;
        } catch (err) {
            return handleError(err);
        }
    };

    updateParent = async (id, data) => {
        try {
            const parent = await db.parents.updateOne({ _id: id }, data);
            return parent;
        } catch (err) {
            return handleError(err);
        }
    };

    deleteParent = async (id) => {
        try {
            const parent = await db.parents.deleteOne({ _id: id });
            return parent;
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new ParentRepo();
