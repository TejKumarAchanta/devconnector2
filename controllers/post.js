const Post = require("../models/Post");
const User = require("../models/User");

const postController = {};

postController.addPost = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  });

  const post = await newPost.save();

  return res.status(200).json({
    error: false,
    data: post,
  });
};

postController.getPosts = async (req, res) => {
  const posts = await Post.find().sort("-date");

  if (!posts) {
    return res.status(404).json({
      error: false,
      message: "No posts",
    });
  }

  return res.status(200).json({
    error: false,
    data: posts,
  });
};

postController.getPostsbyId = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).sort("-date");

  if (!post) {
    return res.status(404).json({
      error: false,
      message: "No post",
    });
  }

  return res.status(200).json({
    error: false,
    data: post,
  });
};

postController.deletePostbyId = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({
      error: false,
      message: "User Not Authorized",
    });
  }

  await Post.findByIdAndRemove(id);

  return res.status(200).json({
    error: false,
    message: "post deleted",
  });
};

postController.likePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(200).json({
      error: false,
      message: "post  Already Liked",
    });
  }
  const userObj = {
    user: req.user.id,
  };

  post.likes.unshift(userObj);

  return res.status(200).json({
    error: false,
    message: "post Liked",
  });
};

postController.dislikePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(200).json({
      error: false,
      message: "post has not been Liked",
    });
  }

  let likes = post.likes.filter((like) => like.user.toString() === req.user.id);
  post.likes = likes;

  await post.save();

  return res.status(200).json({
    error: false,
    message: "post unliked",
  });
};

postController.addComment = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  const user = await User.findOne({ _id: req.user.id }).select("avatar");

  const commentObj = {
    user: req.user.id,
    text: req.body.text,
    avatar: user.avatar,
  };

  post.comments.unshift(commentObj);

  await post.save();

  return res.status(200).json({
    error: false,
    message: "Comment Added",
  });
};

postController.deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = await Post.findById(postId).select("comments");

  let comments = post.comments.filter(
    (commnet) => commnet._id.toString() !== commentId
  );

  post.comments = comments;

  await post.save();

  return res.status(200).json({
    error: false,
    message: "comment deleted",
  });
};

module.exports = postController;
