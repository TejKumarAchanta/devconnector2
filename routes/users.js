const express = require("express");
const router = express.Router();


const userController = require("../controllers/users");

// Register User
router.post("/register", userController.registerUser);

module.exports = router;
