const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const subjectsSchema = new Schema({
    subjectName:{
        type: String,
        required: true
    },
    assignments: {
        type: Number,
        required: false
    },
    classWork: {
        type: Number,
        required: false
    },
    test: {
        type: Number,
        required: false
    },
    exam: {
        type: Number,
        required: false
    },
    totalScore: {
        type: Number,
        required: false
    }
})

const StudentGradeSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subjects: [subjectsSchema]
  
}, {timestamps: true})

const StudentsGrades = mongoose.model("StudentGrades", StudentGradeSchema)

module.exports = StudentsGrades