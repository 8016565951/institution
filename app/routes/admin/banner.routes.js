const { Router } = require("express");
const { bannerController } = require("../../controllers/admin");

const bannerRouter = Router();

bannerRouter.get("/", bannerController.showUI);
bannerRouter.get("/create", bannerController.createUI);
bannerRouter.get("/:id/update", bannerController.updateUI);

bannerRouter.post("/create", bannerController.create);
bannerRouter.post("/:id/update", bannerController.update);
bannerRouter.post("/:id/delete", bannerController.delete);

module.exports = bannerRouter;
