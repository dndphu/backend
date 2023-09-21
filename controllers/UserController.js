const User = require("../model/user");
const exits = require("../helpers/exits");

class UserController {
  //[POST] /register
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...other } = user._doc;
      exits.success({ res, data: other });
    } catch (error) {
      exits.badRequest({ res, next,message: "Not found user" });
    }
  }
}

module.exports = new UserController();
