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
      const user = await User.findById(id)
        .select("-password")
        // dittambahkan populate followers dan following karena jika tidak, getuser controller ini akan memberikan data user.follower
        // yang hanya berupa object id saja, jadi data user.follower itu cuma berupa array of _id, sehingga saat dilooping sewaktu
        // melakukan filter saat process unfollow user.followers maka terjadi error karna user.followers tersebut hanya berupa array
        // of id, namun jika dilakukan populate maka proses tersebut bisa dilakukan karena kita melakukan filter dari
        // array of object dari user
        .populate("followers following", "-password");
      if (!user) {
        res.status(404).json({ msg: "user not found" });
      }
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
      } = req.body;

      if (!fullname)
        return res.status(400).json({ msg: "Please add your fullname" });

      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          fullname,
          mobile,
          address,
          story,
          website,
          gender,
        }
      );

      res.json({ msg: "User Updated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  follow: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res.status(500).json({ msg: "You already follow this user" });

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        {
          new: true,
        }
      );

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params.id } },
        { new: true }
      );
      res.json({ msg: "Followed User" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
    // pertama cari dulu user tersebut
  },

  unfollow: async (req, res) => {
    try {
      // mencari user yang di follow tersebut
      // const user = await User.find({
      //   _id: req.params.id,
      //   followers: req.user._id,
      // });
      //jika user yang difollow
      // if (!user)
      //   return res.status(400).json({ msg: "You are not following this user" });

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        {
          new: true,
        }
      );

      await User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $pull: { following: req.params.id },
        },
        {
          new: true,
        }
      );

      res.json({ msg: "Unfolow" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
