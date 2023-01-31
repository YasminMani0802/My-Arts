const UserModel = require('./userModel');
const bcryptjs = require('bcryptjs');
const productOperations = require('../../mongoose/products/productOperations');
const ProductModel = require('../products/productModel');


async function register(details) {
    try {
        const salt = bcryptjs.genSaltSync(10);
        details.password = await bcryptjs.hash(details.password, salt);
        return await new UserModel(details).save();
    } catch {
        return null;
    }
}

async function getAllUsers() {
    try {
        return await UserModel.find({
            isArtist: false
        });
    } catch {
        return null;
    }
}

async function getAllArtists() {
    try {
        return await UserModel.find({
            isArtist: true
        });
    } catch {
        return null;
    }
}



async function logInUser(email, password) {
    try {
        const userFromDB = await UserModel.findOne({
            email: email
        });
        if (!userFromDB)
            return null;
        const result = await bcryptjs.compare(password, userFromDB.password);
        if (result)
            return userFromDB;

        return null;

    } catch {
        return null;
    }
}

async function getMyFavourites(user_id) {
    try {
        const user = await UserModel.findOne({
            _id: user_id
        });
        if (!user)
            return null;
        const products = await productOperations.getAllProducts();

        const favourites = [];
        products.forEach((product, i) => {

            return user.favourites.forEach((id) => {

                if (id === product._doc._id.valueOf())
                    favourites.push(product);
            })

        });

        return favourites;

    } catch {
        return null;
    }
}

async function addToFavourites(product_id, user_id) {
    try {
        const user = await UserModel.findOne({
            _id: user_id
        });
        if (!user)
            return null;
        if (user.favourites.indexOf(product_id) > -1)
            return null;
        user.favourites.push(product_id);
        await user.save();
        return user;
    } catch {
        return null;
    }
}

async function removeFromFavourites(product_id, user_id) {

    try {
        const user = await UserModel.findOne({
            _id: user_id
        });

        if (!user)
            return null;

        const i = user.favourites.indexOf(product_id);
        user.favourites.splice(i, 1);
        await user.save();
        return user.favourites;
    } catch {
        return null;
    }
}

async function isFavourite(user_id, product_id) {

    try {
        const user = await UserModel.findOne({
            _id: user_id
        });
        if (!user)
            return null;
        const index = user.favourites.indexOf(product_id);
        if (index > -1)
            return true;
        else {
            return false;
        }
    } catch {
        return null;
    }
}

async function updateUser(user_id, details) {

    try {
        const user = await UserModel.findOne({
            _id: user_id
        });
        if (!user)
            return null;
        await UserModel.updateOne({
            _id: user_id
        }, {
            $set: {
                ...details
            }
        });
        await user.save();
        let updatedUser = await UserModel.findOne({
            _id: user_id
        });
        const updatedProducts = await ProductModel.updateMany({
            artistName: user.fullName
        }, {
            $set: {
                artistName: updatedUser.fullName
            }
        });



        return updatedUser;

    } catch {
        return null;

    }
}

async function deleteUser(user_id) {
    try {

        const user = await UserModel.deleteOne({
            _id: user_id
        });

        if (user.deletedCount == 0)
            return false;
        const artistProducts = await ProductModel.find({
            user_id
        });

        if (artistProducts === []) {
            const deleteProducts = await ProductModel.deleteMany({
                user_id
            });

            if (deleteProducts.deletedCount == 0)
                return false;
        }
        return true;
    } catch {
        return null;
    }
}

async function changePassword(user_id, newPassword) {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
        const user = await UserModel.findOne({
            _id: user_id
        });
        const update = await UserModel.updateOne({
            _id: user_id
        }, {
            $set: {
                password: hashedPassword
            }
        });
        if (update.modifiedCount > 0) {
            await user.save();
        }
        const updatedUser = await UserModel.findOne({
            _id: user_id
        });
        return updatedUser;

    } catch (error) {
        return {
            "usersOperations.changePassword": error.message
        };
    }
}




module.exports = {
    getAllUsers,
    getAllArtists,
    register,
    logInUser,
    addToFavourites,
    getMyFavourites,
    removeFromFavourites,
    isFavourite,
    updateUser,
    deleteUser,
    changePassword
};