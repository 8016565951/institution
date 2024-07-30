const { Router } = require("express");
const { aboutController } = require("../../controllers/api");
const { isAPIAuthenticated, isAdmin } = require("../../middlewares/auth");

const aboutRotuer = Router();

aboutRotuer.get("/", isAPIAuthenticated, aboutController.getAbout);
aboutRotuer.post("/", isAPIAuthenticated, isAdmin, aboutController.updateAbout);

module.exports = aboutRotuer;
