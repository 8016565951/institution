const { siteConfig } = require("../../config/site");
const { contactSchema } = require("../../lib/validations");
const { contactRepo } = require("../../repos");

class ContactController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    contactsUI = async (req, res) => {
        try {
            const user = req.ctx?.user;
            const contacts = await contactRepo.get();

            return res.render("admin/contacts", {
                title: `Contacts | Admin Panel | ${siteConfig.name}`,
                contacts,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    createContacts = async (req, res) => {
        try {
            const { error, value } = contactSchema.validate(req.body);
            if (error) throw error;

            await contactRepo.create(value);

            return res.redirect("/contact");
        } catch (error) {
            console.error(error);
        }
    };
}

module.exports = new ContactController();
