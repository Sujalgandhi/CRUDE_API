const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    mobile: String,
    password: String,
})

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;