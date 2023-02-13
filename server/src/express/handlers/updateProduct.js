const productOperations = require('../../mongoose/products/productOperations');

async function updateProduct(req, res) {
    try {
        const {
            product_id,
            ...details
        } = req.body;
        const retVal = await productOperations.updateProduct(product_id, details);

        if (!retVal)
            return res.status(500).json('Failed to update product');

        return res.json('The update was successful');

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = updateProduct;