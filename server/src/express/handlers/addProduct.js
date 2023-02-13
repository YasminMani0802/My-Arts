const validateProduct = require("../../joi/validateProduct");
const productOperations = require('../../mongoose/products/productOperations');


async function addProduct(req, res) {
    try {
        const {
            user_id
        } = req.query;
        const {
            ...data
        } = req.body;

        const {
            error
        } = validateProduct({
            user_id,
            ...data
        });
        if (error)
            return res.status(400).json({
                "error": error.details[0].message
            });


        const retVal = await productOperations.addProduct({
            user_id,
            ...data
        });

        if (retVal === null)
            return res.status(500).json('Adding product failed');

        return res.json('Adding product succeeded');

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = addProduct;