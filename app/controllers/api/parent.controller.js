const { CResponse, handleError } = require("../../lib/utils");
const { parentRepo } = require("../../repos");

class ParentController {
    getParents = async (req, res) => {
        try {
            const parents = await parentRepo.getParents();
            return CResponse({
                res,
                message: "OK",
                longMessage: "Parents retrieved successfully",
                data: parents,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    getParentById = async (req, res) => {
        try {
            const { id } = req.params;
            const parent = await parentRepo.getParentById(id);

            return CResponse({
                res,
                message: "OK",
                longMessage: "Parent retrieved successfully",
                data: parent,
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
                longMessage: "Parent updated successfully",
            });
        } catch (err) {
            return handleError(err);
        }
    };

    deleteParent = async (req, res) => {
        try {
            const { id } = req.params;

            await parentRepo.deleteParent(id);

            return CResponse({
                res,
                message: "OK",
                longMessage: "Parent deleted successfully",
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new ParentController();
