module.exports = {
  name: "help",
  aliases: ["Help"],
  run(client, message, args) {

const { MessageEmbed } = require('discord.js');

    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setColor('#12c4ff')
        .setDescription(`${client.commands.map(c => `\`${c.name}\``).join(', ')}`)
      ]
    })
    
  }
}