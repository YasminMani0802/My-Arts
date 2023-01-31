const userOperations = require('../../mongoose/users/userOperations');

async function getMyFavourites(req, res) {
    try {
        const {
            user_id
        } = req.query;
        const favourites = await userOperations.getMyFavourites(user_id);

        return res.json(favourites);
    } catch {
        return res.status(400).json('failed to load favourites');
    }

}

module.exports = getMyFavourites;