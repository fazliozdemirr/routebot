module.exports = {
  name: `guildMemberAdd`,
  async run(member, { client, Discord }) {
    const { MessageEmbed } = require('discord.js');
    const channel = '1012093101269070004';

    client.channels.cache.get(channel).send({
      embeds: [
        new MessageEmbed()
          .setColor('85c441')
          .setDescription(`Hey ${member}\nIt's awesome to have you here. 💚\n\nTo find more about Nexon, feel free to read <#1012095177629909122>\n\n> **If you are interested in joining our VTC**?\n>  Head over to <#1012095249503490170>\n\n> **Have any questions ?**\n> Feel free to ask in <#1012093623631884369> \n\nWe hope you will enjoy your time here!`)
          .setImage('https://media.discordapp.net/attachments/982291652314017864/982958910849818674/Nexon-welcome-banner-1.2-.png')
          .setThumbnail('https://i.imgur.com/m740VV3.jpg')
          .setFooter({
            text: 'Nexon Logistics',
            iconURL: 'https://i.imgur.com/m740VV3.jpg'
          })
      ]
    });

    const role = member.guild.roles.cache.find(r => r.id === '981631782548045924');
    member.roles.add(role);

  }
}