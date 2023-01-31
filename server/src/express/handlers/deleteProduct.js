const productOperations = require('../../mongoose/products/productOperations');


async function deleteProduct(req, res) {
    const {
        product_id
    } = req.query;
    try {
        const retVal = await productOperations.deleteOne(product_id);
        if (!retVal)
            return res.status(400).json('Delete failed');

        return res.json(retVal);
    } catch {
        return null;
    }
}

module.exports = deleteProduct;