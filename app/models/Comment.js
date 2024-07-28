const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "blog",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("comment", commentSchema);
