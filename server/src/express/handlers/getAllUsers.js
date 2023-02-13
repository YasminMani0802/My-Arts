const usersOperations = require('../../mongoose/users/userOperations');


async function getAllUsers(req, res) {
    try {
        const all = await usersOperations.getAllUsers();
        return res.json(all);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports =
    getAllUsers;