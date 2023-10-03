const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    file.fieldname = file.fieldname ||file.originalname;
    console.log('file :>> ', file);
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // No larger than 10mb
    fieldSize: 10 * 1024 * 1024, // No larger than 10mb
  },
});

module.exports = { storage, upload };
