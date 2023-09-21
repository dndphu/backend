const authRouter = require("./auth");
const uploadRouter = require("./upload");
const userRouter = require("./user");

function route(app) {
  app.use(authRouter);
  app.use(uploadRouter);
  app.use(userRouter);
}

module.exports = route;
