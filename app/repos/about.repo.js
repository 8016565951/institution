const { db } = require("../lib/db");

class AboutRepo {
    get = async () => {
        return await db.about.findOne();
    };

    update = async (data) => {
        const about = await db.about.findOne();
        if (!about) return await db.about.create(data);

        return await db.about.updateOne({}, data);
    };
}

module.exports = new AboutRepo();
