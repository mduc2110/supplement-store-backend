const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, 'img' + '-' + Date.now() + path.extname(file.originalname))
    }
})

// const filerFilter = (req, file, cb) => {
//     cb(null, true)
// }

let upload = multer({
    storage: storage,
    // fileFilter: filerFilter
});

module.exports = upload.single('imgUrl');

