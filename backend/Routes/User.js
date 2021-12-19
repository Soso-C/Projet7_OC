const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const userController = require("../controllers/user_controller");

// Yup Schema
const userSchema = require("../validFormBack/UserValidation")

// Middleware
const auth = require('../middleware/auth_middleware');
const valid = require("../middleware/validation_middleware")

// Auth
router.post("/signup", valid(userSchema), authController.signUp);
router.post("/login", authController.signIn);

// userDB
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);

//Modify user
router.put("/:id", auth, userController.modifyUser);

//Delete user
router.delete("/:id", auth, userController.deleteUser);

// Show Profile
router.get("/profil/:id",auth, userController.getUserProfile)


module.exports = router;
