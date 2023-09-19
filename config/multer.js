
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

module.exports = { storage, upload };