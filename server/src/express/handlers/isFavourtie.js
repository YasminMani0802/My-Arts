const userOperations = require("../../mongoose/users/userOperations");


async function isFavourite(req, res) {
    try {
        const {
            user_id,
            product_id,
        } = req.query;
        const isFavourite = await userOperations.isFavourite(user_id, product_id);

        if (isFavourite === null)
            return res.status(400).json('Failed');

        if (isFavourite === false)
            return res.json({
                isFavourite: false
            });
        return res.json({
            isFavourite: true
        });
    } catch {
        return res.status(400).json('Failed!');

    }
}

module.exports = isFavourite;