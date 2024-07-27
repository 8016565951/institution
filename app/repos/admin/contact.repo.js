const contactSchema = require("../../models/Contact");

class ContactRepo {
    getContacts = async () => {
        return await contactSchema.find();
    };

    getContactById = async (id) => {
        return await contactSchema.findOne({ _id: id });
    };

    deleteContact = async (id) => {
        return await contactSchema.deleteOne({ _id: id });
    };

    createContact = async (data) => {
        return await contactSchema.create(data);
    };

    updateContact = async (id, data) => {
        return await contactSchema.updateOne({ _id: id }, data);
    };
}

module.exports = new ContactRepo();
