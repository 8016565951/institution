const { Router } = require("express");
const { bannerController } = require("../../controllers/api");
const { bannerUpload } = require("../../lib/multer");

const bannerRouter = Router();

bannerRouter.get("/", bannerController.getBanners);
bannerRouter.get("/:id", bannerController.getBannerById);

bannerRouter.post(
    "/",
    bannerUpload.single("banner"),
    bannerController.createBanner
);

bannerRouter.patch(
    "/:id",
    bannerUpload.single("banner"),
    bannerController.updateBanner
);

bannerRouter.delete("/:id", bannerController.deleteBanner);

module.exports = bannerRouter;
