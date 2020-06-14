const Router = require('express')();
const jwt = require('jsonwebtoken');

const UsersController = require('../DataProvider/Users/controller.js');
const FaqsController = require('../DataProvider/Faqs/controller.js');
const QuestionsController = require('../DataProvider/Questions/controller.js');

Router.use('/users', UsersController);
Router.use('/faqs', FaqsController);
Router.use('/questions', QuestionsController);

// Welcome Page
Router.get('/', (req, res) => {

    jwt.verify(req.token, secretKey, (err, authData) => {

        if (err) {

            res.sendStatus(403);
        } else {

            res.json({
                message: "Welcome!"
            });
        }
    });
});

Router.post('/', (req, res) => {

    jwt.verify(req.token, secretKey, (err, authData) => {

        if (err) {

            res.sendStatus(403);
        } else {

            res.json({
                message: 'Welcome!'
            });
        }
    });
});

module.exports = Router;