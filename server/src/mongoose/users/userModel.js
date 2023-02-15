const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isArtist: {
        type: Boolean,
        required: true,
    },
    imagePath: {
        type: String,
        default: '/images/f9f30b775296f128fe7e2c5d42a113c8.png'
    },
    favourites: {
        type: Array
    }
});


module.exports = mongoose.model('user', userSchema);