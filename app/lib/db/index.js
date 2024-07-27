const mongoose = require("mongoose");
const { logger } = require("../helpers");
const { generateDbUrl } = require("../utils");
const {
    Course,
    OTP,
    User,
    About,
    Blog,
    Contact,
    Gallery,
    Banner,
} = require("../../models");

class Database {
    #uri;

    /**
     * @param {string} uri
     */
    constructor(uri) {
        this.#uri = uri;
        this.users = User;
        this.courses = Course;
        this.otps = OTP;
        this.about = About;
        this.blogs = Blog;
        this.contacts = Contact;
        this.galleries = Gallery;
        this.banners = Banner;
    }

    connect = async () => {
        const connection = await mongoose.connect(this.#uri);
        logger.info(`Connected to database : ${connection.connection.name}`);
    };

    disconnect = async () => {
        await mongoose.disconnect();
        logger.info("Disconnected from database");
    };
}

const db = new Database(generateDbUrl());

module.exports = { db };
