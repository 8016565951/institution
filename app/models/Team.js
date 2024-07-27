const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            required: true,
        },

        position: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("team", teamSchema);
