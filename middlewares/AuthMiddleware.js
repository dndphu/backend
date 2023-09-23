const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token :>> ", token);
  if (token == null) {
    const err = new CustomError("Unauthorized",401);
    next(err)
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};
