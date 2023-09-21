const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/user/:id", userController.getUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.updateUser);

module.exports = router;
