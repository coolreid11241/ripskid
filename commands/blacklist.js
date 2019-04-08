const { prefix } = require("../config.json");
const User = require("../models/User.js");

module.exports.run = async (client, Discord, message, args) => {
  if(message.channel.type !== "dm") return message.channel.send(":x: This command can only be executed in direct messages.");
  if(!args[0]) return message.channel.send(module.exports.help.usage);
  if(args[0].length === 18) {
    if(isNaN(args[0])) return message.channel.send(":x: Discord IDs must be numbers");
      User.findOneAndUpdate({ discordId: args[0] }, { $set: { blacklisted: true } }, (err, user) => {
        if(!user) {
          message.channel.send(":x: No user with that id was found");
        } else {
          message.channel.send(`Blacklisted user with id \`${args[0]}\``);
        }
      });
  } else if (args[0].length > 18) {
    User.findOneAndUpdate({ token: args[0] }, { $set: { blacklisted: true } }, (err, user) => {
      if(!user) {
        message.channel.send(":x: No user with that token was found");
      } else {
        message.channel.send(`Blacklisted token \`${args[0]}\``);
      }
    });
  } else if (args[0].length < 18) {
    if(isNaN(args[0])) return message.channel.send(":x: Roblox IDs must be numbers");
    User.findOneAndUpdate({ robloxId: args[0] }, { $set: { blacklisted: true } }, (err, user) => {
      if(!user) {
        message.channel.send(":x: No user with that id was found");
      } else {
        message.channel.send(`Blacklisted user with id \`${args[0]}\``);
      }
    });
  }
}

module.exports.help = {
  name: "blacklist",
  elevated: true,
  usage: `Usage: ${prefix}blacklist <discordid | robloxid | token>`
}