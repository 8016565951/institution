const { CResponse, handleError } = require("../../lib/utils");
const { parentRepo } = require("../../repos");

class ParentController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getParents = async (req, res) => {
        try {
            const parents = await parentRepo.getParents();
            return CResponse({
                res,
                message: "OK",
                data: parents,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getParentById = async (req, res) => {
        try {
            const { id } = req.params;
            const parent = await parentRepo.getParentById(id);

            return CResponse({
                res,
                message: "OK",
                data: parent,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateParent = async (req, res) => {
        try {
            const { id } = req.params;

            const { firstName, middleName, lastName, phone, occupaiton } =
                req.body;

            await parentRepo.updateParent(id, {
                firstName,
                middleName,
                lastName,
                phone,
                occupaiton,
            });

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteParent = async (req, res) => {
        try {
            const { id } = req.params;

            await parentRepo.deleteParent(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new ParentController();
