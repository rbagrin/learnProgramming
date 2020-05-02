const Tasks = require('../data').Tasks;

const add = async (taskDescription, assignedTo, assignedBy, dueDate, course) => {
    const task = new Tasks({
        taskDescription,
        assignedTo,
        assignedBy,
        dueDate,
        course
    });
    await task.save();
};

const getAll = async () => {
    return await Tasks.find();
};

const getById = async (id) => {
    return await Tasks.findById(id);
};

const updateById = async (id, taskDescription, assignedTo, dueDate, course) => {
    await Tasks.findByIdAndUpdate(id, { 
        $set: {
            "taskDescription": taskDescription,
            "assignedTo": assignedTo,
            "dueDate": dueDate,
            "course": course
        }
    });
};

const deleteById = async (id) => {
    await Tasks.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
}
