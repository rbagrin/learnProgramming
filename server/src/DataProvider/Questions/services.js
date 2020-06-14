const Questions = require("../data").Questions;

const add = async (category, option1, option2, correctAnswer, mainBranch, optionalBranch) => {

    let level = 0;
    await Questions.find({category: category})
        .sort({level: -1})
        .limit(1)
        .exec(async (err, data) => {

            if (data.length === 1) {
                level = data[0].level + 1;
            }

            const question = new Questions({
                category: category,
                options: {
                    1: option1,
                    2: option2,
                    totalOptions: 2
                },
                level: level,
                correctAnswer: correctAnswer,
                mainBranch: mainBranch,
                optionalBranch: optionalBranch
            });

            await question.save();
        });
};

const getAll = async () => {
    return await Questions.find();
};

const getById = async (id) => {
    return await Questions.findById(id);
};

const updateById = async (id, category, option1, option2, correctAnswer, mainBranch, optionalBranch) => {
    await Questions.findByIdAndUpdate(id, {
        $set: {
            'category': category,
            'option1': option1,
            'option2': option2,
            'correctAnswer': correctAnswer,
            'mainBranch': mainBranch,
            'optionalBranch': optionalBranch
        }
    });
};

const deleteById = async (id) => {
    await Questions.findByIdAndDelete(id);
};


module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
}