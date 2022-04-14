module.exports = {
  name: "invite",
  aliases: ["botinvite", "bot-invite"],
  description: "Invite me to your server",
  run(client, message, args) {
    const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
      .setTitle("Invite me to your server")
      .setURL("https://youtube.com/c/ShadowCoDM")
      .setDescription(`I'm a functional bot with many moderation commands, Invite me to your server by contacting <@893705256368750592> and type **-help** for more information.`)
      .setColor("#12c4ff")
      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())

    message.channel.send({ embeds: [embed] })
  }
}