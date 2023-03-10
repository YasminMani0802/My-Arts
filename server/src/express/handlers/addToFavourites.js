const userOperations = require("../../mongoose/users/userOperations");


async function addToFavourites(req, res, next) {
    const {
        product_id,
    } = req.body;
    const {
        user_id
    } = req.query;

    try {
        const user = await userOperations.addToFavourites(product_id, user_id);


        if (!user)
            return res.status(422).json('Add to favourites failed');
        next();
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = addToFavourites;