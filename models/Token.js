const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  robloxId: {
    type: String,
    required: true
  },
  discordId: {
    type: String,
    required: true
  },
  blacklisted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Token = mongoose.model("tokens", TokenSchema);