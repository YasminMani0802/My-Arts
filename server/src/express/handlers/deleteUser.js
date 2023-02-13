const userOperations = require('../../mongoose/users/userOperations');
const productOperations = require('../../mongoose/products/productOperations');

async function deleteUser(req, res) {
    try {

        const {
            user_id
        } = req.query;

        const user = await userOperations.deleteUser(user_id);



        if (!user)
            return res.status(500).json('Failed to delete product');

        const deletedProducts = await productOperations.deleteArtistProducts(user_id);
        if (deletedProducts) {

            res.cookie('jwt', '', {
                maxAge: 0
            });

            res.json({
                authenticated: false,
                userName: null
            });
        } else {
            res.status(500).json('Failed');
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

}

module.exports = deleteUser;