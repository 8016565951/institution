const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("banner", bannerSchema);
