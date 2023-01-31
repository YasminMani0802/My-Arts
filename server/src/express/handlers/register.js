const validateRegister = require('../../joi/validateRegister');
const userOperations = require('../../mongoose/users/userOperations');


async function register(req, res) {
    try {
        const {
            error
        } = validateRegister(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const retVal = await userOperations.register(req.body);
        if (retVal === null) {
            return res.status(400).json('One of the details already exist');
        } else {
            return res.json(req.body);
        }
    } catch (error) {
        return res.status(400).json(error)
    }

}

module.exports =
    register;