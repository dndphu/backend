const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
    username: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", PostSchema);
