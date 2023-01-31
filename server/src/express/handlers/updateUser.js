const userOperations = require('../../mongoose/users/userOperations');

async function updateUser(req, res) {
    try {
        const {
            user_id
        } = req.query;

        const {
            ...data
        } = req.body;
        const user = await userOperations.updateUser(user_id, data);


        if (!user)
            return res.status(400).json('Failed')
        return res.json(user);
    } catch {
        return res.status(400).json('Failed')
    }
}

module.exports = updateUser;