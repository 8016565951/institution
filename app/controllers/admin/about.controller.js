const { AboutRepo } = require("../../repos/admin/index");
const { handleError } = require("../../lib/utils");

class AboutController {
    getAbout = async (req, res) => {
        try {
            const data = await AboutRepo.getAbout();
            res.redirect("/admin/about");
        } catch (err) {
            return handleError(err, res);
        }
    };
    updateAbout = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const result = await AboutRepo.updateAbout(id, {
                title,
                description,
            });
            res.redirect("/admin/about");
        } catch (err) {
            return handleError(err, res);
        }
    };
    createAbout = async (req, res) => {
        try {
            const { title, description } = req.body;
            const result = await AboutRepo.createAbout({ title, description });
            res.redirect("/admin/about");
        } catch (err) {
            return handleError(err, res);
        }
    };
    editAbout = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await AboutRepo.getAboutById(id);
            res.render("admin/about", { data });
        } catch (err) {
            return handleError(err, res);
        }
    };
    deleteAbout = async (req, res) => {
        try {
            const { id } = req.params.id;
            const result = await AboutRepo.deleteAbout(id);
            res.redirect("/admin/about");
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new AboutController();
