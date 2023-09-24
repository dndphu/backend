const authRouter = require("./auth");
const uploadRouter = require("./upload");
const userRouter = require("./user");

module.exports = function route(app) {
  app.use("/auth", authRouter);
  app.use(uploadRouter);
  app.use(userRouter);
};
