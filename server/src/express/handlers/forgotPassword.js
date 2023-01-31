const UserModel = require('../../mongoose/users/userModel');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');


async function forgotPassword(req, res) {
    try {
        const {
            email
        } = req.body;
        // console.log("email: ", email);
        const user = await UserModel.findOne({
            email
        });
        // console.log("user: ", user);

        let tokenDetails = {
            _id: user._id,
            userName: user.fullName,
            isArtist: user.isArtist
        };
        // console.log("tokenDetails: ", tokenDetails);

        const token = jwt.sign(tokenDetails, 'forgotPasswordKey', {
            expiresIn: '15m'
        });
        // console.log("token: ", token);

        const resetLink = `http://localhost:4200/auth/reset-password/${user._id}/${token}`;

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'myarts2080@gmail.com',
                pass: 'oolqnpdvvbjktgvs'
            }
        });
        const details = {
            to: email,
            from: 'myarts2080@gmail.com',
            subject: 'Reset your password',
            html: `Click <a href=${resetLink}>here<a> to reset your password`
        };
        // console.log("details: ", details);

        transporter.sendMail(details, (err, info) => {
            if (err) {
                // console.log(err);
                return res.status(400).json(err);
            }
            return res.json(info.response);
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = forgotPassword;