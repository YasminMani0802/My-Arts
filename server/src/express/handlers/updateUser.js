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
            return res.status(500).json('Failed to update user');

        return res.json(user);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = updateUser;