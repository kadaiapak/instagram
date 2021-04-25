const express = require("express");
const userCtrl = require("../controller/userCtrl");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/search", protect, userCtrl.searchUser);
router.get("/profile/:id", userCtrl.getUserProfile);
router.patch("/user", protect, userCtrl.updateUser);
router.patch("/user/:id/follow", protect, userCtrl.follow);
router.patch("/user/:id/unfollow", protect, userCtrl.unfollow);

module.exports = router;
