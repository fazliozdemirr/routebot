module.exports = {
  name: "servers",
  aliases: ["Servers"],
  description: "Get the number of servers I'm in",
  run(client, message, args) {
    const Discord = require("discord.js")
    const serversEmbed = new Discord.MessageEmbed()
      .setTitle(`Management bot server count:`)
      .setURL("https://youtube.com/c/ShadowCoDM")

      .setDescription(`I'm in **${client.guilds.cache.size}** Servers!`)
      .setColor(`#12c4ff`)
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL()
      );
    message.channel.send({ embeds: [serversEmbed] });
  }
}