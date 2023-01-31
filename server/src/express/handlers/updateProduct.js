const productOperations = require('../../mongoose/products/productOperations');

async function updateProduct(req, res) {
    try {
        const {
            product_id,
            ...details
        } = req.body;
        const retVal = await productOperations.updateProduct(product_id, details);
        // console.log("retVal: ", retVal);
        if (!retVal)
            return res.status(400).json('Failed');
        return res.json('The update was successful');
    } catch {
        return res.status(400).json('Failed!');

    }
}

module.exports = updateProduct;