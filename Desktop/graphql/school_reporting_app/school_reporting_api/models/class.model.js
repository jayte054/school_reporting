const mongoose = require("mongoose")

const Schema = mongoose.Schema;

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
    students: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    subjects: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    }

}, {timestamps: true})

const Class = mongoose.model("Class", classSchema)

module.exports = Class