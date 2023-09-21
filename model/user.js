const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please enter username!"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Please enter an email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minLength: 8,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
