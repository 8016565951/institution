const { Schema, model } = require("mongoose");
const { BLOG_STATUS } = require("../config/const");

const blogSchema = new Schema(
    {
        thumbnailUrl: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(BLOG_STATUS),
            default: BLOG_STATUS.DRAFT,
        },
        publishedAt: {
            type: Date,
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "category",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("blog", blogSchema);
