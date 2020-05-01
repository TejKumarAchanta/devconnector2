const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const postController = require("../controllers/post");

router.post("/addPost", [auth], postController.addPost);

router.get("/getPosts", [auth], postController.getPosts);

router.get("/getPostsbyId/:id", [auth], postController.getPostsbyId);

router.delete("/deletePostbyId/:id", [auth], postController.deletePostbyId);

router.put("/likePost/:id", [auth], postController.likePost);

router.put("/dislikePost/:id", [auth], postController.dislikePost);

router.put("/addComment/:id", [auth], postController.addComment);

router.delete("/deleteComment/:postId/:commentId", [auth], postController.deleteComment);


module.exports = router;
