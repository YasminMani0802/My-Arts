const userOperations = require('../../mongoose/users/userOperations');


async function getAllArtists(req, res) {
    const all = await userOperations.getAllArtists();
    res.json(all);
}

module.exports =
    getAllArtists;