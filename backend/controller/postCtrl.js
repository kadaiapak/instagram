const Posts = require("../models/postModel");

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;
      if (images.length === 0) {
        return res.status(400).json({ msg: "add your photo" });
      }
      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });

      await newPost.save();
      res.json({
        msg: "create post!",
        newPost,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      })
        .sort("-createdAt")
        .populate("user likes", "fullname username avatar")
        .populate({
          path: "comments", // untuk populate comments yang ada di postModel,
          populate: {
            path: "user likes", // untuk populate user dan like yang ada dalam comment di dalam post
            select: "-password", // agar password tidak ikut ter populate
          },
        });
      res.json({
        msg: "success",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;
      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id }, //req.params.id ....... bukan req.params._id
        { content, images }
      ).populate("user likes", "avatar username fullname");

      res.json({
        msg: "Post updated!",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0) {
        console.log(post);
        return res.status(400).json({ msg: "already like" });
      }
      await Posts.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: req.user._id } },
        { new: true }
      );
      res.json({ msg: "like success" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  dislikePost: async (req, res) => {
    try {
      await Posts.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: req.user._id } },
        { new: true }
      );

      res.json({ msg: "dislike it" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
