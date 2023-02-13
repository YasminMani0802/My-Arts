const productOperations = require('../../mongoose/products/productOperations');

async function getMyProducts(req, res) {
    try {
        const myProducts = await productOperations.getMyProducts(req.query.user_id);
        if (!myProducts)
            return res.status(500).json('Failed to find my products');

        return res.json(myProducts);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getMyProducts;