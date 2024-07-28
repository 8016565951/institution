const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("category", categorySchema);
