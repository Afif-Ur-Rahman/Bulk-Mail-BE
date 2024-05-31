const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default: ""},
});

const signupUser = mongoose.model("register", UserSchema);

module.exports = {signupUser};