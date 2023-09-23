const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(username) {
  //30 minutes
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};
