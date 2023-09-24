const express = require("express");
const router = express.Router();

const userDataValidate = require("../utils/validations/user.validation.js");
const authController = require("../controllers/AuthController.js");

router.post("/register", userDataValidate, authController.register);
router.post("/login", authController.login);

module.exports = router;

