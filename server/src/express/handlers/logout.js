async function logout(req, res) {
    try {
        res.cookie('jwt', '', {
            maxAge: 0
        });

        res.json({
            authenticated: false,
            userName: null
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = logout;