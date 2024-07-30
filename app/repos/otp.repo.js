const { db } = require("../lib/db");

class OTPRepo {
    /**
     * @param {string} code
     */
    getByCode = async (code) => {
        return await db.otps.findOne({ code });
    };

    /**
     * @param {string} code
     * @param {string} userId
     */
    create = async (code, userId) => {
        return await db.otps.create({
            code,
            userId,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });
    };

    /**
     * @param {string} userId
     */
    deleteByUserId = async (userId) => {
        return await db.otps.deleteMany({ userId });
    };
}

module.exports = new OTPRepo();
