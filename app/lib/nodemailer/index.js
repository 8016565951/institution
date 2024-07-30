const transporter = require("./transporter");
const sendVerificationEmail = require("./verify-email");
const sendEmailVerified = require("./email-verified");
const sendUpdateMailEmail = require("./update-email");
const sendForgetPasswordStep1Email = require("./forget-password-s1");
const sendForgetPasswordStep2Email = require("./forget-password-s2");

module.exports = {
    mailSender: {
        transporter,
        sendVerificationEmail,
        sendEmailVerified,
        sendUpdateMailEmail,
        sendForgetPasswordStep1Email,
        sendForgetPasswordStep2Email,
    },
};
