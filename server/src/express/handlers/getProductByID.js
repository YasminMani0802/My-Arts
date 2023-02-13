const productOperations = require('../../mongoose/products/productOperations');


async function getProductByID(req, res) {
    try {
        const {
            product_id
        } = req.query;
        const product = await productOperations.getProductByID(product_id);
        if (!product)
            return res.status(500).json('Failed to find product!');
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getProductByID;