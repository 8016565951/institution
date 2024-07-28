const { Router } = require("express");
const { GallaryController } = require("../../controllers/admin");
const gallaryRouter = Router();

gallaryRouter.get("/", GallaryController.getGallaryUI);
gallaryRouter.get("/create", GallaryController.createGallaryUI);
gallaryRouter.get("/updateGallaryUI/:id", GallaryController.updateGallaryUI);

module.exports = gallaryRouter;
