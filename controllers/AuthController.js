const bcrypt = require("bcrypt");
const User = require("../model/user");
const exits = require("../helpers/exits");
class AuthController {
  //[POST] /register
  async register(req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const { username, email, password } = req.body;
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPass,
      });

      const user = await newUser.save();
      exits.success({ res, data: user });
    } catch (error) {
      exits.badRequest({ res, error });
    }
  }

  // [POST] /login
  async login(req, res, next) {
    try {
      const user = await User.findOne({ username: req.body.username });

      //not found
      !user && exits.badRequest({ res, message: "Not Found User" });

      const { password, ...other } = user._doc;

      exits.success({ req, res, data: other });
    } catch (error) {
      exits.badRequest({ res, error });
    }
  }
}

module.exports = new AuthController();
