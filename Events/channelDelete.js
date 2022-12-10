module.exports = {
  name: `channelDelete`,
  async run(channel, { client, Discord }) {

    const chnl = '1012096518838300712';
    const { MessageEmbed } = require('discord.js');

    client.channels.cache.get(chnl).send({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setAuthor({
            name: channel.guild.name,
            iconURL: channel.guild.iconURL()
          })
          .setDescription(`Channel deleted: #${channel.name}`)
          .setFooter({
            text: `ID: ${channel.id}`
          })
          .setTimestamp()
      ]
    });

  }
}