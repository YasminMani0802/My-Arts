const path = require('path');


async function saveUserImage(req, res) {
    try {
        const image = req.files.image;

        const extensionType = path.extname(image.name);
        const allowedTypes = ['.jpg', '.jpeg', '.png'];
        if (!allowedTypes.includes(extensionType)) {
            return res.status(422).end();
        }
        const relativePath = `/images/${image.md5}${extensionType}`;
        const basePath = `${__dirname}/../..${relativePath}`;

        image.mv(basePath);

        res.send({
            imagePath: relativePath
        });
    } catch (error) {
        return res.status(422).json({
            error: error.message
        });
    }
}

module.exports = saveUserImage;