const mongoose = require("mongoose");
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
require("dotenv").config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
mongoose.connect(config.dbconn, { useNewUrlParser: true }, () => console.log("MongoDB Connection established to", config.dbconn));

client.on("ready", () => {
  console.log("Logged in as", client.user.tag);
  if(client.guilds.size > 1) {
    console.log("Security vulnerability: bot is in more than one guild. Shutting down.");
    process.exit(1);
  } else {
    console.log("Bot is secure");
  }
  client.user.setActivity("People sharing keys", { type: "WATCHING" });
});

client.on("guildMemberAdd", (member) => {
  if(member.guild.id !== config.guildId) return;
});

client.on("message", (message) => {
  if(message.author.bot) return;
  if(message.guild.id !== config.guildId) return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let prefix = config.prefix;

  let cFile = client.commands.get(command.slice(prefix.length));
  if(cFile) cFile.run(Client, bot, message, args);
});

fs.readdir("./commands/", (err, files) => {
  if(files.length < 1) return console.error("No commands");

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(file => {
    let module = require(`./commands/${file}`);
    client.commands.set(module.help.name, module);
    console.log("Loaded", file);
  });
});

client.login(process.env.TOKEN);