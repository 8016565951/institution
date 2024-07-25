const { Schema, model } = require("mongoose");
const { TIMESPANS } = require("../config/const");

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            number: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                enum: TIMESPANS,
                required: true,
            },
        },
        price: {
            type: Number,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("course", courseSchema);
