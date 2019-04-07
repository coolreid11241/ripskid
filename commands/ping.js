const os = require("os");
const { cpu } = require("node-os-utils");

module.exports.run = async (client, Discord, message, args) => {
  message.channel.send(":white_check_mark:  ***Pinging...***").then(sent => {

    cpu.usage().then(percentage => {
        let pingEmbed = new Discord.RichEmbed()
        .setTitle("Ping! 🏓")
        .setColor("#1fe21f")
        .addField("Ping", `${sent.createdTimestamp - message.createdTimestamp}ms`)
        .addField("Memory", `${((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(0)}MB/${(os.totalmem() / 1024 / 1024).toFixed(0)}MB`)
        .addField("CPU", `${percentage}%`, true)
        .setTimestamp()

        sent.edit(pingEmbed).catch(console.error);
    });
}); 
}

module.exports.help = {
  name: "ping",
  elevated: true
}