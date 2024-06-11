const Subject = require("../models/subjects.model")
const Student = require("../models/student.model")

const classTransform = async( classDoc ) => {
    return {
        ...classDoc._doc,
        _id: classDoc._id,
        subjects: getSubject.bind(this, classDoc.subjects),
        students: getStudent.bind(this, classDoc.students)
    }
}

const getSubject = async(subjectId) => {
    // console.log("ddd")
    const subjects = await Subject.find({_id : {$in: subjectId }})
    // console.log("ggg",subjects)
    return subjects
}

const getStudent = async(studentId) => {
    const student = await Student.find({_id: {$in: studentId}})
    console.log(student)
    return student
}


module.exports = {
    getStudent,
    getSubject,
    classTransform
}