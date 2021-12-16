const express = require("express");
const router = express.Router();
const postController = require('../controllers/post_controller');
const multer = require("multer");
const upload = multer();
const auth = require('../middleware/auth_middleware');


// Post
router.post("/", auth, upload.single("file"), postController.createPost);
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getOnePost);
router.put("/:id", auth, postController.modifyPost);
router.delete("/:id", auth, postController.deletePost);

// Comments
router.post("/comment-post", auth, postController.createComment);
router.get("/comment-post/:id", auth, postController.getAllComments);
router.delete("/comment-post/:id", auth, postController.deleteOneComment)
// router.get("/comment/:id", auth, postController.getOneComment);


module.exports = router;
