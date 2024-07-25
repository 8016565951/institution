const { Router } = require("express");
const { parentcontroller } = require("../../controllers/api");

const parentRouter = Router();

parentRouter.get("/", parentcontroller.getParents);
parentRouter.get("/:id", parentcontroller.getParentById);

parentRouter.patch("/:id", parentcontroller.updateParent);

parentRouter.delete("/:id", parentcontroller.deleteParent);

module.exports = parentRouter;
