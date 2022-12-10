module.exports = {
  name: `voiceStateUpdate`,
  async run(oldState, { client, Discord }, newState) {

    const { MessageEmbed } = require('discord.js');
    const channel = '1012096620042649691';

    if (newState.channelId === null) {
      client.channels.cache.get(channel).send({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setAuthor({
              name: newState.member.user.tag,
              iconURL: oldState.member.displayAvatarURL()
            })
            .setDescription(`${oldState.member} left the voice channel ${oldState.channel}`)
            .setFooter({
              text: `Member ID: ${oldState.member.id}`
            })
            .setTimestamp()
        ]
      });
    } //left

    else if (oldState.channelId === null) {
      client.channels.cache.get(channel).send({
        embeds: [
          new MessageEmbed()
            .setColor('BLUE')
            .setAuthor({
              name: newState.member.user.tag,
              iconURL: newState.member.displayAvatarURL()
            })
            .setDescription(`${newState.member} joined the voice channel ${newState.channel}`)
            .setFooter({
              text: `Member ID: ${newState.member.id}`
            })
            .setTimestamp()
        ]
      });
    } //joined


  }
}