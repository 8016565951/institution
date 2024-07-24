const mongoose = require("mongoose");
const { logger } = require("../helpers");
const { generateDbUrl } = require("../utils");
const { User } = require("../../models");

class Database {
    constructor(uri) {
        this.uri = uri;
        this.users = User;
    }

    connect = async () => {
        const connection = await mongoose.connect(this.uri);
        logger.info(`Connected to database : ${connection.connection.name}`);
    };

    disconnect = async () => {
        await mongoose.disconnect();
        logger.info("Disconnected from database");
    };
}

const db = new Database(generateDbUrl());
module.exports = {
    db,
};
