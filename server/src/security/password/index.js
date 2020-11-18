const bcryptjs = require('bcrypt');

const hash = async (plainTextPassword) => {

    const salt = await bcryptjs.genSalt(5);
    const hash = await bcryptjs.hash(plainTextPassword, salt);
    return hash;
};

const compare = async (plainTextPassword, hashedPassword) => {

    const isOk = await bcryptjs.compare(plainTextPassword, hashedPassword);
    return isOk;
};

module.exports = {
    hash,
    compare
}