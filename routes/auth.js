const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const authController = require('../controllers/auth');



// Register User
router.post("/login", [auth], authController.login);

module.exports = router;