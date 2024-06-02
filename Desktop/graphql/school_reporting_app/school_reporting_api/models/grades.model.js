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

const Grades = mongoose.model("Grades", gradeSchema)

module.exports = Grades