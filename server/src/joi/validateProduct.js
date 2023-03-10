const joi = require('joi');

const schema = joi.object({
    user_id: joi.string().required(),
    name: joi.string().required().min(3),
    description: joi.string().min(0),
    price: joi.string().required(),
    imagePath: joi.string().required(),
    artistName: joi.string().required(),
    userImage: joi.string()
});

function validateProduct(details) {
    return schema.validate(details);
}

module.exports = validateProduct;