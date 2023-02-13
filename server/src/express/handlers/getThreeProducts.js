const productOperations = require('../../mongoose/products/productOperations');

async function getThreeProducts(req, res) {
    try {
        const products = await productOperations.getThreeProducts();
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getThreeProducts;