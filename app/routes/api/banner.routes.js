const { Router } = require("express");
const { bannerController } = require("../../controllers/api");
const { bannerUpload } = require("../../lib/multer");
const { isAPIAuthenticated, isAdmin } = require("../../middlewares/auth");

const bannerRouter = Router();

bannerRouter.get("/", isAPIAuthenticated, bannerController.getBanners);
bannerRouter.get("/:id", isAPIAuthenticated, bannerController.getBannerById);

bannerRouter.post(
    "/",
    isAPIAuthenticated,
    isAdmin,
    bannerUpload.single("banner"),
    bannerController.createBanner
);

bannerRouter.patch(
    "/:id",
    isAPIAuthenticated,
    isAdmin,
    bannerUpload.single("banner"),
    bannerController.updateBanner
);

bannerRouter.delete(
    "/:id",
    isAPIAuthenticated,
    isAdmin,
    bannerController.deleteBanner
);

module.exports = bannerRouter;
