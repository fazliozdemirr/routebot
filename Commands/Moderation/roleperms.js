module.exports = {
  name: "roleperms",
  aliases: ["Roleperms"],
  perms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_ROLES'],
  botPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_ROLES'],
  usage: '-',
  description: "Check the permissions of a role",
  run(client, message, args) {

    const { MessageEmbed } = require('discord.js');

    const role = message.mentions.roles.first();
    const rolePerms = role.permissions.toArray().join(',  ');

    const rolePermsEmbed = new MessageEmbed()
      .setTitle(`Permissions for ${role.name} role`)
      .setDescription(`${rolePerms}`)
      .setColor(`#12c4ff`)
      .setTimestamp();

if(!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send({content: `You don't have permission to do that!`})
    
if(!role) return message.channel.send({content: `Wrong command usage!
**Command usage:** \`-roleperms @role\``})
    
    try {
      message.channel.send({ embeds: [rolePermsEmbed] })
    } catch (e) {
      console.log(e)
      message.channel.send({ content: `Oops! Something went wrong...` })
    };

  }
}