const productOperations = require('../../mongoose/products/productOperations');

async function getAllProducts(req, res) {
    try {
        const all = await productOperations.getAllProducts();
        if (!all)
            return res.status(404).json("Could not find the products");

        return res.json(all);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getAllProducts;