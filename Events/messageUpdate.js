module.exports = {
  name: `messageUpdate`,
  async run(oldMessage, { client, Discord }, newMessage) {

    const channel = '1012096594918789211';
    const { MessageEmbed } = require('discord.js');

    client.channels.cache
      .get(channel)
      .send({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setAuthor({
            name: newMessage.member.user.tag,
            iconURL: newMessage.member.displayAvatarURL()
          })
          .setDescription(`Message sent by ${newMessage.author} edited in ${newMessage.channel}\nOld Message:\n${oldMessage.content}\nEdited Message\n${newMessage.content}`)
          .setFooter({
            text: `Author ID: ${newMessage.member.id} | Message ID: ${newMessage.id}`
          })
          .setTimestamp()
      ]
    });

  }
}