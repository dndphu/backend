const authRouter = require("./auth");
const uploadRouter = require("./upload");

function route(app) {
  app.use(authRouter);
  app.use(uploadRouter);
}

module.exports = route;
