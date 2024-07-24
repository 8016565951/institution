const { CResponse } = require("../../lib/utils");
const index = require("../../repos/index");
const { getParents } = require("../../repos/parent.repo");

class ParentController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    create = async (req, res) => {
        try {
            const { firstName, middleName, lastName, phone, occupaiton } =
                req.body;
            const parent = await index.parentRepo.createParent({
                firstName,
                middleName,
                lastName,
                phone,
                occupaiton,
            });

            return CResponse({
                res,
                message: "CREATED",
                longMessage: "Parent created successfully",
                data: parent,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    getParentById = async (req, res) => {
        try {
            const { id } = req.params;
            const parent = await index.parentRepo.getParentById(id);

            return CResponse({
                res,
                message: "SUCCESS",
                longMessage: "Parent retrieved successfully",
                data: parent,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    getParents = async (req, res) => {
        try {
            const parents = await index.parentRepo.getParents();
            return CResponse({
                res,
                message: "SUCCESS",
                longMessage: "Parents retrieved successfully",
                data: parents,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    updateParent = async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName, middleName, lastName, phone, occupaiton } =
                req.body;
            const parent = await index.parentRepo.updateParent(id, {
                firstName,
                middleName,
                lastName,
                phone,
                occupaiton,
            });
            return CResponse({
                res,
                message: "SUCCESS",
                longMessage: "Parent updated successfully",
                data: parent,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    deleteParent = async (req, res) => {
        try {
            const { id } = req.params;
            const parent = await index.parentRepo.deleteParent(id);
            return CResponse({
                res,
                message: "SUCCESS",
                longMessage: "Parent deleted successfully",
                data: parent,
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new ParentController();
