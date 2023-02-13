const productOperations = require('../../mongoose/products/productOperations');


async function deleteProduct(req, res) {
    const {
        product_id,
        user_id
    } = req.query;
    try {
        const retVal = await productOperations.deleteOne(product_id, user_id);
        if (!retVal)
            return res.status(500).json('Delete failed');

        return res.json(retVal);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = deleteProduct;