const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  createdAt: { Date },
  username: { type: String, required: true },
  reactions: [],
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thoughts;
