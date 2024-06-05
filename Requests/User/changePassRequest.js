const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupUser } = require("../../Schema/UserSchema");

const changePasswordRequest = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await signupUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, data: {email: "Incorrect Email"} });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, data: {oldPassword: "Incorrect old password"} });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ success: true, data: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = { changePasswordRequest };
