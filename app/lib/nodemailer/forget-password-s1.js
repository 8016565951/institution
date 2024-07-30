const { siteConfig } = require("../../config/site");
const transporter = require("./transporter");

/**
 * @param {Object} options
 * @param {Object} options.user
 * @param {string} options.user.username
 * @param {string} options.user.email
 * @param {string} options.otp
 */
function sendForgetPasswordStep1Email({ user, otp }) {
    const html = `
        <h1>Forget Password</h1>
        <p>Hello ${user.username},</p>
        <p>Here is your OTP:</p>
        <p>${otp}</p>
        <p>It will expire in 5 minutes if not used.</p>
        <p>If you did not request this, no further action is required.</p>
        <p>Thanks,</p>
        <p>${siteConfig.name}</p>
    `;

    transporter.sendMail({
        from: {
            name: process.env.EMAIL_FROM_NAME,
            address: process.env.EMAIL_FROM_ADDRESS,
        },
        to: [
            {
                name: user.username,
                address: user.email,
            },
        ],
        subject: "OTP for resetting password",
        html,
    });
}

module.exports = sendForgetPasswordStep1Email;
