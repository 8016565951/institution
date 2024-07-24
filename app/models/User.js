const { model, Schema } = require("mongoose");
const { USER_ROLES } = require("../config/const");

const userSchema = new Schema({
    name: {
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
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER,
    },
});

module.exports = model("User", userSchema);
