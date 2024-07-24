const { model, Schema } = require("mongoose");
const { ROLES } = require("../config/const");

const studentSchema = new Schema(
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
            required: true,
        },
        address: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zipCode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "course",
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

module.exports = model("student", studentSchema);
