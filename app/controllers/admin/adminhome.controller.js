class adminHomeController {
    index = async (req, res) => {
        res.render("admin/index");
    };

    home = async (req, res) => {
        res.render("admin/home");
    };
}

module.exports = new adminHomeController();
