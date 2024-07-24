const { siteConfig } = require("../../config/site");
const transporter = require("./transporter");

/**
 * @param {Object} options
 * @param {Object} options.user
 * @param {string} options.user.username
 * @param {string} options.user.email
 */
function sendEmailVerified({ user }) {
    const html = `
        <h1>Email verified</h1>
        <p>Hello ${user.username},</p>
        <p>Your email has been verified.</p>
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
        subject: "Email verified",
        html,
    });
}

module.exports = sendEmailVerified;
