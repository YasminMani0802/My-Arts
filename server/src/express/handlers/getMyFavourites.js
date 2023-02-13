const userOperations = require('../../mongoose/users/userOperations');

async function getMyFavourites(req, res) {
    try {
        const {
            user_id
        } = req.query;
        const favourites = await userOperations.getMyFavourites(user_id);
        if (!favourites)
            return res.status(500).json("Could not find favourites");

        return res.json(favourites);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }

}

module.exports = getMyFavourites;