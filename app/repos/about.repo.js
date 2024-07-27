const { db } = require("../lib/db");

class AboutRepo {
    get = async () => {
        return await db.about.findOne();
    };

    update = async (data) => {
        let about = await db.about.findOne();
        if (!about) return await db.about.create(data);

        about = { ...about, ...data };
        return await about.save();
    };
}

module.exports = new AboutRepo();
