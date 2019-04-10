const { prefix } = require("../config.json");

module.exports.run = async (client, Discord, message, args) => {
  let cmdsEmbed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setColor("RANDOM")
    .setDescription("Excluding staff commands")
    .addField(`${prefix}gettoken (generates a new token as well)`, `${prefix}gettoken`)
    .addField(`${prefix}resetrblx`, `${prefix}resetrblx <robloxuserid>`)
    .addField(`${prefix}resetdiscord (you do not need to provide an id for this command, you instead provide your token. EXECUTE THIS COMMAND IN DMS ONLY)`, `${prefix}resetdiscord`)
    .addField(`${prefix}ping`, `${prefix}ping`) 
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL);
  message.channel.send(cmdsEmbed);
}

module.exports.help = {
  name: "cmds",
  elevated: false,
  aliases: ["help", "commands"]
}