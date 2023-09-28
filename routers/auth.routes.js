const express = require("express");
const router = express.Router();

const userDataValidate = require("../utils/validations/user.validation.js");
const authController = require("../controllers/auth.controller.js");

router.post("/register", userDataValidate, authController.register);
router.post("/login", authController.login);
router.post("/refreshtoken", authController.refreshToken);

module.exports = router;

