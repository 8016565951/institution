const transporter = require("./transporter");
const sendVerificationEmail = require("./verify-email");
const sendEmailVerified = require("./email-verified");
const sendUpdateMailEmail = require("./update-email");

module.exports = {
    mailSender: {
        transporter,
        sendVerificationEmail,
        sendEmailVerified,
        sendUpdateMailEmail,
    },
};
