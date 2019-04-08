const uuid = require("uuid").v4;
const rblx = require("roblox-js");
const { prefix } = require("../config.json");
const User = require("../models/User.js");

module.exports.run = async (client, Discord, message, args) => {
  let token = uuid();
  if(message.channel.type !== "dm") return message.channel.send(":x: This command can only be executed in direct messages.");
  if(!args[0] || !args[1]) return message.channel.send(module.exports.help.usage);
  if(isNaN(args[0]) || isNaN(args[1])) return message.channel.send(":x: IDs must be numbers");
  client.fetchUser(args[0])
    .then(user => {
      User.findOne({ discordId: args[0] }, (err, res) => {
        if(res && !res.blacklisted) {
          message.channel.send("User already whitelisted.");
        } else {
          if(res.blacklisted) {
            message.channel.send(":x: Warning: this user has been blacklisted. In order to whitelist this user, you will need to rewhitelist them by running the rewhitelist command.");
          } else {
            rblx.getUsernameFromId(args[1])
            .then(username => {
              new User({
                token,
                robloxId: args[1],
                discordId: args[0]
              }).save().then(message.channel.send(`\`${user.tag}(${username})\` Whitelisted Successfully! token: \`${token}\``)).catch(console.error);
            })
            .catch(() => message.channel.send(`:x: No Roblox user found with id \`${args[1]}\``));      
          }
        } 
      });
    })
    .catch(() => message.channel.send(`:x: No Discord user found with id \`${args[0]}\``));
}

module.exports.help = {
  name: "whitelist",
  elevated: true,
  usage: `Usage: ${prefix}whitelist <discordid> <robloxid>`
}