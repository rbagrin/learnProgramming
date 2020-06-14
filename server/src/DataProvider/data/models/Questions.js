const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
    category: {
        type: Number,
        required: true
    },
    options: {
        1: {
            type: String,
            required: [true, 'Option 1 is required']
        },
        2: {
            type: String,
            required: [true, 'Option 2 is required']
        },
        totalOptions: {
            type: Number,
            required: true
        }
    },
    correctAnswer: {
        type: Number,
        required: true
    },
    mainBranch: {
        type: String,
        required: true
    },
    optionalBranch: {
        type: String,
        required: false
    },
    level: {
        type: Number,
        required: true
    }
});

const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;