const userModel = require('../../mongoose/users/userModel');

async function getUser(req, res) {
    try {
        const user = await userModel.findOne({
            _id: req.query.user_id
        });

        const {
            fullName,
            isArtist
        } = user._doc;

        res.json({
            authenticated: true,
            userName: fullName,
            isArtist
        });
    } catch {
        res.status(401).json({
            authenticated: false,
            userName: null,
            isArtist: null
        });
    }
}

module.exports = getUser;