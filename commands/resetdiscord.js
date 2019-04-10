const User = require("../models/User.js");

module.exports.run = async (client, Discord, message, args) => {
  if(message.channel.type !== "dm") {
    message.delete();
    message.channel.send(":x: This command can only be executed in DMs");
  } else {
    if(!args[0]) return message.channel.send(":x: You must provide your token to change your discord account");
    User.findOneAndUpdate({ token: args[0] }, { $set: { discordId: message.author.id } }, (err, user) => {
      if(!user) {
        message.channel.send(":x: Token not found in database. If you forgot your token and do not have access to the account previously linked to your account, please contact an owner");
      } else {
        if(user.discordId === message.author.id) return message.channel.send("This discord account is the currently linked account in your whitelist already.");
        message.channel.send(`Successfully changed the account linked to your whitelist to ${message.author.tag}`)
      }
    });
  }    
}

module.exports.help = {
  name: "resetdiscord",
  elevated: false,
}