module.exports = {
  name: "ping",
  aliases: ["Ping"],
  description: "Check the server ping",
  run(client, message, args) {
    const Discord = require('discord.js')

    let days = Math.floor(client.uptime / 86400000)
    let hours = Math.floor(client.uptime / 3600000) % 24
    let minutes = Math.floor(client.uptime / 60000) % 60
    let seconds = Math.floor(client.uptime / 1000) % 60

    let embed = new Discord.MessageEmbed()
      .setColor("#12c4ff")
      .addFields([
      /*  { name: "Bot Latency 🤖:", value: `${ping}` },*/
        { name: "API Latency:", value: `${client.ws.ping}` },
        { name: "Bot Uptime:", value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds` }
      ])
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
}