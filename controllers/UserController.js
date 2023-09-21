const User = require("../model/user");
const exits = require("../utils/Exits");
const CustomError = require("../utils/customError");
class UserController {
  //[GET] /register
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...other } = user._doc;
      exits.success({ res, data: other });
    } catch (error) {
      // exits.badRequest({ res, next,message: "Not found user" });
      const err = new CustomError("Not found user", 404);
      next(err);
    }
  }
}

module.exports = new UserController();
