const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create a Schema in mongoose for the question
const questionSchema = new Schema({
    level: Number,
    question: String,
    responses: {
        option1: {
            hint: String,
            answer: String,
            audioLink: String
        },
        option2: {
            hint: String,
            answer: String,
            audioLink: String
        },
        option3: {
            hint: String,
            answer: String,
            audioLink: String
        }
    },
    audioLinkQuestion: String,
    imageLink: String
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question