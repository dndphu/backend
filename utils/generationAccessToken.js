const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = function generateAccessToken(userId) {
  //30 minutes 1800s
  console.log('userId :>> ', userId);
  return jwt.sign({ id: userId }, config.secret, {
    expiresIn: config.jwtExpiration,
  });
};
