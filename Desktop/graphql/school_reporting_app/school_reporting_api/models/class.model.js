const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    topics: [
        {
            topicTitle: {
            type: String,
            required: true
        },
            numberOfWeeks: {
                type: Number,
                required: true
            }
    }
    ]
})

const gradeSchema = new Schema({
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
    }
})

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    grades: [gradeSchema],
    score: {
        type: Number,
        required: true
    }

})

const classSchema = new Schema({
    className: {
        type: String,
        required: true,
    },
    numberOfStudents: {
        type: Number,
        required: true,
    },
    classTeacher: {
        type: String,
        required: true
    },
    classCaptain: {
        type: String,
        required: true
    },
    students: [studentSchema],
    subjects: [subjectSchema]

}, {timestamps: true})

const Class = mongoose.model("Class", classSchema)

module.exports = Class