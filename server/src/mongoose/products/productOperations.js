const ProductModel = require('./productModel');

async function getAllProducts() {
    try {
        return await ProductModel.find();
    } catch {
        return null;
    }
}

async function addProduct(details) {
    try {
        // console.log(details);
        return await new ProductModel(details).save();
    } catch {
        return null;
    }
}

async function getMyProducts(user_id) {
    try {
        return await ProductModel.find({
            user_id
        });
    } catch {
        return null;
    }
}
async function getArtistProducts(artistID) {
    try {
        return await ProductModel.find({
            user_id: artistID
        });
    } catch {
        return null;
    }
}

async function deleteOne(productID) {
    try {
        const deleted = await ProductModel.deleteOne({
            _id: productID
        });
        if (!deleted)
            return null;

        return ProductModel.find();
    } catch {
        return null;
    }
}

async function getProductByID(productID) {
    try {
        const product = await ProductModel.findOne({
            _id: productID
        });
        if (!product)
            return null;

        return product;
    } catch {
        return null;
    }
}

async function updateProduct(productID, details) {
    try {
        // console.log(details, productID);
        const product = await ProductModel.findOne({
            _id: productID
        });
        if (!product)
            return false;

        await ProductModel.updateOne({
            _id: productID
        }, {
            $set: {
                ...details
            }
        });
        await product.save();
        return true;
    } catch {
        return null;
    }
}
async function deleteArtistProducts(user_id) {
    try {

        const deletedProducts = await ProductModel.deleteMany({
            user_id
        });
        if (!deletedProducts)
            return false;

        return true;
    } catch {
        return null;
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    getMyProducts,
    getArtistProducts,
    deleteOne,
    getProductByID,
    updateProduct,
    deleteArtistProducts
};