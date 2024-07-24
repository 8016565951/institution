const transporter = require("./transporter");
const sendVerificationEmail = require("./verifyEmail");
const sendEmailVerified = require("./emailVerified");

module.exports = {
    mailSender: {
        transporter,
        sendVerificationEmail,
        sendEmailVerified,
    },
};
