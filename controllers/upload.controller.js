// const User = require("../models/user.model");
const exits = require("../utils/Exits");
const fs = require("fs");
const Image = require("../models/image.model");
class UploadController {
  //[POST] /upload
  async uploadSingle(req, res, next) {
    try {
      console.log("req.file :>> ", req.file);
      const img = fs.readFileSync(req.file.path);
      const encode_image = img.toString("base64");
      // Define a JSONobject for the image attributes for saving to database
      const finalImg = {
        name: req.file.originalname,
        desc: req.file.destination,
        mimetype: req.file.mimetype,
        data: new Buffer(encode_image, "base64"),
      };
      await Image.create(finalImg);

      exits.success({ req, res, data: "Upload success" });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /image
  async getImg(req, res, next) {
    try {
      Image.find({}).then((data) => {
        // res.send({ status: "ok", data: data });
        console.log("data :>> ", data[0].img);
        // res.contentType([0].img.data.contentType);
        res.send(data[0].img.data);
      });
    } catch (error) {
      res.json({ status: error });
    }
  }
}

module.exports = new UploadController();
