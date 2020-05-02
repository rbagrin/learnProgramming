// import { Faqs } from '../data';

const Faqs = require("../data").Faqs;

const add = async (question, answer, answeredBy, date) => {

    const faq = new Faqs({
        question,
        answer,
        answeredBy,
        date
    });
    await faq.save();
};

const getAll = async () => {
    return await Faqs.find();
};

const getById = async (id) => {
    return await Faqs.findById(id);
};

const updateById = async (id, question, answer, answeredBy) => {
    await Faqs.findByIdAndUpdate(id, { 
        $set: { 
            'question': question,
            'answer': answer,
            'answeredBy': answeredBy
        }
    });
};

const deleteById = async (id) => {
    await Faqs.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
}
