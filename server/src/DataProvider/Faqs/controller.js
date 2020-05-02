const express = require('express');

const FaqsService = require('./services.js');
const { validateFields } = require('../../utils');
const { authorizeAndExtractToken } = require('../../security/jwt');
const { authorizeRoles } = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;
const {adminRole, supportRole, userRole} = UsersConstants.roles;

const router = express.Router();

router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res) => {

    try {

        const faqs = await FaqsService.getAll();
        res.json({success: true, faqs: faqs});
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware
        next(err);
    }
});


router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res) => {

    try {

        const faq = await FaqsService.getById(req.params.id);
        res.json(faq);
    } catch (err) {

        next(err);
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    const question = req.body.question;
    const answer = "";
    const answeredBy = "";
    const date = Date.now();

    try {

        const fieldsToBeValidated = {
            question: {
                value: question,
                type: 'ascii'
            },
            date: {
                value: date,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await FaqsService.add(question, answer, answeredBy, date);

        res.json({
            success: true,
            message: 'Question successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res, next) => {

    const id = req.params.id;
    const question = req.body.question;
    const answer = req.body.answer;
    const answeredBy = req.body.answeredBy;

    try {

        const fieldsToBeValidated = {
            question: {
                value: question,
                type: 'ascii'
            },
            answer: {
                value: answer,
                type: 'ascii'
            },
            answeredBy: {
                value: answeredBy,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await FaqsService.updateById(id, question, answer, answeredBy);

        res.json({
            success: true,
            message: 'Question successfully updated!'
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

        await FaqsService.deleteById(id);
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});

module.exports = router;
