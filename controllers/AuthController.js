const bcrypt = require("bcrypt");
const User = require("../model/user");
const exits = require("../utils/Exits");
const CustomError = require("../utils/customError");
var validator = require("validator");
class AuthController {
  //[POST] /register
  async register(req, res, next) {
    const { username, email, password } = req.body;

    const errValidate = new CustomError(
      `Please enter a ${!username ? "username" : ""} ${!email ? "email" : ""} ${
        !password ? "password" : ""
      }`,
      400
    );
    //check exits user email password
    const validInput = username && email && password;
    !validInput && errValidate && next(errValidate);
    // end check exits user, email, password

    //valid  email
    const validateEmail = validator.isEmail(email);
    const errEmail = new CustomError("Please enter a valid email!", 400);
    !validateEmail && errEmail && next(errEmail);
    //end valid email

    //valid min length password
    const validatePassword = validator.isLength(password, { min: 6 });
    const errPassword = new CustomError(
      "Please enter a password of 6 characters",
      400
    );
    !validatePassword && errPassword && next(errPassword);
    // end valid min-length email
    if (validInput && validatePassword && validateEmail) {
      console.log("chay do dang ki ne");
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
