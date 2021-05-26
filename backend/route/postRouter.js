const express = require("express");
const postCtrl = require("../controller/postCtrl");
const protect = require("../middleware/protect");

const router = express.Router();

router
  .route("/posts")
  .post(protect, postCtrl.createPost)
  .get(protect, postCtrl.getPosts);

router.route("/post/:id").patch(protect, postCtrl.updatePost);

module.exports = router;
