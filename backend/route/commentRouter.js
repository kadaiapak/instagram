const express = require("express");
const commentCtrl = require("../controller/commentCtrl");
const protect = require("../middleware/protect");

const router = express.Router();

router.route("/comment").patch(protect, commentCtrl.addComment);

module.exports = router;
