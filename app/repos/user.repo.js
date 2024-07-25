const { ROLES } = require("../config/const");
const { db } = require("../lib/db");

class UserRepo {
    getUsers = async (filter = {}) => {
        return await db.users.find(filter);
    };

    getStudents = async (filter = {}) => {
        return await db.users.find({ role: ROLES.STUDENT, ...filter });
    };

    getTeachers = async (filter = {}) => {
        return await db.users.find({ role: ROLES.TEACHER, ...filter });
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.users.findOne({ _id: id });
    };

    /**
     * @param {string} id
     */
    getStudentById = async (id) => {
        return await db.users.findOne({ _id: id, role: ROLES.STUDENT });
    };

    /**
     * @param {string} id
     */
    getTeacherById = async (id) => {
        return await db.users.findOne({ _id: id, role: ROLES.TEACHER });
    };

    /**
     * @param {string} email
     */
    getStudentByEmail = async (email) => {
        return await db.users.findOne({ email, role: ROLES.STUDENT });
    };

    /**
     * @param {string} email
     */
    getTeacherByEmail = async (email) => {
        return await db.users.findOne({ email, role: ROLES.TEACHER });
    };

    /**
     * @param {string} email
     */
    getByEmail = async (email) => {
        return await db.users.findOne({ email });
    };

    create = async (data) => {
        return await db.users.create(data);
    };

    /**
     * @param {string} id
     * @param {string} role
     */
    updateRole = async (id, role) => {
        return await db.users.updateOne({ _id: id }, { role });
    };

    /**
     * @param {string} id
     * @param {string} password
     */
    updatePassword = async (id, password) => {
        return await db.users.updateOne({ _id: id }, { password });
    };

    /**
     * @param {string} id
     * @param {string} avatarUrl
     */
    updateAvatar = async (id, avatarUrl) => {
        return await db.users.updateOne({ _id: id }, { avatarUrl });
    };

    /**
     * @param {string} id
     * @param {string} phone
     */
    updatePhone = async (id, phone) => {
        return await db.users.updateOne({ _id: id }, { phone });
    };

    /**
     * @param {string} id
     * @param {object} address
     */
    updateAddress = async (id, address) => {
        return await db.users.updateOne({ _id: id }, { address });
    };

    /**
     * @param {string} id
     * @param {string} email
     */
    updateEmail = async (id, email) => {
        return await db.users.updateOne({ _id: id }, { email });
    };

    /**
     * @param {string} id
     * @param {boolean} isVerified
     */
    updateVerification = async (id, isVerified) => {
        return await db.users.updateOne({ _id: id }, { isVerified });
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        return await db.users.deleteOne({ _id: id });
    };
}

module.exports = new UserRepo();
