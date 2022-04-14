module.exports = {
  name: "serverinfo",
  aliases: ["server-info", "Serverinfo", "Server-info", "Server-Info"],
  description: "Get the server info",
  run(client, message, args) {
    const Discord = require("discord.js")

    const guild = client.guilds.cache.get('940572040166006784')
    const memberCount = guild.memberCount;
    const embed = new Discord.MessageEmbed()
      .setColor("#12c4ff")
      .setAuthor(`Info of ${message.guild}`, message.guild.iconURL({ dynamic: true }))
      .addField("<:crownn:944901749867692034> Owner", `<@893705256368750592>`)
      .addField("📢 Channels", `${message.guild.channels.cache.size}`)
      .addField(`${process.env.modEmoji} Roles`, `${message.guild.roles.cache.size}`)
      .addField("<:pikahaha:945828580854747136> Emojis", `${message.guild.emojis.cache.size}`)
      .addField("<:mod:944912016068468737> Verification Level", `Medium`)
      .addField("🌏 Region", `India`)
      .addField("🕵️‍♂️ Members", `${memberCount.toLocaleString()}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter(`Created on ${message.guild.createdAt.toDateString()}`)

    message.channel.send({ embeds: [embed] })
  }
}