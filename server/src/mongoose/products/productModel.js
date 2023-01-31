const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user_id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        required: false,

    },
    price: {
        type: String,
        require: true,
    },
    imagePath: {
        type: String,

    },
    artistName: {
        type: String
    }
});

module.exports = mongoose.model('product', productSchema);