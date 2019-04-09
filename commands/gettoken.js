const User = require("../models/User.js");
const uuid = require("uuid").v4;

module.exports.run = async (client, Discord, message, args) => {
  const token = uuid();
  if(message.channel.type !== "dm") {
    User.findOneAndUpdate({ discordId: message.author.id }, { $set: { token } }, (err, res) => {
      if(!res) {
        message.channel.send(":x: Couldn't find you in the database.");
      } else {
        message.author.send(`Heres your token: \`${token}\``).then(() => message.channel.send("Check your DMs for the token! For security reasons a new token was automatically generated.")).catch(() => message.channel.send("Hmm... I wasn't able to send you your token. Double check that your DMs are open. https://memester.cf/shutup-skid/74809.gif"));
      }
    });
  }
}

module.exports.help = {
  name: "gettoken",
  elevated: false
}