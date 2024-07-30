const { Router } = require("express");
const { categoryController } = require("../../controllers/api");
const { isAPIAuthenticated, isAdmin } = require("../../middlewares/auth");

const categoryRouter = Router();

categoryRouter.get("/", isAPIAuthenticated, categoryController.getCategories);
categoryRouter.get(
    "/:slug",
    isAPIAuthenticated,
    categoryController.getCategory
);

categoryRouter.post(
    "/",
    isAPIAuthenticated,
    isAdmin,
    categoryController.createCategory
);

categoryRouter.delete(
    "/:slug",
    isAPIAuthenticated,
    isAdmin,
    categoryController.deleteCategory
);

module.exports = categoryRouter;
