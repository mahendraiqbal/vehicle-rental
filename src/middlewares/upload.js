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

// const uploadImage = multer ({
//     storage,
//     limits: {
//         fileSize: 2 * 1024 * 1024
//     },
//     fileFilter(req, file, cb) {
//         if(!file.mimetype == 'jpg' || !file.mimetype == 'png' || !file.mimetype == 'jpeg') {
//             cb(null, false);
//             return cb(new Error('Format image must jpg, img, jpeg'))
//         }
//         cb(null, true);
//     }
// });

const multerOptions = { storage };

module.exports = multer(multerOptions);