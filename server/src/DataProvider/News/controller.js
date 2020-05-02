const express = require('express');

const NewsService = require('./services.js');
const { validateFields } = require('../../utils');
const { authorizeAndExtractToken } = require('../../security/jwt');
const { authorizeRoles } = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;
const {adminRole, supportRole, userRole} = UsersConstants.roles;

const router = express.Router();

router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res) => {

    try {

        const news = await NewsService.getAll();
        res.json(news);
    } catch (err) {
        next(err);
    }
});


router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res) => {

    try {

        const news = await NewsService.getById(req.params.id);
        res.json(news);
    } catch (err) {

        next(err);
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res) => {

    const newsText = req.body.newsText;
    const postedBy = req.body.postedBy;
    const date = Date.now();
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            newsText: {
                value: newsText,
                type: 'ascii'
            },
            postedBy: {
                value: postedBy,
                type: 'ascii'
            },
            date: {
                value: date,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await NewsService.add(newsText, postedBy, date, course);

        res.json({
            success: true,
            message: 'News successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res) => {

    const id = req.params.id;
    const newsText = req.body.newsText;
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            newsText: {
                value: newsText,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await NewsService.updateById(id, newsText, course);

        res.json({
            success: true,
            message: 'News successfully updated!'
        });
    } catch(err) {
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

        await NewsService.deleteById(id);
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});

module.exports = router;
