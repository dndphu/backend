const { check, validationResult, body } = require("express-validator");

const userDataValidate = [
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
  body("email").optional().isEmail().withMessage("Please enter a valid email"),
];

// const userDataValidate = [
//   check("username", "Please enter a username").exists({ checkFalsy: true }),
//   check("email", "Please enter a valid email").isEmail(),
//   check("password", "Please enter a password with a min length of 6").isLength({
//     min: 6,
//   }),
// ];

module.exports = userDataValidate;
