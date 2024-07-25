const { siteConfig } = require("../../config/site");
const { signJWT } = require("../jwt");
const transporter = require("./transporter");

/**
 * @param {Object} options
 * @param {import("express").Request} options.req
 * @param {Object} options.user
 * @param {string} options.user.id
 * @param {string} options.user.username
 * @param {string} options.user.email
 */
async function sendUpdateMailEmail({ req, user }) {
    const token = signJWT(
        {
            id: user.id,
            email: user.email,
        },
        process.env.EMAIL_SECRET,
        "15m"
    );

    const html = `
        <h1>Update your email</h1>
        <p>Hello ${user.username},</p>
        <p>Click the link below to update your email address:</p>
        <a href="${req.headers.origin}/auth/verify-new-email?token=${token}">Update email</a>
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
        subject: "Update your email",
        html,
    });
}

module.exports = sendUpdateMailEmail;
