const express = require("express");
const app = express();
const port = process.env.PORT|| 3000;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")


app.get("/", (req, res) => {
  res.send("Hello World!");
});


const db = require("./config/db");
db.connect();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
