const userOperations = require('../../mongoose/users/userOperations');
const productOperations = require('../../mongoose/products/productOperations');

async function deleteUser(req, res) {
    try {

        const {
            user_id
        } = req.query;

        const user = await userOperations.deleteUser(user_id);



        if (!user)
            return res.status(400).json('Failed');

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
            res.status(400).json('Failed');
        }
    } catch {
        return res.status(400).json('Failed!')
    }

}

module.exports = deleteUser;