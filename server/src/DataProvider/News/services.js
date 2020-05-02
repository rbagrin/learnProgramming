const News = require('../data').News;

const add = async (newsText, postedBy, date, course) => {

    const news = new News({
        newsText,
        postedBy,
        date,
        course
    });
    await news.save();
};

const getAll = async () => {
    return await News.find();
};

const getById = async (id) => {
    return await News.findById(id);
};

const updateById = async (id, newsText, course) => {
    await News.findByIdAndUpdate(id, { 
        $set: {
            "newsText": newsText,
            "course": course 
        }
    });
};

const deleteById = async (id) => {
    await News.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
}
