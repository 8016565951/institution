const { Router } = require("express");
const { galleryController } = require("../../controllers/api");
const { isAPIAuthenticated } = require("../../middlewares/auth");
const { galleryUpload } = require("../../lib/multer");

const galleryRouter = Router();

galleryRouter.get("/", isAPIAuthenticated, galleryController.getGallery);
galleryRouter.get("/:id", isAPIAuthenticated, galleryController.getGalleryById);

galleryRouter.post(
    "/",
    isAPIAuthenticated,
    galleryUpload.single("image"),
    galleryController.createGallery
);

galleryRouter.patch(
    "/:id",
    isAPIAuthenticated,
    galleryUpload.single("image"),
    galleryController.updateGallery
);

galleryRouter.delete(
    "/:id",
    isAPIAuthenticated,
    galleryController.deleteGallery
);

module.exports = galleryRouter;
