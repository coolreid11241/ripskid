module.exports.run = async (client, Discord, message, args) => {
  let mention = message.mentions.users.first();
  if(!mention) {
    client.fetchUser(args[0])
      .then((user) => {
        message.guild.ban(user)
          .then(() => message.channel.send(`:white_check_mark: Banned user ${user.tag}`))
          .catch(() => message.channel.send(`:x: Failed to ban ${user.tag}`));
      })
      .catch(() => message.channel.send(":x: That user doesn't exist"));
  } else {
    message.guild.ban(mention)
      .then(() => message.channel.send(`:white_check_mark: Banned user ${mention.tag}`))
      .catch(() =>message.channel.send(":x: Failed to ban"));
  }
}

module.exports.help = {
  name: "ban",
  elevated: true
}