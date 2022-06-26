const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, trimmed: true },
  email: { type: String, required: true, unique: true },
  thoughts: [],
  friends: [],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
