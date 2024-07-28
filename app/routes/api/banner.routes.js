const { Router } = require("express");
const { bannerController } = require("../../controllers/api");
const { bannerUpload } = require("../../lib/multer");
const { isAPIAuthenticated } = require("../../middlewares/auth");

const bannerRouter = Router();

bannerRouter.get("/", isAPIAuthenticated, bannerController.getBanners);
bannerRouter.get("/:id", isAPIAuthenticated, bannerController.getBannerById);

bannerRouter.post(
    "/",
    isAPIAuthenticated,
    bannerUpload.single("banner"),
    bannerController.createBanner
);

bannerRouter.patch(
    "/:id",
    isAPIAuthenticated,
    bannerUpload.single("banner"),
    bannerController.updateBanner
);

bannerRouter.delete("/:id", isAPIAuthenticated, bannerController.deleteBanner);

module.exports = bannerRouter;
