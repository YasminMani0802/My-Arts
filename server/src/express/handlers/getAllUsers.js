const usersOperations = require('../../mongoose/users/userOperations');


async function getAllUsers(req, res) {
    const all = await usersOperations.getAllUsers();
    res.json(all);
}

module.exports =
    getAllUsers;