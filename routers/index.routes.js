const express = require("express");

const authRouter = require("./auth.routes");
const uploadRouter = require("./upload.routes");
const userRouter = require("./user.routes");

module.exports = function route(app) {
  app.use("/auth", authRouter);
  app.use(uploadRouter);
  app.use(userRouter);
};

