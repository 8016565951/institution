const { ContactRepo } = require("../../repos/admin/index");
const { handleError } = require("../../lib/utils");

class ContactController {
    getContacts = async (req, res) => {
        try {
            const data = await ContactRepo.getContacts();
            res.redirect("/admin/contact");
        } catch (err) {
            return handleError(err, res);
        }
    };
    getContactById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await ContactRepo.getContactById(id);
            res.render("admin/contact", { data });
        } catch (err) {
            return handleError(err, res);
        }
    };

    createContact = async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;
            await ContactRepo.createContact({ name, subject, email, message });
            res.redirect("/admin/contact");
        } catch (err) {
            return handleError(err, res);
        }
    };
    updateContact = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, subject, message } = req.body;
            await ContactRepo.updateContact(id, { name, email, message });
            res.redirect("/admin/contact");
        } catch (err) {
            return handleError(err, res);
        }
    };
    deleteContact = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ContactRepo.deleteContact(id);
            res.redirect("/admin/contact");
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new ContactController();
