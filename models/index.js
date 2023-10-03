const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.post = require("./post.model");
db.category = require("./category.model");
// db.role = require("./role.model");

db.refreshToken = require("./refreshToken.model");
db.image = require("./image.model")
// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
