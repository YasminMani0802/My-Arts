async function logout(req, res) {
    res.cookie('jwt', '', {
        maxAge: 0
    });

    res.json({
        authenticated: false,
        userName: null
    });
}

module.exports = logout;