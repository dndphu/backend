const User = require("../models/user.model");
const exits = require("../utils/Exits");
// const Post = require("../model/Post");

const CustomError = require("../utils/customError");
class UserController {
  //[GET] /user
  async getAll(req, res, next) {
    try {
      const users = await User.find().select('-password');
      exits.success({ req, res, data: users });
    } catch (error) {
      const err = new CustomError("Not found user", 404);
      next(err);
    }
  }

  //[GET] /user/:id
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...other } = user._doc;
      exits.success({ req, res, data: other });
    } catch (error) {
      const err = new CustomError("Not found user", 404);
      next(err);
    }
  }

  //[DELETE] /user/:id
  async deleteUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      try {
        //delete post of user
        // await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);

        exits.success({ req, res, data: "Deleted success" });
      } catch (error) {
        const err = new CustomError("Not found user", 404);
        next(err);
      }
    } catch (error) {
      const err = new CustomError("You can delete only your account", 400);
      next(err);
    }
  }

  //[PUT] /user/:id
  async updateUser(req, res, next) {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        exits.success({ req, res, data: updatedUser });
      } catch (error) {
        const err = new CustomError("Something Wrong", 400);
        next(err);
      }
    } else {
      const err = new CustomError("You can not update your account", 400);
      next(err);
    }
  }
}

module.exports = new UserController();
