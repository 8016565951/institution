const { Router } = require("express");
const parentcontroller = require("../../controllers/api/Parentcontroller");
const ParentRouter = Router();

ParentRouter.post("/create", parentcontroller.create);
ParentRouter.get("/get/:id", parentcontroller.getParentById);
ParentRouter.get("/getall", parentcontroller.getParents);
ParentRouter.put("/update/:id", parentcontroller.updateParent);
ParentRouter.delete("/delete/:id", parentcontroller.deleteParent);

module.exports = ParentRouter;
