const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
const multer = require("multer");
const upload = multer();
const auth = require('../middleware/auth_middleware');


// Post
router.post("/", multer, postController.createPost);
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getOnePost);
router.put("/:id", auth, postController.modifyPost);
router.delete("/:id", auth, postController.deletePost);

// Comments


// test upload

router.post("/upload", auth, upload.single("file"), postController.stockImg)


module.exports = router;
