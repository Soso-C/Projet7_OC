const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
const multer = require("multer");
const upload = multer();


// Post
router.post("/", multer, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.put("/:id", postController.modifyPost);
router.delete("/:id", postController.deletePost);

// Comments


// test upload

router.post("/upload", upload.single("file"), postController.stockImg)


module.exports = router;
