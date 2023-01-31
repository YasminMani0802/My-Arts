const productOperations = require('../../mongoose/products/productOperations');

async function getMyProducts(req, res) {
    try {
        const myProducts = await productOperations.getMyProducts(req.query.user_id);
        if (!myProducts)
            return res.status(400).json('failed');

        return res.json(myProducts);
    } catch {
        return res.status(400).json('failed');
    }
}

module.exports = getMyProducts;