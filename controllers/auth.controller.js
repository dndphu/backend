const bcrypt = require("bcrypt");
const exits = require("../utils/Exits");
const CustomError = require("../utils/customError");
const { validationResult } = require("express-validator");
const generateAccessToken = require("../utils/generationAccessToken");
const db = require("../models");
const { user: User, refreshToken: RefreshToken } = db;

class AuthController {
  //[POST] /auth/register
  async register(req, res, next) {
    const { username, email, password: pwBody } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new CustomError(JSON.stringify(errors), 400, "array");
      next(err);
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pwBody, salt);
        const newUser = new User({
          username,
          email,
          password: hashedPass,
        });
        const user = await newUser.save();
        const { password, ...other } = user._doc;
        exits.success({ req, res, data: other });
      } catch (error) {
        next(error);
      }
    }
  }

  // [POST] /auth/login
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

      const token = generateAccessToken(user._id);

      //check refresh token is exits
      const dbRefreshToken = await RefreshToken.findOne({
        user: user._id,
      });

      let refreshToken = dbRefreshToken
        ? dbRefreshToken.token
        : await RefreshToken.createToken(user);

      const { password, ...other } = user._doc;
      other.token = token;
      other.refreshToken = refreshToken;

      exits.success({ req, res, data: other });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/refreshtoken
  async refreshToken(req, res, next) {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
      // return res.status(403).json({ message: "Refresh Token is required!" });
      const err = new CustomError("Refresh Token is required!", 403);
      next(err);
    }

    try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken });

      if (!refreshToken) {
        const err = new CustomError("Refresh token is not exits", 403);
        next(err);
        return;
      }

      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.findByIdAndRemove(refreshToken._id, {
          useFindAndModify: false,
        }).exec();

        const err = new CustomError(
          "Refresh token was expired. Please make a new signin request",
          403
        );
        next(err);
        return;
      }
      const token = generateAccessToken(refreshToken.user._id);

      const result = {
        token: token,
        refreshToken: refreshToken.token,
      };

      return exits.success({ req, res, data: result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
