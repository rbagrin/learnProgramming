const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  answer: {
    type: String,
    required: false
  },
  answeredBy: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  }
});

const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;