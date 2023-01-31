const UserModel = require("../../mongoose/users/userModel");
const userOperations = require("../../mongoose/users/userOperations");
const jwt = require('jsonwebtoken');

async function resetPassword(req, res) {
    const {
        id,
        token
    } = req.params;

    const {
        password,
        confirmPassword,
    } = req.body;

    try {
        const verifyToken = jwt.verify(token, 'forgotPasswordKey');

        if (!verifyToken) {
            return res.status(400).json('You are not allowed to change the password');
        }
        if (password === confirmPassword) {
            const user = await UserModel.findOne({
                _id: id
            });
            if (!user) {
                return res.status(400).json('user is not exist');
            }

            const updatedUser = await userOperations.changePassword(user._id, password);
            if (!updatedUser) {
                return res.status(400).json('User updated failed');
            }
            return res.json(updatedUser);
        }

    } catch (error) {
        return res.status(400).json({
            "error.message: ": error.message
        });

    }
}

module.exports = resetPassword;