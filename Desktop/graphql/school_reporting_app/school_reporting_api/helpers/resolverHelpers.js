const DataLoader = require("dataloader")
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
    const subjects = await Subject.find({_id : {$in: subjectId }})
    return subjects
}
// const getSubject = async(subjectId) => {
//     const subjects = await subjectLoader.loadMany(subjectId)
//     return subjects
// }

const getStudent = async(studentId) => {
    const student = await Student.find({_id: {$in: studentId}})
    console.log(student)
    return student
}
// const getStudent = async(studentId) => {
//     const student = await studentLoader.loadMany(studentId)
//     return student
// }

// const subjectLoader = new DataLoader((subjectId) => {
//     // return Subject.find({_id : {$in: subjectId}})
//     const subjects =  Subject.find({ _id: { $in: subjectIds } });
//     const subjectMap = new Map(subjects.map(subject => [subject._id.toString(), subject]));
//     return subjectId.map(id => subjectMap.get(id.toString()));
// })

// const studentLoader = new DataLoader((studentId) => {
//     // return Student.find({_id: {$in: studentId}})
//     const students =  Student.find({ _id: { $in: studentIds } });
//     const studentMap = new Map(students.map(student => [student._id.toString(), student]));
//     return studentId.map(id => studentMap.get(id.toString()));
// })


module.exports = {
    getStudent,
    getSubject,
    classTransform
}