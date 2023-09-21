const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/ErrorController")

// http logger
app.use(morgan("combined"));

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//config static image
app.use(express.static(path.join(__dirname, "/images")));

// add request at - before config router
app.use((req, res, next) => {
  req.requestAt = new Date().toISOString();
  next();
});

//config router
const route = require("./routers");
route(app);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});
app.use(globalErrorHandler);

//connect mongodb
const db = require("./config/db");
db.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
