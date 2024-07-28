const { Router } = require("express");
const { categoryController } = require("../../controllers/api");
const { isAPIAuthenticated } = require("../../middlewares/auth");

const categoryRouter = Router();

categoryRouter.get("/", isAPIAuthenticated, categoryController.getCategories);
categoryRouter.get(
    "/:id",
    isAPIAuthenticated,
    categoryController.getCategoryById
);

categoryRouter.post(
    "/",
    //  isAPIAuthenticated,
    categoryController.createCategory
);

categoryRouter.delete(
    "/:id",
    isAPIAuthenticated,
    categoryController.deleteCategory
);

module.exports = categoryRouter;
