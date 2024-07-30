const { Router } = require("express");
const { galleryController } = require("../../controllers/api");
const { isAPIAuthenticated, isAdmin } = require("../../middlewares/auth");
const { galleryUpload } = require("../../lib/multer");

const galleryRouter = Router();

galleryRouter.get("/", isAPIAuthenticated, galleryController.getGallery);
galleryRouter.get("/:id", isAPIAuthenticated, galleryController.getGalleryById);

galleryRouter.post(
    "/",
    isAPIAuthenticated,
    isAdmin,
    galleryUpload.single("image"),
    galleryController.createGallery
);

galleryRouter.patch(
    "/:id",
    isAPIAuthenticated,
    isAdmin,
    galleryUpload.single("image"),
    galleryController.updateGallery
);

galleryRouter.delete(
    "/:id",
    isAPIAuthenticated,
    isAdmin,
    galleryController.deleteGallery
);

module.exports = galleryRouter;
