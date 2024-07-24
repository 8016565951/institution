const { model, Schema } = require("mongoose");
const { ROLES } = require("../config/const");

const teacherSchema = new Schema(
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
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
        },
        address: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            country: {
                type: String,
            },
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.TEACHER,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("teacher", teacherSchema);
