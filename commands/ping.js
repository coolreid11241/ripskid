module.exports = async (Client, bot, message, args) => {
  message.channel.send("Pong");
}

module.exports.help = {
  name: "ping"
}