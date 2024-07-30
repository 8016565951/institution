const { BLOG_STATUS } = require("../config/const");
const { db } = require("../lib/db");

class BlogRepo {
    get = async () => {
        return await db.blogs.aggregate([
            {
                $match: { status: BLOG_STATUS.PUBLISHED },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "authorId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories",
                },
            },
        ]);
    };

    /**
     * @param {string} [nId]
     * @param {number} limit
     */
    getRecents = async (nId, limit = 3) => {
        return await db.blogs.aggregate([
            {
                $match: { _id: { $ne: nId }, status: BLOG_STATUS.PUBLISHED },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "authorId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories",
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $limit: limit,
            },
        ]);
    };

    /**
     * @param {string} slug
     */
    getBySlug = async (slug) => {
        const data = await db.blogs.aggregate([
            {
                $match: { slug },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "authorId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories",
                },
            },
        ]);

        return data[0];
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        const data = await db.blogs.aggregate([
            {
                $match: { _id: id, status: BLOG_STATUS.PUBLISHED },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "authorId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories",
                },
            },
        ]);

        return data[0];
    };

    /**
     * @param {string} id
     */
    getByAuthorId = async (authorId) => {
        return await db.blogs.aggregate([
            {
                $match: { authorId, status: BLOG_STATUS.PUBLISHED },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "authorId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories",
                },
            },
        ]);
    };

    /**
     * @param {string[]} categoryNames
     */
    validateCategories = async (categoryNames) => {
        const categories = await db.categories.find();
        const categoryNamesFromDb = categories.map((c) =>
            c.title.toLowerCase()
        );
        const invalidCategories = categoryNames.filter(
            (c) => !categoryNamesFromDb.includes(c.toLowerCase())
        );
        const validCategories = categories.filter((c) =>
            categoryNames.includes(c.title)
        );

        return {
            valid: invalidCategories.length === 0,
            invalidCategories,
            validCategories,
        };
    };

    create = async (data) => {
        return await db.blogs.create(data);
    };

    /**
     * @param {string} id
     */
    update = async (id, data) => {
        return await db.blogs.updateOne({ _id: id }, data);
    };

    /**
     * @param {string} id
     */
    publish = async (id) => {
        return await db.blogs.updateOne(
            { _id: id },
            { publishedAt: new Date(), status: BLOG_STATUS.PUBLISHED }
        );
    };

    /**
     * @param {string} id
     */
    unpublish = async (id) => {
        return await db.blogs.updateOne(
            { _id: id },
            { status: BLOG_STATUS.DRAFT }
        );
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.blogs.deleteOne({ _id: id });
    };
}

module.exports = new BlogRepo();
