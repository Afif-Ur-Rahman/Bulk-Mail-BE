const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default: ""},
    // image: { type: String, required: true },
});

const signupUser = mongoose.model("user", UserSchema);

module.exports = {signupUser};