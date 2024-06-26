const mongoose = require("mongoose")

const Schema = mongoose.Schema;

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
}, {timestamps: true})

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
    class: {
        type: String,
        required: true
    },
    grades: [gradeSchema],
    score: {
        type: Number,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    father: {
        type: String,
        require: false
    },
    fatherPhoneNumber: {
        type: String,
        required: false
    },
    fatherEmail: {
        type: String,
        required: false
    },
    mother: {
        type: String,
        required: false
    },
    motherPhoneNumber: {
        type: String,
        required: false
    },
    motherEmail: {
        type: String,
        required: false
    }


}, {timesstamps: true})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student