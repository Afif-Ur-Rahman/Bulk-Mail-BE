const { signupUser } = require("../../Schema/UserSchema");

const loginUserRequest = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await signupUser.findOne({ email });
    if (existedUser.password === password) {
      return res
        .status(200)
        .json({ success: true, data: existedUser});
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = {loginUserRequest};