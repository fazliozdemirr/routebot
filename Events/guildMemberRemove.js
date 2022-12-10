module.exports = {
  name: `guildMemberRemove`,
  async run(member, { client, Discord }) {
const { MessageEmbed } = require('discord.js');
const channel = '1012096570797342720';

client.channels.cache.get(channel).send({
      embeds: [
        new MessageEmbed()
        .setColor('#12c4ff')
        .setDescription(`${member.user.tag} has left the server!`)
      ]
    });

  }
}