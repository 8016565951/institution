class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signIn = (req, res) => {
        res.render("www/signin");
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signUp = (req, res) => {
        res.render("www/signup");
    };
}

module.exports = new AuthController();
