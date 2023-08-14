const multer = require("multer");
const cloudinary = require('../cloudinary/cloudStorage')

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

// const videoStorage = multer.memoryStorage();

const upload = multer({ storage: storage });

// const uploadVideo = multer({
//   storage: videoStorage,
//   fileFilter: function (req, file, cb) {
//     // Add your own file filtering logic if needed
//     if (file.mimetype.startsWith("video/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type"));
//     }
//   },
// });

const uploadVideo = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const array_of_allowed_files = ["mp4", "mpeg", "mov", "gif"]; // Remove the dot before "mov"
    const array_of_allowed_file_types = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "image/gif"
    ];
    if (
      array_of_allowed_files.includes(file_extension) &&
      array_of_allowed_file_types.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Type validation failed'), false);
      req.error = "Type validation failed";
    }
  }
});

module.exports = {
  upload,
  uploadVideo,
};
