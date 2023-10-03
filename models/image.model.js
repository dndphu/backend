var mongoose = require("mongoose");
var ImageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  data: Buffer,
  mimetype: String,
});
const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
