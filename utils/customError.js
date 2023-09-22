class CustomError extends Error {
  constructor(message, statusCode, type) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    //     this.isOperational = true;

    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
  formatErrors() {
    return this.type === "array" && (this.message = JSON.parse(this.message));
  }
}

module.exports = CustomError;
// //const error = new CustomError()
