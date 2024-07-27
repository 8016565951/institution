const { Schema, model } = require("mongoose");

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
            enum: ["draft", "published"],
            default: "draft",
        },
        publishedAt: {
            type: Date,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("blog", blogSchema);
