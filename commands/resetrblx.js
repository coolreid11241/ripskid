const User = require("../models/User.js");
const rblx = require("roblox-js");

module.exports.run = async (client, Discord, message, args) => {
  if(!args[0]) return message.channel.send(":x: Please provide a ROBLOX user id");
  if(isNaN(args[0])) return message.channel.send(":x: IDs must be numbers");
  rblx.getUsernameFromId(args[0])
    .then((username) => {
      User.findOneAndUpdate({ discordId: message.author.id }, { $set: { robloxId: args[0] } }, (err, user) => {
        if(!user) {
          message.channel.send(":x: Your Discord account was not found in the database.");
        } else {
          message.channel.send(`Successfully linked the account ${username}(${args[0]}) to your whitelist!`);
        }
      })
    })
    .catch(() => message.channel.send(`:x: No Roblox user found with id \`${args[0]}\``));      
}

module.exports.help = {
  name: "resetrblx",
  elevated: false,
}