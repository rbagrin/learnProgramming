const express = require('express');

const QuestionsService = require('./services.js');
const {
    validateFields
} = require('../../utils');
const {
    authorizeAndExtractToken
} = require('../../security/jwt');
const {
    authorizeRoles
} = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;
const {
    adminRole,
    supportRole,
    userRole
} = UsersConstants.roles;

const router = express.Router();

router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    try {

        const questions = await QuestionsService.getAll();
        res.json({
            success: true,
            questions: questions
        });
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware
        next(err);
    }
});


router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    try {

        const question = await QuestionsService.getById(req.params.id);
        res.json(question);
    } catch (err) {

        next(err);
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const category = req.body.category;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const correctAnswer = req.body.correctAnswer;
    const mainBranch = req.body.mainBranch;
    const optionalBranch = req.body.optionalBranch ? req.body.optionalBranch : null;
    const message = req.body.message ? req.body.message : "Bravo!";

    console.log(message)

    try {

        const fieldsToBeValidated = {
            category: {
                value: category,
                type: 'int'
            },
            option1: {
                value: option1,
                type: 'ascii'
            },
            option2: {
                value: option2,
                type: 'ascii'
            },
            correctAnswer: {
                value: correctAnswer,
                type: 'int'
            },
            mainBranch: {
                value: mainBranch,
                type: 'ascii'
            },
            message: {
                value: message,
                type: 'ascii'
            }
        };

        if (optionalBranch) {
            fieldsToBeValidated.optionalBranch = {
                value: optionalBranch,
                type: 'ascii'
            }
        }

        validateFields(fieldsToBeValidated);

        await QuestionsService.add(category, option1, option2, correctAnswer, mainBranch, optionalBranch, message);

        res.json({
            success: true,
            message: 'Question successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const id = req.params.id;

    try {

        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        await QuestionsService.deleteById(id);
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});

module.exports = router;