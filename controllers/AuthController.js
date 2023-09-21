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
      exits.success({ req, res, data: user });
    } catch (error) {
      console.log("error :>> ", error);
      if (error && error.code === 11000) {
        exits.badRequest({ res, message: "User or Email already exits" });
      }
      next();
    }
  }

  // [POST] /login
  async login(req, res, next) {
    try {
      const user = await User.findOne({ username: req.body.username });

      //not found
      !user && exits.badRequest({ res, message: "Not Found User" });

      const validate = await bcrypt.compare(req.body.password, user.password);

      //password error
      !validate && exits.badRequest({ res, message: "Invalid Authentication" });

      const { password, ...other } = user._doc;

      exits.success({ req, res, data: other });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
