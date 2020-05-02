const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskDescription: {
        type: String,
        required: [true, 'Task Description is required']
    },
    assignedTo: {
        type: String,
        required: false
    },
    assignedBy: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;