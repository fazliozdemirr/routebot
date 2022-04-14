module.exports = {
  name: "memberperms",
  aliases: ["Memberperms"],
  description: "Check the permissions of a member",
  run(client, message, args) {

    const { MessageEmbed } = require('discord.js');

    const member = message.mentions.members.first();
    const memberPerms = member.permissions.toArray().join(',  ');

    const memberPermsEmbed = new MessageEmbed()
      .setTitle(`Permissions for ${member.displayName}`)
      .setURL(`https://youtube.com/c/ShadowCoDM`)
      .setDescription(`${memberPerms}`)
      .setColor(`#12c4ff`)
      .setTimestamp();

if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({content: `You don't have permission to do that!`})
    
if(!member) return message.channel.send({content: `Wrong command usage!
**Command usage:** \`-memberperms @member\``})
    
    try {
      message.channel.send({ embeds: [memberPermsEmbed] })
    } catch (e) {
      console.log(e)
      message.channel.send({ content: `Oops! Something went wrong...` })
    };

  }
}