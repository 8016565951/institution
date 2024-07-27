const { Router } = require("express");
const { aboutController } = require("../../controllers/admin");

const aboutRouter = Router();

aboutRouter.get("/", aboutController.aboutUI);

aboutRouter.post("/", aboutController.update);

module.exports = aboutRouter;
