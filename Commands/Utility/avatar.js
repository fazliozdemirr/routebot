module.exports = {
  name: "avatar",
  aliases: ["Avatar"],
  description: "Get your avatar",
  run(client, message, args) {
    const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}'s Avatar`)
      .setURL("https://youtube.com/ShadowCoDM")
      .setImage(`${message.author.displayAvatarURL()}`)
      .setColor("12c4ff")

    message.channel.send({ embeds: [embed] })
  }
}