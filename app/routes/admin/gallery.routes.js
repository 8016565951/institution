const { Router } = require("express");
const { galleryController } = require("../../controllers/admin");
const { galleryUpload } = require("../../lib/multer");
const galleryRouter = Router();

galleryRouter.get("/", galleryController.getGalleryUI);
galleryRouter.get("/create-gallery", galleryController.createGalleryUI);
galleryRouter.get("/:id/updateUI", galleryController.updateGalleryUI);

galleryRouter.post(
    "/create",
    galleryUpload.single("imageUrl"),
    galleryController.createGallery
);
galleryRouter.post(
    "/:id/update",
    galleryUpload.single("imageUrl"),
    galleryController.updateGallery
);
galleryRouter.delete("/:id/delete", galleryController.deleteGallery);

module.exports = galleryRouter;
