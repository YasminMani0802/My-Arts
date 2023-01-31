const validateProduct = require("../../joi/validateProduct");
const productOperations = require('../../mongoose/products/productOperations');


async function addProduct(req, res) {
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
            "error.details[0].message: ": error.details[0].message
        });


    const retVal = await productOperations.addProduct({
        user_id,
        ...data
    });
    // console.log(retVal);
    if (retVal === null)
        return res.status(400).json('Adding product failed');

    return res.json('Adding product succeeded');
}

module.exports = addProduct;