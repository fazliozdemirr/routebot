module.exports = {
  name: "embed",
  aliases: ["Embed"],
  description: "Make an embed",
  run(client, message, args) {
if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permissions to do that");   
    const Discord = require("discord.js");
    const msg = args.join(' ');
    const msgSplit = msg.split(' - ');
    const title = msgSplit[0]
    const desc = msgSplit[1]

    if (!title) return message.channel.send(`Please provide the title of the embed`);
    if (!desc) return message.channel.send(`Please provide the description of the embed`);

    const embed = new Discord.MessageEmbed()
    if (title) embed.setTitle(`${title}`)
    if (desc) embed.setDescription(`${desc}`)
      .setColor("#12c4ff")
    .setTimestamp();

    message.channel.send({ embeds: [embed] }).catch()
  }
}