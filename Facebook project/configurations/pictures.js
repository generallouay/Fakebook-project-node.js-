const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'profile-pictures');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload= multer({ storage: storageConfig });

module.exports = upload;