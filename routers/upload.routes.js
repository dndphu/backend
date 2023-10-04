const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer.middleware");
const uploadController = require("../controllers/upload.controller.js");

router.post("/upload", upload.single("avatar"), uploadController.uploadSingle);

router.get("/image", uploadController.getImg);
module.exports = router;
