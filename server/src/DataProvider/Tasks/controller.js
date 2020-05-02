const express = require('express');

const TasksService = require('./services.js');
const { validateFields } = require('../../utils');
const { authorizeAndExtractToken } = require('../../security/jwt');
const { authorizeRoles } = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;
const {adminRole, supportRole, userRole} = UsersConstants.roles;

const router = express.Router();

router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res) => {

    try {

        const tasks = await TasksService.getAll();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});


router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res) => {

    try {

        const task = await TasksService.getById(req.params.id);
        res.json(task);
    } catch (err) {

        next(err);
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res) => {

    const taskDescription = req.body.taskDescription;
    const assignedTo = req.body.assignedTo;
    const assignedBy = req.body.assignedBy;
    const dueDate = req.body.dueDate;
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            taskDescription: {
                value: taskDescription,
                type: 'ascii'
            },
            assignedTo: {
                value: assignedTo,
                type: 'ascii'
            },
            assignedBy: {
                value: assignedBy,
                type: 'ascii'
            },
            dueDate: {
                value: dueDate,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await TasksService.add(taskDescription, assignedTo, assignedBy, new Date(dueDate), course);

        res.json({
            success: true,
            message: 'Task successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res) => {

    const id = req.params.id;
    const taskDescription = req.body.taskDescription;
    const assignedTo = req.body.assignedTo;
    const dueDate = req.body.dueDate;
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            taskDescription: {
                value: taskDescription,
                type: 'ascii'
            },
            assignedTo: {
                value: assignedTo,
                type: 'ascii'
            },
            dueDate: {
                value: dueDate,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await TasksService.updateById(id, taskDescription, assignedTo, new Date(dueDate), course);

        res.json({
            success: true,
            message: 'Task successfully updated!'
        });

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res) => {

    const id = req.params.id;

    try {

        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        await TasksService.deleteById(id);
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});

module.exports = router;
