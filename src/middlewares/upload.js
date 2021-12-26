const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./public")
    },
    limits: {
        fileSize : 2 * 1024 * 1024
    },
    fileUpload: function(req, file, cb) {
        if (file.mimetype == 'jpg' || !file.mimetype == 'png' || !file.mimetype == 'jpeg') {
            cb(null, false);
        } else {
            cb(null, false);
        }
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