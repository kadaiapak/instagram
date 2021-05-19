const express = require("express");
const postCtrl = require("../controller/postCtrl");
const protect = require("../middleware/protect");

const router = express.Router();

router.route("/posts").post(protect, postCtrl.createPost);

module.exports = router;
