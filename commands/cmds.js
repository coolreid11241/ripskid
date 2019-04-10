const { prefix } = require("../config.json");

module.exports.run = async (client, Discord, message, args) => {
  let cmdsEmbed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setColor("RANDOM")
    .setDescription("Excluding owner commands")
    .addField(`${prefix}gettoken`, `${prefix}gettoken`)
    .addField(`${prefix}ping`, `${prefix}ping`) 
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL);
}

module.exports.help = {
  name: "cmds",
  elevated: false,
  aliases: ["help", "commands"]
}