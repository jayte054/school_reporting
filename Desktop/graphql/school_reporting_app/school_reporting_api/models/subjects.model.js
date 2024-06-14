const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicTitle: {
        type: String,
        required: true
    },
    numberOfWeeks: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    }
}, {timestamps: true})

const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    topics: [topicSchema]
}, {timestamps: true})

const Subject = mongoose.model("Subject", subjectSchema)

module.exports = Subject