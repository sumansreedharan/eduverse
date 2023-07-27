const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,'./public/images')
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/videos'); // Specify the destination folder for uploaded videos
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

const upload = multer({storage:storage})
const videoUpload = multer({storage:videoStorage})
module.exports = {
  upload,
  videoUpload,
}