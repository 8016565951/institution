const { siteConfig } = require("../../config/site");
const { AppError } = require("../../lib/helpers");
const { categorySchema } = require("../../lib/validations");
const { categoryRepo } = require("../../repos");

class CategoryController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getCategoriesUI = async (req, res) => {
        const user = req.ctx?.user;
        const categories = await categoryRepo.get();

        return res.render("admin/categories", {
            title: `Contacts | Admin Panel | ${siteConfig.name}`,
            categories,
            user,
        });
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createCategoryUI = async (req, res) => {
        const user = req.ctx?.user;

        return res.render("admin/category-create", {
            title: `Create Category | Admin Panel | ${siteConfig.name}`,
            user,
        });
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

            await categoryRepo.create(value);

            return res.redirect("/admin/categories");
        } catch (error) {
            console.error(error);
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

            return res.redirect("/admin/categories");
        } catch (error) {
            console.error(error);
        }
    };
}

module.exports = new CategoryController();
