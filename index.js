const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv").config();
const path = require("path");
const morgan = require("morgan");

const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/error.controller");


//  const token = require('crypto').randomBytes(64).toString('hex')

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

//connect mongodb
const db = require("./config/db");
db.connect();

// add request at - before config router
app.use((req, res, next) => {
  req.requestAt = new Date().toISOString();
  next();
});

app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//config router
const route = require("./routers/index.routes");
route(app);


app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

