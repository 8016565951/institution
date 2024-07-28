const { Router } = require("express");
const { galleryController } = require("../../controllers/admin");
const galleryRouter = Router();

galleryRouter.get("/", galleryController.getGalleryUI);
galleryRouter.get("/create", galleryController.createGalleryUI);
galleryRouter.get("/:id/update", galleryController.updateGalleryUI);

galleryRouter.post("/create", galleryController.createGallery);
galleryRouter.post("/:id/update", galleryController.updateGallery);
galleryRouter.post("/:id/delete", galleryController.deleteGallery);

module.exports = galleryRouter;
