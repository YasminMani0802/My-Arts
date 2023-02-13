const jwt = require('jsonwebtoken')

async function authenticate(req, res, next) {
    const cookie = req.cookies['jwt'];

    if (!cookie)
        return res.status(401).json('There is no user logged in');
    try {
        const claims = jwt.verify(cookie, 'mykey');
        req.query.user_id = claims._id;

        if (claims.isArtist) {
            req.query.isArtist = true;
        } else {
            req.query.isArtist = false;
        }
        next();
    } catch {
        res.status(401).json('Unauthenticated');
    };
}

module.exports = authenticate;