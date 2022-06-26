const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {},
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { Date },
});

module.exports = Reaction;
