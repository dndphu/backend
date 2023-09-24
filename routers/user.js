const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authenticateToken = require("../middlewares/AuthMiddleware");

router
  .get("/user", userController.getAll)
  .get("/user/:id", authenticateToken, userController.getUser)
  .delete("/user/:id", userController.deleteUser)
  .put("/user/:id", userController.updateUser);

module.exports = router;
