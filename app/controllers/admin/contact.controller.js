const { siteConfig } = require("../../config/site");
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

    // The values are coming from www - contact form
    createContacts = async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;

            const contact = await contactRepo.create(req.body);

            return res.render("/contact");
        } catch (error) {
            console.error(error);
        }
    };
}

module.exports = new ContactController();
