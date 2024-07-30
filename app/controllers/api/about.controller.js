const { AppError } = require("../../lib/helpers");
const { handleError, CResponse } = require("../../lib/utils");
const { aboutSchema } = require("../../lib/validations");
const { aboutRepo } = require("../../repos");

class AboutController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getAbout = async (req, res) => {
        try {
            const about = await aboutRepo.get();
            if (!about)
                throw new AppError("No about is added yet", "NOT_FOUND");

            return CResponse({
                res,
                message: "OK",
                data: about,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateAbout = async (req, res) => {
        try {
            const { error, value } = aboutSchema.validate(req.body);
            if (error) throw error;

            const about = await aboutRepo.update(value);

            return CResponse({
                res,
                message: "CREATED",
                data: about,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new AboutController();
