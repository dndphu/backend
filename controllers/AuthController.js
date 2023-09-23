const bcrypt = require("bcrypt");
const User = require("../model/user");
const exits = require("../utils/Exits");
const CustomError = require("../utils/customError");
const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const generateAccessToken = require("../utils/generationAccessToken");
class AuthController {
  //[POST] /register
  async register(req, res, next) {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new CustomError(JSON.stringify(errors), 400, "array");
      next(err);
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
          username,
          email,
          password: hashedPass,
        });
        const user = await newUser.save();
        exits.success({ req, res, data: user });
      } catch (error) {
        next(error);
      }
    }

    // }
  }

  // [POST] /login
  async login(req, res, next) {
    try {
      const user = await User.findOne({ username: req.body.username });

      //not found
      const err = new CustomError("Not found user", 404);
      !user && err && next(err);

      const validate = await bcrypt.compare(req.body.password, user.password);

      //password error
      const errPassword = new CustomError("Not found user", 404);
      !validate && errPassword && next(errPassword);

      const token = generateAccessToken({ username: req.body.username });
      const { password, ...other } = user._doc;
      other.token = token;
      exits.success({ req, res, data: other });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
