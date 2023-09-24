const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const uploadRouter = require("./upload");
const userRouter = require("./user");

// module.exports = function route(app) {
//   app.use("/auth", authRouter);
//   app.use(uploadRouter);
//   app.use(userRouter);
// };

  router.use("/auth", authRouter);
  // router.use(uploadRouter);
  // router.use(userRouter);
module.exports = router