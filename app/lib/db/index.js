const mongoose = require("mongoose");
const { logger } = require("../helpers");
const { generateDbUrl } = require("../utils");
const { Student, Parent, Teacher, Course } = require("../../models");

class Database {
    #uri;

    /**
     * @param {string} uri
     */
    constructor(uri) {
        this.#uri = uri;
        this.students = Student;
        this.parents = Parent;
        this.teachers = Teacher;
        this.courses = Course;
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
