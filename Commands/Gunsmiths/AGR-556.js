const Discord = require("discord.js")
exports.run = (client, message, args) => {
  const commands = client.commands.map(command => command.name).join(", ")
  const embed = new Discord.MessageEmbed()
    .setTitle("Gunsmith:")
    .setURL("https://youtube.com/c/ShadowCoDM")
    .setDescription(`https://youtube.com/c/ShadowCoDM`)
    .setColor("#12c4ff")
    .setImage("")
    .setTimestamp()
    .setFooter("Gunsmith by ShadowOP | Do check Shadow on YouTube")
  message.channel.send({ embeds: [embed] })
}

exports.name = ""