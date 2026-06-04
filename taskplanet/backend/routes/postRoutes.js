const express = require("express");
const Post = require("../models/Post");


const router = express.Router();

// Create Post
router.post("/create", async (req, res) => {
  try {
    const { userId, username, text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({
        message: "Post must contain text or image",
      });
    }

    const post = await Post.create({
      userId,
      username,
      text,
      image,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Like Post
router.put("/:id/like", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }

    res.json({
      message: "Post liked",
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Comment on Post
router.post("/:id/comment", async (req, res) => {
  try {
    const { username, comment } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      username,
      comment,
    });

    await post.save();

    res.json({
      message: "Comment added",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;