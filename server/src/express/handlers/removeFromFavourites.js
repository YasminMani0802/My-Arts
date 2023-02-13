const userOperations = require('../../mongoose/users/userOperations');

async function removeFromFavourites(req, res, next) {
    try {
        const {
            product_id,
            user_id
        } = req.query;

        const favourites = await userOperations.removeFromFavourites(product_id, user_id);


        if (!favourites)
            return res.status(500).json('Delete product from favourites failed');
        next();

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }

}

module.exports = removeFromFavourites;