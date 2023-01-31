const userModel = require('../../mongoose/users/userModel');

async function getFullUserByID(req, res) {
    try {
        const user = await userModel.findOne({
            _id: req.query.user_id
        });

        const {
            password,
            ...data
        } = user._doc;
        res.json(data);
    } catch {
        res.status(401).json('Could not find the user');
    }
}

module.exports = getFullUserByID;