const User = require("../models/User.js");

module.exports.run = async (client, Discord, message, args) => {
  if(message.channel.type !== "dm") {
    message.delete();
    message.channel.send(":x: This command can only be executed in DMs");
    if(!args[0]) return message.channel.send(":x: You must provide your token to change your discord account");
    User.findOneAndUpdate({ token: args[0] }, { $set: { discordId: message.author.id } }, (err, user) => {
      if(!user) {
        message.channel.send(":x: Token not found in database. If you forgot your token and do not have access to the account previously linked to your account, please contact an owner");
      } else {
          
      }
    });
  }     
}

module.exports.help = {
  name: "resetrblx",
  elevated: false,
}