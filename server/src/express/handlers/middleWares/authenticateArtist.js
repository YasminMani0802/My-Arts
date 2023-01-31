const jwt = require('jsonwebtoken')

async function authenticateArtist(req, res, next) {
    try {
        const cookie = req.cookies['jwt'];

        if (!cookie)
            return res.status(401).json('There is no user logged in');
        const claims = jwt.verify(cookie, 'mykey');
        if (!claims) {
            return res.status(401).json('The token is not approved');
        }

        req.query.user_id = claims._id;


        if (claims.isArtist === false) {
            return res.status(401).json('You are not an artist!');
        }
        next();
    } catch {
        res.status(401).json('Unauthenticated');
    };
}

module.exports = authenticateArtist;