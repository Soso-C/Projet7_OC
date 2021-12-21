const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const userController = require("../controllers/user_controller");

// Yup Schema
const userSchema = require("../validFormBack/UserValidation")
const profilSchema = require("../validFormBack/ProfilValidation")
const loginSchema = require("../validFormBack/LoginValidation")

// Middleware SchemaYup
const valid = require("../middleware/validation_middleware")

// Middleware Auth
const auth = require('../middleware/auth_middleware');

// Auth
router.post("/signup", valid(userSchema), authController.signUp);
router.post("/login", valid(loginSchema), authController.signIn);

// Get userDB
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);

//Modify user (Profil)
router.put("/:id", auth, valid(profilSchema), userController.modifyUser);

//Delete user
router.delete("/:id", auth, userController.deleteUser);

// Show Profile
router.get("/profil/:id",auth, userController.getUserProfile)


module.exports = router;
