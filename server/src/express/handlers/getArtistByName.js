const UserModel = require('../../mongoose/users/userModel');

async function getArtistByName(req, res) {
    try {
        const user = await UserModel.findOne({
            fullName: req.query.artist_name,
            isArtist: true
        });
        if (!user)
            return res.status(404).end();

        const {
            password,
            ...data
        } = user._doc;
        res.json({
            user: data
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getArtistByName;