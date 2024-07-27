const { Schema, model } = require("mongoose");

const aboutSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("about", aboutSchema);
