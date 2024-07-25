const { model, Schema } = require("mongoose");
const { ROLES } = require("../config/const");

const userSchema = new Schema(
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
        avatarUrl: {
            type: String,
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
            default: ROLES.STUDENT,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("user", userSchema);
