const { Router } = require("express");
const { aboutController } = require("../../controllers/admin");

const aboutRouter = Router();

aboutRouter.get("/about", aboutController.about);
aboutRouter.post("/", aboutController.updateAbout);

module.exports = aboutRouter;
