const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const userController = require("../controllers/user_controller");

// Auth
router.post("/signup", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// userDB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.modifyUser);

module.exports = router;
