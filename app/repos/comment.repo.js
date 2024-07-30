const { db } = require("../lib/db");

class CommentRepo {
    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.comments.findOne({ _id: id });
    };

    create = async (data) => {
        return await db.comments.create(data);
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.comments.deleteOne({ _id: id });
    };
}

module.exports = new CommentRepo();
