class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signIn = (req, res) => {
        res.render("www/signin");
    };
}

module.exports = new AuthController();
