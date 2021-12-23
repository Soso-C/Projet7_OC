const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
const multer = require("multer");
const upload = multer();


// Middleware Auth
const auth = require('../middleware/auth_middleware');


// Posts
router.post("/", auth, upload.single("file"), postController.createPost);
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getOnePost);
router.delete("/:id", auth, postController.deletePost);


// Comments
router.post("/comment-post", auth, postController.createComment);
router.get("/comment-post/:id", auth, postController.getAllComments);
router.delete("/comment-post/:id", auth, postController.deleteOneComment)

// Count Comments
router.get("/comment-count/:id", auth, postController.countAllComments)


module.exports = router;
