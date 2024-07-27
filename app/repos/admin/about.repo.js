const { required } = require("joi");

const { About } = require("../../models/About");

class AboutRepo {
    getAbout = async () => {
        return await About.findOne();
    };
    getAboutById = async (id) => {
        return await About.findOne({ _id: id });
    };

    updateAbout = async (data) => {
        return await About.updateOne({}, data);
    };

    createAbout = async (data) => {
        return await About.create(data);
    };

    deleteAbout = async () => {
        return await About.deleteOne();
    };
}

module.exports = new AboutRepo();
