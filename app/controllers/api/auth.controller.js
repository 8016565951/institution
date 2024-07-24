const { handleError, CResponse } = require("../../lib/utils");
const { signUpSchema } = require("../../lib/validations");

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    signUp = (req, res) => {
        try {
            const { error, value } = signUpSchema.validate(req.body);
            if (error) throw error;

            return CResponse({
                res,
                message: "TOO_MANY_REQUESTS",
                longMessage: "User created",
                data: value,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new AuthController();
