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
        .populate("user likes", "fullname username avatar");
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
};

module.exports = postCtrl;
