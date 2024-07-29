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
 * @param {boolean} options.isApi
 */
function sendVerificationEmail({ req, user, isApi = true }) {
    const token = signJWT(
        {
            id: user.id,
        },
        process.env.EMAIL_SECRET,
        "15m"
    );

    const html = `
        <h1>Verify your email</h1>
        <p>Hello ${user.username},</p>
        <p>Click the link below to verify your email address:</p>
        <a href="${req.headers.origin}${isApi ? "/api" : ""}/auth/verify-email/verify?token=${token}">Verify email</a>
        <p>If you did not create an account, no further action is required.</p>
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
        subject: "Verify your email",
        html,
    });
}

module.exports = sendVerificationEmail;
