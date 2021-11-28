const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
// const multer = require("multer");


// Post
router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);


// Comments


module.exports = router;