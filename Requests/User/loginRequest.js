const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupUser } = require("../../Schema/UserSchema");

const loginUserRequest = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await signupUser.findOne({ email });
    if (existedUser) {
      const token = jwt.sign({ userId: existedUser._id }, "bulkmail");
      bcrypt.compare(password, existedUser.password, (err, response) => {
        if (response) {
          return res.status(200).json({ success: true, data: existedUser, token: token, });
        } else {
          return res.status(500).json({ success: false, data: {password:"Incorrect Password"} });
        }
      });
    } else {
      return res.status(500).json({ success: false, data: {email: "Incorrect Email"} });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

module.exports = { loginUserRequest };
