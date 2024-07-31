const { Router } = require("express");
const { categoryController } = require("../../controllers/admin");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategoriesUI);
categoryRouter.get("/create", categoryController.createCategoryUI);

categoryRouter.post("/create/category", categoryController.createCategory);
categoryRouter.delete("/:id/delete", categoryController.deleteCategory);

module.exports = categoryRouter;
