const jwt = require('jsonwebtoken');

const {
    ServerError
} = require('../../errors');

const {
    validateFields
} = require('../../utils');

// TODO: @rbagrin process.env....
const options = {
    issuer: 'Radu Bagrin',
    subject: 'token proiect PW',
    audience: 'postman'
};

/**
 * Generates authentification token
 * @param { {String, String} } payload {userId, userRole}
 * @returns { String } token
 */
const generateToken = (payload) => {

    try {

        return jwt.sign(payload, "myawesomeultrasecretkey", options); // TODO: Change secret key
    } catch (err) {

        console.trace(err);
        throw new ServerError("Error on token encode!", 500);
    }
};

/**
 * Verifies token and decodes data from token
 * @param {String} token
 * @returns {*}
 */
const verifyAndDecodeData = (token) => {

    try {

        return jwt.verify(token, 'myawesomeultrasecretkey', options);
    } catch (err) {

        console.trace(err);
        throw new ServerError("Eroare on token decode!", 500);
    }
};

/**
 * Authorizes request and extract token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authorizeAndExtractToken = (req, res, next) => {
    try {

        if (!req.headers.authorization) {

            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }
        const token = req.headers.authorization.split(" ")[1];

        validateFields({
            jwt: {
                value: token,
                type: 'jwt'
            }
        });

        const decoded = verifyAndDecodeData(token); // decoded = { userId, userRole }

        req.state = {
            decoded
        };

        next();
    } catch (err) {

        next(err);
    }
};

module.exports = {
    generateToken,
    authorizeAndExtractToken
};