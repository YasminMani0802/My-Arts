const userOperations = require('../../mongoose/users/userOperations');

async function removeFromFavourites(req, res, next) {
    const {
        product_id,
        user_id
    } = req.query;

    try {
        const favourites = await userOperations.removeFromFavourites(product_id, user_id);


        if (!favourites)
            return res.status(400).json('Delete product from favourites failed');
        next();

    } catch {
        return res.status(400).json('Deleted from favourites failed!!!!');
    }

}

module.exports = removeFromFavourites;