const UserModel = require("../../mongoose/users/userModel");
const jwt = require('jsonwebtoken');

async function getAccessToResetPassword(req, res) {

    const {
        id,
        token,
    } = req.params;

    try {
        const verifyToken = jwt.verify(token, 'forgotPasswordKey');

        if (!verifyToken) {
            return res.status(400).json('You are not allowed to change the password');
        }

        const user = await UserModel.findOne({
            _id: id
        });

        if (!user) {
            return res.status(400).json('User not exist');
        }
        const {
            password,
            ...data
        } = user._doc
        return res.json(data);
    } catch (error) {
        return res.status(400).json(error.message);

    }
}

module.exports = getAccessToResetPassword;