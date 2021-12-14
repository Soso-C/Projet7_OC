const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const userController = require("../controllers/user_controller");

// Auth Middleware
const auth = require('../middleware/auth_middleware');

// Auth
router.post("/signup", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", auth);
 
// userDB
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);

//Modify user
router.put("/:id", auth, userController.modifyUser);

//Delete user
router.delete("/:id", auth, userController.deleteUser);


module.exports = router;
