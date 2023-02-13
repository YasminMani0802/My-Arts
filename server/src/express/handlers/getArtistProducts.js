const productOperations = require('../../mongoose/products/productOperations');

async function getArtistProducts(req, res) {
    try {
        const artistProducts = await productOperations.getArtistProducts(req.query.artist_id);
        if (!artistProducts)
            return res.status(500).json('Failed to find artist products');

        return res.json(artistProducts);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = getArtistProducts;