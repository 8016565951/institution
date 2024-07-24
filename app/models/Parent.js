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
        occupaiton: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.PARENT,
        },
        child: [
            {
                type: Schema.Types.ObjectId,
                ref: "student",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("parent", parentSchema);
