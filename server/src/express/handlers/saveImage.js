const path = require('path');


async function saveImage(req, res) {
    try {
        const image = req.files.image;
        console.log(image);
        const extensionType = path.extname(image.name);
        const allowedTypes = ['.jpg', '.jpeg', '.png'];
        if (!allowedTypes.includes(extensionType)) {
            return res.status(422).end();
        }
        const relativePath = `/images/${image.md5}${extensionType}`;
        const basePath = `${__dirname}/../..${relativePath}`;
        console.log(__dirname);
        image.mv(basePath);
        // console.log(basePath);
        res.send({
            imagePath: relativePath
        });
    } catch (e) {

        return res.status(422).end();
    }
}

module.exports = saveImage;