const express = require("express");
const BP = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { PORT } = require("./app/config/const");
const { logger, initiateErrorHandler } = require("./app/lib/helpers");
const { db } = require("./app/lib/db");
const { apiRouter } = require("./app/routes/api");
const cookieParser = require("cookie-parser");
const { homeRouter } = require("./app/routes/www");
const { adminRouter } = require("./app/routes/admin");
const { isAdminUI, isAdminUIAuthenticated } = require("./app/middlewares/auth");

const app = express();

db.connect();

app.use(BP.json());
app.use(BP.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(homeRouter);
app.use("/api", apiRouter);
app.use("/admin", isAdminUIAuthenticated, isAdminUI, adminRouter);

app.listen(PORT, () => {
    initiateErrorHandler();
    logger.info(`Server running on http://localhost:${PORT}`);
});
