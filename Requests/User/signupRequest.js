const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupUser } = require("../../Schema/UserSchema");

const signupUserRequest = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existedUser = await signupUser.findOne({ email });
    if (existedUser) {
      return res
        .status(500)
        .json({ success: false, data: "Email Already Registered" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const payload = {
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPass,
    };

    const newUser = new signupUser(payload);
    const response = await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, "bulkmail");
    res.status(200).json({ success: true, data: response, token: token });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = { signupUserRequest };
