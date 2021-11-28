const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
// const multer = require("multer");


// Post
router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.put("/:id", postController.modifyPost);
router.delete("/:id", postController.deletePost);

// Comments


module.exports = router;