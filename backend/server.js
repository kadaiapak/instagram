const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const authRouter = require("./route/authRouter");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`server runing on ${process.env.NODE_ENV} mode an port ${PORT}`)
);

module.exports = app;