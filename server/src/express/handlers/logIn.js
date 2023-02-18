const validateSignIn = require('../../joi/validateSignIn');
const userOperations = require('../../mongoose/users/userOperations');
const jwt = require('jsonwebtoken');

async function logIn(req, res) {
    try {
        const {
            email,
            password,
        } = req.body;

        const {
            error
        } = validateSignIn(req.body);
        if (error)
            return res.status(400).json({
                message: error.details[0].message
            });


        const retVal = await userOperations.logInUser(email, password);
        if (!retVal) {
            return res.status(401).json('Incorrect email or password');
        }
        console.log("retVal: ", retVal);


        const token = jwt.sign({
            _id: retVal._id,
            userName: retVal.fullName,
            isArtist: retVal.isArtist
        }, 'mykey', {
            expiresIn: '4h'
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 Day,
        });
        res.json({
            authenticated: true,
            userName: retVal.fullName,
            isArtist: retVal.isArtist,
            userImage: retVal.imagePath
        });
    } catch {
        return res.status(400).json({
            authenticated: false,
            userName: null,
            isArtist: null
        });
    }
}

module.exports = logIn;