const { Router } = require("express");
const { bannerController } = require("../../controllers/admin");
const { bannerUpload } = require("../../lib/multer");

const bannerRouter = Router();

bannerRouter.get("/", bannerController.showUI);
bannerRouter.get("/create", bannerController.createUI);
bannerRouter.get("/:id/update", bannerController.updateUI);

bannerRouter.post(
    "/create",
    bannerUpload.single("banner"),
    bannerController.create
);
bannerRouter.post(
    "/:id/update",
    bannerUpload.single("banner"),
    bannerController.update
);
bannerRouter.get("/:id/delete", bannerController.delete);

module.exports = bannerRouter;
