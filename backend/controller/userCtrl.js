const User = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const username = req.query.username;
      const user = await User.find({
        username: {
          $regex: username,
        },
      })
        .select("username avatar fullname")
        .limit(10);
      res.json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getUserProfile: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).select("-password");
      if (!user) {
        res.status(404).json({ msg: "user not found" });
      }
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
