const validateSignIn = require('../../joi/validateSignIn');
const userOperations = require('../../mongoose/users/userOperations');
const jwt = require('jsonwebtoken');

async function logIn(req, res) {
    try {
        const {
            email,
            password,
        } = req.body;
        // console.log(req.body);
        const {
            error
        } = validateSignIn(req.body);
        if (error)
            return res.status(400).json({
                "error.details[0].message: ": error.details[0].message
            });


        const retVal = await userOperations.logInUser(email, password);
        if (!retVal) {
            return res.status(500).json('Incorrect email or password');
        }

        // console.log(retVal);
        const token = jwt.sign({
            _id: retVal._id,
            userName: retVal.fullName,
            isArtist: retVal.isArtist
        }, 'mykey');
        // console.log(token);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 ,
        });
        res.json({
            authenticated: true,
            userName: retVal.fullName,
            isArtist: retVal.isArtist
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