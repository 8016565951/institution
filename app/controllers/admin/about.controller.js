const { aboutRepo } = require("../../repos");
const { siteConfig } = require("../../config/site");
const { aboutSchema } = require("../../lib/validations");

class AboutController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    aboutUI = async (req, res) => {
        try {
            const about = await aboutRepo.get();

            return res.render("admin/about", {
                title: `About | Admin Panel | ${siteConfig.name}`,
                about,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    update = async (req, res) => {
        try {
            const { error, value } = aboutSchema.validate(req.body);
            if (error) throw error;

            await aboutRepo.update(value);

            return res.redirect("/admin/about");
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new AboutController();
