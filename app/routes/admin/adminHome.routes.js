const express = require("express");
const { adminHomeController } = require("../../controllers/admin");
const Router = express.Router();

Router.get("/", adminHomeController.index);
Router.get("/home", adminHomeController.home);

module.exports = Router;
