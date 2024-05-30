const mongoose = require("mongoose");
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
    const payload = {
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
    };

    const newUser = new signupUser(payload);
    const response = await newUser.save();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = {signupUserRequest};