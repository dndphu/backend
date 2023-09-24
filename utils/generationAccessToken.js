const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(username) {
  //30 minutes 1800s
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};
