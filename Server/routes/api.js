// routes/authRoutes.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const uri =
  "mongodb+srv://turffgroup:N9Jh9OBVz3xp5ytL@ir-db.te1zfe6.mongodb.net/?retryWrites=true&w=majority";

// const user = {
//   email,
//   password,
//   firstName,
//   lastName,
//   phoneNumber,
// };

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    await user.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", (req, res) => {
  res.send("hello API");
});

module.exports = router;
