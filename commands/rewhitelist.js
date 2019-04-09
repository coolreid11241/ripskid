const uuid = require("uuid").v4;
const { prefix } = require("../config.json");
const User = require("../models/User.js");

module.exports.run = async (client, Discord, message, args) => {
  if(!args[0]) return message.channel.send(module.exports.help.usage);
  if(isNaN(args[0])) return message.channel.send(":x: IDs must be numbers");
  let token = uuid();
  if(args[0].length === 18) {
    User.findOneAndUpdate({ discordId: args[0] }, { $set: { token }, $set: { blacklisted: false } }, (err, user) => {
      if(!user) {
        message.channel.send(":x: User could not be found");
      } else if(!user.blacklisted) {
        message.channel.send(":x: User is already whitelisted");
      } else {
        message.channel.send(`Rewhitelisted \`${args[0]}\` token: \`${token}\``);
      }
    });
  } else if (args[0].length < 18){
    User.findOneAndUpdate({ robloxId: args[0] }, { $set: { token }, $set: { blacklisted: false } }, (err, user) => {
      if(!user) {
        message.channel.send(":x: User could not be found");
      } else if (!user.blacklisted) {
        message.channel.send(":x: User is already whitelisted");
      } else {
        message.channel.send(`Rewhitelisted \`${args[0]}\` token: \`${token}\``);
      }
    });
  } else {
    message.channel.send(module.exports.help.usage);
  }
}

module.exports.help = {
  name: "rewhitelist",
  elevated: true,
  usage: `Usage: ${prefix}rewhitelist <discordid | robloxid>`
}