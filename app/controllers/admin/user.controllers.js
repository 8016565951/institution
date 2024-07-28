class usersControllers {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    studentsUI = async (req, res) => {
        try {
            // const students = await studentRepo.get();
            return res.render("admin/students", {
                title: `Students | Admin Panel | `,
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
            // const teachers = await teacherRepo.get();
            return res.render("admin/teachers", {
                title: `Teachers | Admin Panel | `,
            });
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new usersControllers();
