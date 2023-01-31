const path = require('path');


async function saveImage(req, res) {
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
    } catch (e) {

        return res.status(422).end();
    }
}

module.exports = saveImage;