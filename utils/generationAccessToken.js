const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = function generateAccessToken(username) {
  //30 minutes 1800s
  return jwt.sign(username, config.secret, { expiresIn: config.jwtExpiration });
};
