const { siteConfig } = require("../../config/site");
const { contactRepo } = require("../../repos");

class ContactController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    contacts = async (req, res) => {
        try {
            const contacts = await contactRepo.get();

            return res.render("admin/contacts", {
                title: `Contacts | Admin Panel | ${siteConfig.name}`,
                contacts,
            });
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new ContactController();
