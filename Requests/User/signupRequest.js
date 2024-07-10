const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupUser } = require("../../Schema/UserSchema");

const signupUserRequest = async (req, res) => {
  const { name, email, password, image } = req.body;
  console.log("req.body = ", req.body);

  try {
    const existedUser = await signupUser.findOne({ email });
    if (existedUser) {
      return res
        .status(500)
        .json({ success: false, data: "Email Already Registered" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const token = jwt.sign(hashedPass, "bulkmail");
    const payload = {
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPass,
      image,
      token: token,
    };

    const newUser = new signupUser(payload);
    const response = await newUser.save();
    const responseData = {
      _id: response._id,
      name: response.name,
      email: response.email,
      image: response.image,
    };

    console.log("response = ", response);
    res.status(200).json({ success: true, data: responseData, token: token });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = { signupUserRequest };
