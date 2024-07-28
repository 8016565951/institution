const { AppError } = require("../../lib/helpers");
const { CResponse, handleError } = require("../../lib/utils");
const { categorySchema } = require("../../lib/validations");
const { categoryRepo } = require("../../repos");

class CategoryController {
    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getCategories = async (req, res) => {
        try {
            const categories = await categoryRepo.get();

            return CResponse({
                res,
                message: "OK",
                data: categories,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     *  @param {import("express").Response} res
     */
    getCategoryById = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categoryRepo.getById(id);

            return CResponse({
                res,
                message: "OK",
                data: category,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createCategory = async (req, res) => {
        try {
            const { error, value } = categorySchema.validate(req.body);
            if (error) throw error;

            const existingCategory = await categoryRepo.getByTitle(value.title);
            if (existingCategory)
                throw new AppError("Category already exists", "CONFLICT");

            const category = await categoryRepo.create(value);

            return CResponse({
                res,
                message: "OK",
                data: category,
            });
        } catch (err) {
            return handleError(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            await categoryRepo.delete(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err);
        }
    };
}

module.exports = new CategoryController();
