const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    POST api/posts
// @desc     Create a new post
// @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text field is missing').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.save();
      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error`);
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server Error`);
  }
});

// @route    GET api/posts/:id
// @desc     Get post by id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: `Post not found` });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `Post not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete post by id
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: `Post not found` });
    }

    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: `Delete is only available by the author` });
    }

    await post.remove();
    res.json({ msg: `Post removed` });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `Post not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like post by id
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: `Post not found` });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: `Post already liked by user` });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `Post not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike post by id
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`unliking ${postId}`);
    const post = await Post.findById(postId);
    if (!post) {
      console.log(`unliking2 ${postId}`);
      return res.status(404).json({ msg: `Post not found` });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      console.log(`unliking3 ${postId}`);
      return res.status(400).json({ msg: `Post was not liked by user` });
    }

    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    console.log(`unliking4 ${postId}`);
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `Post not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post by id
// @access   Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text field is missing').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: `Post not found` });
      }

      const user = await User.findById(req.user.id).select('-password');

      const newComment = {
        user: user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: `Post not found` });
      }
      res.status(500).send(`Server Error`);
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete a comment by post id
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: `Post not found` });
    }

    const commentToRemove = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!commentToRemove) {
      return res.status(404).json({ msg: `Comment not found` });
    }

    if (commentToRemove.user.toString() != req.user.id) {
      return res.status(401).json({ msg: `User not authorized` });
    }

    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `Post not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

module.exports = router;
