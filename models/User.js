const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  idChanges: [
    {
      discord: {
        type: Number
      },
      roblox: {
        type: Number
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Token = mongoose.model("users", UserSchema);