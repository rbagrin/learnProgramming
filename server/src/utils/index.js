const validator = require('validator');

const {
    ServerError
} = require('../errors');
/**
 * 
 * @param {*} fields 
 * @throws {ServerError}
 */
const validateFields = (fields) => {

    for (let fieldName in fields) {
        let fieldValue = fields[fieldName].value;
        const fieldType = fields[fieldName].type;

        if ((!fieldValue && fieldValue !== false && fieldValue !== 0x00) || fieldValue.length === 0) {
            throw new ServerError(`Lipseste campul ${fieldName}`, 400);
        }

        fieldValue += '';
        switch (fieldType) {
            case 'ascii':
                if (!validator.isAscii(fieldValue)) {
                    throw new ServerError(`The field ${fieldName} must contain only ascii characters.`, 400);
                }
                break;
            case 'alpha':
                if (!validator.isAlpha(fieldValue)) {
                    throw new ServerError(`The field ${fieldName} must contain only alpha characters.`, 400);
                }
                break;
            case 'int':
                if (!validator.isInt(fieldValue)) {
                    throw new ServerError(`The field ${fieldName} must contain only integers.`, 400);
                }
                break;
            case 'jwt':
                if (!validator.isJWT(fieldValue)) {
                    throw new ServerError(`The field ${fieldName}  must contain only JsonWebTokens.`, 400);
                }
                break;
            case 'email':
                if (!validator.isEmail(fieldValue)) {
                    throw new ServerError(`The field ${fieldName}  must contain only email addresses.`, 400);
                }
                break;
            case 'bool':
                if (!validator.isBoolean(fieldValue)) {
                    throw new ServerError(`The field ${fieldName}  must contain only boolean variables.`, 400);
                }
        }
    }
}

module.exports = {
    validateFields
}