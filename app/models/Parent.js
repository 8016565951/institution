const { Schema, model } = require("mongoose");
const { ROLES } = require("../config/const");

const parentSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.PARENT,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("parent", parentSchema);
