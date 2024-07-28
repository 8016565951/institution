const { siteConfig } = require("../../config/site");

class GallaryController {
    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    createGallaryUI = async (req, res) => {
        try {
            return res.render("admin/gallary-create", {
                title: `Create Gallary | Admin Panel | ${siteConfig.name}`,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */

    getGallaryUI = async (req, res) => {
        try {
            return res.render("admin/gallery", {
                title: `Gallary | Admin Panel | ${siteConfig.name}`,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */

    updateGallaryUI = async (req, res) => {
        try {
            const { id } = req.params;
            return res.render("admin/gallary-update", {
                title: `Update Gallary | Admin Panel | ${siteConfig.name}`,
            });
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new GallaryController();
