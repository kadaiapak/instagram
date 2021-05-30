const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

const commentCtrl = {
  addComment: async (req, res) => {
    console.log("tes");
    try {
      const { postId, content, tag, reply } = req.body;
      const newComment = new Comment({
        user: req.user._id,
        content,
        tag,
        reply,
      });
      await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment._id } },
        { new: true }
      );

      await newComment.save();
      res.json({ newComment });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
