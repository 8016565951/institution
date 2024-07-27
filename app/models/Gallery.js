const { Schema, model } = require("mongoose");

const gallerySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("gallery", gallerySchema);
