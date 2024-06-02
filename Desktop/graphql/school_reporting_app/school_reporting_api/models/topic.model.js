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
        reuired: true
    },
    term: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Topics = mongoose.model("Topics", topicSchema)

module.exports = Topics