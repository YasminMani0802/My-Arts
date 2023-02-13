const userModel = require('../../mongoose/users/userModel');

async function getFullUserByID(req, res) {
    try {
        const user = await userModel.findOne({
            _id: req.query.user_id
        });

        if (!user)
            return res.status(404).end();

        const {
            password,
            ...data
        } = user._doc;
        res.json(data);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getFullUserByID;