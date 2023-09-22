const CustomError = require("../utils/customError");
const duplicateKeyErrorHandler = (err) => {
  const key = Object.keys(err.keyValue);
  const name = Object.values(err.keyValue);
  const msg = `There is a ${key} already with '${name}'. Please use another name!`;

  return new CustomError(msg, 400);
};
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  console.log("error from err controller:>> ", error);
  if (error && error.code === 11000) {
    error = duplicateKeyErrorHandler(error);
  }
  if (error && error.name === "ValidationError") {
    error = validationErrorHandler(error);
  }
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
  next(error);
};
