const express = require("express");
const userCtrl = require("../controller/userCtrl");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/search", protect, userCtrl.searchUser);
router.get("/profile/:id", userCtrl.getUserProfile);

module.exports = router;
