module.exports.run = async (client, Discord, message, args) => {
  let mention = message.mentions.users.first();
  if(!mention) {
    message.guild.fetchMember(args[0])
      .then((member) => {
        message.guild.kick(member)
          .then(() => message.channel.send(`:white_check_mark: Kicked user ${member.tag}`))
          .catch(() => message.channel.send(`:x: Failed to kick ${mention.tag}`));
      })
      .catch(() => message.channel.send(`:x: ${member.tag} not found`));
  } else {
    message.guild.kick(mention)
      .then(() => message.channel.send(`:white_check_mark: Kicked user ${mention.tag}`))
      .catch(() =>message.channel.send(`:x: Failed to kick ${mention.tag}`));
  }
}

module.exports.help = {
  name: "kick",
  elevated: true
}