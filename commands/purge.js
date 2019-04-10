module.exports.run = async (client, Discord, message, args) => {
  if(!args[0]) {
    await message.delete();
    message.channel.bulkDelete(100);
    message.channel.send("Deleted 100 messages").then(msg => msg.delete(5000));
  } else {
    if(isNaN(args[0])) return message.channel.send(":x: Must be number.");
    if(args[0] > 100) return message.channel.send(":x: No more than 100 messages can be deleted at a time");
    await message.delete();
    message.channel.bulkDelete(args[0]);
    message.channel.send(`Deleted ${args[0]} messages`).then(msg => msg.delete(5000));
  }
}

module.exports.help = {
  name: "purge",
  elevated: true,
  usage: `${prefix}purge || ${prefix}purge <amount>`
}