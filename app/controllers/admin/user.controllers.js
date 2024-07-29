const { userRepo } = require('../../repos');

class usersControllers {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    studentsUI = async (req, res) => {
        try {
            const students = await userRepo.getStudents();
            return res.render("admin/students", {
                title: `Students | Admin Panel | `,
                students
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    teachersUI = async (req, res) => {
        try {
            const teachers = await userRepo.getTeachers();
            return res.render("admin/teachers", {
                title: `Teachers | Admin Panel | `,
                teachers
            });
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new usersControllers();
