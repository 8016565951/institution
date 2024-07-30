const { siteConfig } = require("../../config/site");
const transporter = require("./transporter");

/**
 * @param {Object} options
 * @param {Object} options.user
 * @param {string} options.user.username
 * @param {string} options.user.email
 */
function sendForgetPasswordStep2Email({ user }) {
    const html = `
        <h1>Password Updated</h1>
        <p>Hello ${user.username},</p>
        <p>Your password has been updated successfully.</p>
        <p>If you did not request this, please contact us immediately.</p>
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
        subject: "Password Updated",
        html,
    });
}

module.exports = sendForgetPasswordStep2Email;
