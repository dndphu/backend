const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please enter username!"],
      lowercase: true,
      unique: true,
      // validate: {
      //   validator: function (v) {
      //     return  !validator.isEmpty(v);
      //   },
      //   message: "Please input username! 1",
      // },
    },
    email: {
      type: String,
      require: [true, "Please enter an email!"],
      unique: true,
      lowercase: true,
      // validate: [validator.isEmail, "Please enter a valid email! 1"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password! 1"],
      minLength: 6,

    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
