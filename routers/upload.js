const express = require("express");
const router = express.Router();
const Multer = require("../config/multer.js");

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, callb) => {
//     callb(null, "images");
//   },
//   filename: (req, file, callb) => {
//     //callb(null, "file.png")
//     callb(null, req.body.name);
//   },
// });
// const upload = multer({ storage: storage });

const uploadController = require("../controllers/UploadController.js");

router.post("/upload", Multer.upload.single("file"), uploadController.uploadSingle);


module.exports = router;
