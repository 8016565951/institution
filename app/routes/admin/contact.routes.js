const { Router } = require("express");
const { contactController } = require("../../controllers/admin");

const contactRouter = Router();

contactRouter.get("/", contactController.contactsUI);

module.exports = contactRouter;
