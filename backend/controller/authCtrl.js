const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;

      const newUsername = username.toLowerCase().replace(/ /g, "");

      //cek username sudah ada
      const user_name = await User.findOne({ username: newUsername });
      if (user_name)
        return res.status(400).json({ msg: "username already exist" });

      //cek apakah email sudah ada
      const user_email = await User.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "email already exist" });

      //cek apakah length dari password cukup
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "password must be more than 6 characters" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullname,
        username: newUsername,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await newUser.save();
      res.json({
        msg: "Register Success",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate(
        "followers following",
        "-password"
      );
      if (!user) return res.status(400).json({ msg: "email doesnot exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "incorrect password" });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Login Success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "logged out" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login" });
      jwt.verify(
        rf_token,
        process.env.TOKEN_REFRESH_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now" });

          const user = await User.findById(result.id)
            .select("-password")
            .populate("followers following", "-password");
          if (!user)
            return res.status(400).json({ msg: "This user does not exist" });
          const access_token = createAccessToken({ id: result.id });
          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  cobates: async (req, res) => {
    res.json({
      msg: "tes",
    });
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
