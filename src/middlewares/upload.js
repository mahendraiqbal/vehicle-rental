const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        const format = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(
            null,
            format
        );
    },
});

const multerOptions = { storage };

module.exports = multer(multerOptions);