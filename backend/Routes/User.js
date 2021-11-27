const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller")

// Post pour créer user
router.post("/signup", authController.signUp);

// Post login user
router.post("/login", authController.signIn);

module.exports = router;
