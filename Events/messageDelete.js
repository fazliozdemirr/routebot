module.exports = {
  name: `messageDelete`,
  async run(message, { client, Discord }) {

    const channel = '1012096594918789211';
    const { MessageEmbed } = require('discord.js');

    client.channels.cache.get(channel).send({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setAuthor({
            name: message.author.tag,
            iconURL: message.member.displayAvatarURL()
          })
          .setDescription(`Message sent by ${message.author} deleted in ${message.channel}\n${message.content}`)
          .setFooter({
            text: `Author ID: ${message.member.id} | Message ID: ${message.id}`
          })
          .setTimestamp()
      ]
    });

  }
}

/*
module.exports = {
  name: ``,
  async run(message, { client, Discord }) {

    const channel = '';
    const { MessageEmbed } = require('discord.js');

    client.channels.cache.get(channel).send({
      embeds: [
        new MessageEmbed()
          .setColor('')
          .setAuthor({
            name: message.author.tag,
            iconURL: message.member.displayAvatarURL()
          })
          .setDescription(``)
          .setFooter({
            text: `Author ID: ${message.member.id} | Message ID: ${message.id}`
          })
          .setTimestamp()
      ]
    });

  }
}
*/