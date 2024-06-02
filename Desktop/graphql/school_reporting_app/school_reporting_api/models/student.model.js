const mongoose = require("mongoose")

const Schema = mongoose.Schema;

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
    grades: {
        type: Schema.Types.ObjectId,
        ref: "Grades"
    },
    score: {
        type: Number,
        required: true
    }

}, {timesstamps: true})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student