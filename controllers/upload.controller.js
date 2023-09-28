const User = require("../models/user.model");
const exits = require("../utils/Exits");

class UploadController {
  //[POST] /register
  async uploadSingle(req, res, next) {
    try {
    exits.success({ res, data: "File has been uploaded" });
    } catch (error) {
      next(error);
    }
  }


}

module.exports = new UploadController();
