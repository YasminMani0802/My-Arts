const productOperations = require('../../mongoose/products/productOperations');

async function getThreeProducts(req, res) {
    const products = await productOperations.getThreeProducts();
    return res.json(products);
}

module.exports = getThreeProducts;