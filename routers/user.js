const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authenticateToken = require("../middlewares/AuthMiddleware");

router.get("/user/:id", authenticateToken, userController.getUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.updateUser);

module.exports = router;
