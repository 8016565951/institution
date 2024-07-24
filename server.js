const express = require("express");
const BP = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { PORT } = require("./app/config/const");
const { logger, initiateErrorHandler } = require("./app/lib/helpers");
const { db } = require("./app/lib/db");
const { apiRouter } = require("./app/routes/api");

const app = express();

db.connect();

app.use(BP.json());
app.use(BP.urlencoded({ extended: true }));

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/api", apiRouter);

app.listen(PORT, () => {
    initiateErrorHandler();
    logger.info(`Server running on http://localhost:${PORT}`);
});
