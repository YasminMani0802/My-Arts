const productOperations = require('../../mongoose/products/productOperations');

async function getArtistProducts(req, res) {
    try {
        const artistProducts = await productOperations.getArtistProducts(req.query.artist_id);
        if (!artistProducts)
            return res.status(400).json('failed');

        return res.json(artistProducts);
    } catch {
        return res.status(400).json('failed');
    }
}

module.exports = getArtistProducts;