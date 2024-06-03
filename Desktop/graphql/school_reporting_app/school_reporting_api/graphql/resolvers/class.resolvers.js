const Class = require("../../models/class.model")

const classResolver = {
    createClass: async({ClassInput}) => {
        const newClass = new Class({
            className: ClassInput.className,
            numberOfStudents: ClassInput.numberOfStudents,
            classTeacher: ClassInput.classTeacher,
            classCaptain: ClassInput.classCaptain,
            students: ClassInput.students,
            subjects: ClassInput.subjects
        })
    }

}

module.exports = classResolver