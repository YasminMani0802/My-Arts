const UserModel = require('../../mongoose/users/userModel');

async function getArtistByName(req, res) {
    try {
        const user = await UserModel.findOne({
            fullName: req.query.artist_name,
            isArtist: true
        });
        // console.log(user);
        const {
            password,
            ...data
        } = user._doc;
        res.json({
            user: data
        });
    } catch {
        res.status(401).json('Could not find the user');
    }
}

module.exports = getArtistByName;