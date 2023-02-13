const ProductModel = require('./productModel');

async function getAllProducts() {
    try {
        return await ProductModel.find();
    } catch {
        return null;
    }
}

async function getThreeProducts() {
    try {
        const products = await ProductModel.find();
        const threeProducts = products.slice(0, 3);
        return threeProducts;
    } catch {
        return null;
    }
}

async function addProduct(details) {
    try {

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

async function deleteOne(product_id, user_id) {
    try {
        const deleted = await ProductModel.deleteOne({
            _id: product_id
        });
        if (!deleted)
            return null;

        return ProductModel.find({
            user_id: user_id
        });
    } catch {
        return null;
    }
}

async function getProductByID(product_id) {
    try {
        const product = await ProductModel.findOne({
            _id: product_id
        });
        if (!product)
            return null;

        return product;
    } catch {
        return null;
    }
}

async function updateProduct(product_id, details) {
    try {

        const product = await ProductModel.findOne({
            _id: product_id
        });
        if (!product)
            return false;

        await ProductModel.updateOne({
            _id: product_id
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
    deleteArtistProducts,
    getThreeProducts
};