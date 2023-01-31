const productOperations = require('../../mongoose/products/productOperations');

async function getAllProducts(req, res) {
    const all = await productOperations.getAllProducts();
    return res.json(all);
}

module.exports = getAllProducts;