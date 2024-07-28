const { db } = require("../lib/db");

class CommentRepo {
    /**
     * @param {string} blogId
     */
    getByBlogId = async (blogId) => {
        return await db.comments.aggregate([
            {
                $match: { blogId },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
        ]);
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.comments.aggregate([
            {
                $match: { _id: id },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
        ]);
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
