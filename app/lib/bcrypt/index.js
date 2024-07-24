const bcrypt = require("bcryptjs");

/**
 * @param {string} password
 * @param {number} salt
 */
async function hashPassword(password, salt = 10) {
    return await bcrypt.hash(password, salt);
}

/**
 * @param {string} password
 * @param {string} hashedPassword
 */
async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords,
};
